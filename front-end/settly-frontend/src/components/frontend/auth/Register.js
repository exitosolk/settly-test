import React from 'react';
import Navbar from '../../../layouts/frontend/Navbar';

function Register (){
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
                                <form>
                                    <div className='form-group mb-3'>
                                        <input type='text' name='first_name' placeholder='First Name' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='text' name='sur_name' placeholder='Sir Name' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='email' name='email' placeholder='Email Address' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='email' name='confirm_email' placeholder='Confirm Email Address' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='password' name='password' placeholder='Password' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input type='password' name='confirm_password' placeholder='Confirm Password' className='form-control' ></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button className='btn btn-primary w-100'>Register Now</button>
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