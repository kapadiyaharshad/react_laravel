import React, { Fragment, useState } from 'react'
import Navbar from '../Navbar'
import Axios from '../../../components/Axios'
import Classes from './Login.module.css'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory();
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        error_list: [],
    })
    const [emailError, setEmailError] = useState(false)
    const [passwodError, setPasswordError] = useState(false)

    const handleInput = (e) => {
        e.persist();
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value })
    };
    const loginSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password
        }
        Axios.post(`api/login`, data)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("auth_token", response.data.token);
                    localStorage.setItem("auth_name", response.data.username);
                    Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                    })
                    if(response.data.role === 1){
                        history.push("/admin/dashboard")
                    }
                    else{
                        history.push("/")
                    }
                }
            })
            .catch(({ response }) => {
                if (!response) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Something is wrong',
                      text: 'Server is not started!',
                    })
                     history.push('/login')
                  }
                else if (response.status === 400) {
                    setEmailError(response.data.error.email);
                    setPasswordError(response.data.error.password);
                }
                else if (response.status === 401) {
                    setPasswordError(false);
                    setEmailError(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.message,
                    })
                    history.push('/login')
                }
            });
    };
    return (
        <Fragment>
            <Navbar />
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Login</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={loginSubmitForm}>
                                    <div className='form-group mb-2'>
                                        <label>Email</label>
                                        <input
                                            type='text'
                                            name='email'
                                            className='form-control'
                                            autoComplete='off'
                                            value={loginInput.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    {
                                        emailError && <span className={Classes.error_message}>{emailError} </span>
                                    }

                                    <div className='form-group mb-2'>
                                        <label>Password</label>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            autoComplete='off'
                                            value={loginInput.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    {
                                        passwodError && <span className={Classes.error_message}>{passwodError} </span>
                                    }
                                    <div className='form-group mt-3'>
                                        <button type='submit' className='btn btn-primary'>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login