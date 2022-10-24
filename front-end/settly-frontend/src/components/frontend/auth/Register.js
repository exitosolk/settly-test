import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../../layouts/frontend/Navbar';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import './Styles.css';

function Register (){

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        first_name:'',
        sur_name:'',
        email:'',
        confirm_email:'',
        password:'',
        confirm_password:'',
        error_list:[],
    });

    const handleInput = (e) =>{
        e.persist();
        setRegister({...registerInput,[e.target.name]:e.target.value});
    }

    const registerSubmit = (e) =>{
        e.preventDefault();
        const data = {
            first_name: registerInput.first_name,
            sur_name:registerInput.sur_name,
            email:registerInput.email,
            confirm_email:registerInput.confirm_email,
            password:registerInput.password,
            confirm_password:registerInput.confirm_password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    swal("success", res.data.message,"success");
                    history.push('/');
                }
                else{
                    setRegister({...registerInput,error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='container py-5 register'>
                <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4 className='text-center'>Create your account</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <input type='text' name='first_name' onChange={handleInput}  value={registerInput.first_name} placeholder='First Name' className='form-control' ></input>
                                        <span className='text-danger'>{registerInput.error_list.first_name}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='text' name='sur_name' onChange={handleInput} value={registerInput.sur_name} placeholder='Sir Name' className='form-control' ></input>
                                        <span className='text-danger'>{registerInput.error_list.sur_name}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='email' name='email' onChange={handleInput} value={registerInput.email} placeholder='Email Address' className='form-control' ></input>
                                        <span className='text-danger'>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='email' name='confirm_email' onChange={handleInput} value={registerInput.confirm_email} placeholder='Confirm Email Address' className='form-control' ></input>
                                        <span className='text-danger'>{registerInput.error_list.confirm_email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='password' name='password' onChange={handleInput} value={registerInput.password} placeholder='Password' className='form-control' ></input>
                                        <span className='text-danger'>{registerInput.error_list.password}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='password' name='confirm_password' onChange={handleInput} value={registerInput.confirm_password} placeholder='Confirm Password' className='form-control' ></input>
                                        <span className='text-danger'>{registerInput.error_list.confirm_password}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary w-100 py-3'>Register Now</button>
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

export default Register;