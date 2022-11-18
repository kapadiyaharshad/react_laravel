import Axios from '../../components/Axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

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
  var authButton = '';
  if (!localStorage.getItem('auth_token')) {
    authButton = (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
      </ul>
    )
  }
  else {
    authButton = (
      <li className="nav-item">
        <button onClick={logoutHandler} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
      </li>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <Link className="navbar-brand" to="/">React-Laravel</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Collection</Link>
          </li>
          {authButton}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar