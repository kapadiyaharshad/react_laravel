import React from 'react'
import {NavLink, useHistory } from 'react-router-dom'
import Axios from '../../components/Axios'
import Swal from 'sweetalert2';

function Navbar() {
    const history = useHistory();
    const logoutHandler = (e) => {
        e.preventDefault();
        Axios.post(`api/logout`)
          .then(response => {
            if (response.status === 200) {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("auth_name");
              Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
              })
              history.push("/")
            }
          })
      }
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <NavLink className="navbar-brand ps-3" to="#">Admin Panel</NavLink>
            
            <button onClick={logoutHandler} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
        </nav>
    )
}

export default Navbar