import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';

axios.defaults.baseURL='http://settly.test/';
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}`:'';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route exact path="/" component={Home}></Route>
          
          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/'></Redirect>:<Login></Login>}
          </Route>

          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/'></Redirect>:<Register></Register>}
          </Route>

          <Route path='/admin' name="Admin" render={(props)=> <MasterLayout {...props}></MasterLayout>} ></Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
