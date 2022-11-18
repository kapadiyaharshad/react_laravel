import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AdminPrivateRoute from './AdminPrivateRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';
// import NotFound from './components/NotFound';

import Login from './layouts/frontend/auth/Login';
import Register from './layouts/frontend/auth/Register';
import Home from './layouts/frontend/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/403" component={Page403} />
          <Route path="/404" component={Page404} />
          <Route path="/login">
            {
              localStorage.getItem("auth_token") ? Redirect("/") : <Login />
            }
          </Route>
          <Route path="/register">
            {localStorage.getItem("auth_token") ? Redirect("/") : <Register />}
          </Route>
          <AdminPrivateRoute path="/admin" name="Admin"/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
