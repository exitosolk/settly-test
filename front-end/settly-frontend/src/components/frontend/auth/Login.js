import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../../layouts/frontend/Navbar';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Login (){
    
    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email:'',
        password:'',
        error_list:[],
    });

    const handleInput = (e) =>{
        e.persist();
        setLogin({...loginInput,[e.target.name]:e.target.value});
    }

    const loginSubmit = (e) =>{
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password:loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res=>{
                if(res.data.status === 200){
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    localStorage.setItem("userData", res.data.username);
                    swal("success", res.data.message,"success");
                    if(res.data.role==='admin'){
                        history.push('/admin/dashboard');
                    }else{
                        history.push('/');
                    }
                }
                else if(res.data.status === 401){
                    swal("warning", res.data.message,"warning");
                }else{
                    setLogin({...loginInput,error_list: res.data.validation_errors});
                }
            });
        });
    }   

    return (
        <div>
            <Navbar></Navbar>
            <div className='container py-5 login'>
                <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4 className='text-center'>Login</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={loginSubmit}>
                                    <div className='form-group mb-3'>
                                        <input type='email' name='email' onChange={handleInput} value={loginInput.email} placeholder='Email Address' className='form-control' ></input>
                                        <span className='text-danger'>{loginInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='password' name='password' onChange={handleInput} value={loginInput.password} placeholder='Password' className='form-control' ></input>
                                        <span className='text-danger'>{loginInput.error_list.password}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary w-100 py-3'>Login</button>
                                        <sapn className='d-inline-block mt-1'>No account yet? <Link className="nav-link" to="/register" className="txt txt-dark">Create one here.</Link></sapn>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;