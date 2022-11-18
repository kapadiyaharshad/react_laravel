import React, { useEffect, useState } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import MasterLayout from "./layouts/admin/MasterLayout";
import Axios from '../src/components/Axios';
import Swal from 'sweetalert2';
import Loading from './components/Loading';

function AdminPrivateRoute({ ...rest }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    Axios.get(`api/checkAuthenticated`).then(response => {
      if (response.status === 200) {
        setAuthenticated(true);
        setLoading(false);
      }
    })
    .catch(function(error) {
      if (!error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Something is wrong',
          text: 'Server is not started!',
        })
      }
      history.push('/');
      setAuthenticated(false);
    });
    return () => {
      setAuthenticated(false);
    };
  },[])
  Axios.interceptors.response.use(response => {
    
    return response;
  }, error => {
    if (error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Page not found',
        text: 'Unautharized!',
      })
      history.push("/404");
    }
    if (error.response.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Forbidden',
        text: error.response.data.message,
      })
      history.push("/403");
    }
   
    return Promise.reject(error);
  });

  if (loading) {
    return (
      <Loading/>
    )
  }

  return (
    <Route {...rest}
      render={({ props, location }) =>
        authenticated ?
          (<MasterLayout{...props} />) :
          (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
      }
    />
  )
}

export default AdminPrivateRoute