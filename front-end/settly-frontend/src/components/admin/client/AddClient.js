import axios from "axios";
import React,  { useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

function AddClient(){

    const [clientInput, setClient] = useState({
        name:'',
        email:'',
        error_list:[],
    });

    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) =>{
        e.persist();
        setClient({...clientInput,[e.target.name]:e.target.value});
    }

    const handleImage = (e) =>{
        setPicture({image:e.target.files[0]});
    }

    const submitClient = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('name', clientInput.name);
        formData.append('email', clientInput.email);

        axios.post(`/api/store-client`, formData).then(res => {
            if(res.data.status===200){
                swal("success", res.data.message,"success");
                setClient({...clientInput,
                    name:'',
                    email:'',
                    error_list:[],
                });
                setError([]);
            }else if(res.data.status===422){
                swal("All fields are required", "","error");
                setError(res.data.errors);
            }
        });

    }


    return(
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add New Client</h4>
                    <Link to="/admin/view-client" className="btn btn-primary btn-sm float-end">View Product</Link>
                </div>

                <div className="card-body">
                    <form onSubmit={submitClient} encType="multipart/form-data">
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" onChange={handleInput} value={clientInput.name} name="name" className="form-control"></input>
                            <span className='text-danger'>{errorlist.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input type="email" name="email" onChange={handleInput} value={clientInput.email} className="form-control"></input>
                            <span className='text-danger'>{errorlist.email}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Image</label>
                            <input type="file" name="image" onChange={handleImage}  className="form-control"></input>
                            <span className='text-danger'>{errorlist.image}</span>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>
                </div>
            </div>  
        </div>
    ) 
}

export default AddClient;