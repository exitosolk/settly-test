import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../../layouts/frontend/Navbar';

function Register (){

    const [registerInput, setRegister] = useState({
        first_name:'',
        sur_name:'',
        email:'',
        confirm_email:'',
        password:'',
        confirm_password:'',
    });

    const handleInput = (e) =>{
        e.presist();
        setRegister({...registerInput,[e.target.first_name]:e.target.value});
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

        axios.post(`/api/register`, data).then(res => {

        })

    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Create your account</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <input type='text' name='first_name' onChange={handleInput} value={registerInput.first_name} placeholder='First Name' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='text' name='sur_name' onChange={handleInput} value={registerInput.sur_name} placeholder='Sir Name' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='email' name='email' onChange={handleInput} value={registerInput.email} placeholder='Email Address' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='email' name='confirm_email' onChange={handleInput} value={registerInput.confirm_email} placeholder='Confirm Email Address' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='password' name='password' onChange={handleInput} value={registerInput.password} placeholder='Password' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='password' name='confirm_password' onChange={handleInput} value={registerInput.confirm_password} placeholder='Confirm Password' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary w-100'>Register Now</button>
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