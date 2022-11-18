import React, { Fragment, useState } from 'react'
import Navbar from '../Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Axios from '../../../components/Axios'
import Classes from './Register.module.css'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: ''
}

const ReigisterValidationSchema = Yup.object({
  name: Yup.string()
    .required('Fitst name is required')
    .min(2).max(50),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    // .min(6)
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirm_password: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});



function Register() {
  const [serverState, setServerState] = useState();
  const history = useHistory();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ReigisterValidationSchema,
    onSubmit: (values, actions) => {
      Axios.get('/sanctum/csrf-cookie').then(response => {
        Axios.post(`api/register`, values)
          .then(response => {
            if (response.status === 200) {
              actions.resetForm();
              localStorage.setItem("auth_token",response.data.token);
              localStorage.setItem("auth_name",response.data.username);
              Swal.fire({
                title: 'Sucess!',
                text: response.data.message,
                icon: 'sucess',
              })
              history.push("/")
              handleServerResponse(true);
            }

          })
          .catch(({ response }) => {
            if (response.status === 400) {
              actions.setSubmitting(false);
              handleServerResponse(false, response.data.error.email[0]);
            }
          });
      })
      .catch(({ response }) => {
        if (!response) {
          Swal.fire({
            icon: 'error',
            title: 'Something is wrong',
            text: 'Server is not started!',
          })
           history.push('/register')
        }
      });
    },
  });
  return (
    <Fragment>
      <Navbar />
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>
                <h4>Register</h4>
              </div>
              <div className='card-body'>
                
                <form onSubmit={formik.handleSubmit}>
                  <div className='form-group mb-2'>
                    <label>First Name</label>
                    <input type='text'
                      name='name'
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      autoComplete='off'
                      className='form-control' />
                  </div>
                  {formik.errors.name ?
                    <div className={Classes.error_msg}>{formik.errors.name}</div> : null}

                  <div className='form-group mb-2'>
                    <label>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      autoComplete='off'
                      className="form-control" />
                  </div>
                  {formik.errors.email ?
                    <div className={Classes.error_msg}>{formik.errors.email}</div> : null}
                  {
                  serverState && (
                    <p className={!serverState.ok ? Classes.error_msg : ""}>
                      {serverState.msg}
                    </p>
                  )
                }
                  <div className='form-group mb-2'>
                    <label>Password</label>
                    <input
                      type='password'
                      name='password'
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className='form-control' />
                  </div>
                  {formik.errors.password ?
                    <div className={Classes.error_msg}>{formik.errors.password}</div> : null}
                  <div className='form-group mb-2'>
                    <label>Confirm Password</label>
                    <input
                      type='password'
                      name='confirm_password'
                      onChange={formik.handleChange}
                      value={formik.values.confirm_password}
                      className='form-control' />
                  </div>
                  {formik.errors.confirm_password ?
                    <div className={Classes.error_msg}>{formik.errors.confirm_password}</div> : null}
                  <div className='form-group mt-3'>
                    <button type='submit' className='btn btn-primary' disabled={!formik.isValid}>Register</button>|
                    <Link to="/login" className='btn btn-primary'>Login</Link>
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

export default Register