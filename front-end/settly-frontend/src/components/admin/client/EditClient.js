import axios from "axios";
import React,  { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';

function EditClient(props){

    const [clientInput, setClient] = useState({
        name:'',
        email:'',
        error_list:[],
    });

    const history = useHistory();
    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) =>{
        e.persist();
        setClient({...clientInput,[e.target.name]:e.target.value});
    }

    const handleImage = (e) =>{
        setPicture({image:e.target.files[0]});
    }

    useEffect(()=>{

        const client_id = props.match.params.id
        axios.get(`/api/edit-client/${client_id}`).then(res=>{
            if(res.data.status===200){
                setClient(res.data.client);
            }else if(res.data.status===404){
                swal("Error", res.data.message,"error");
                history.push('/admin/view-client');
            }

            setLoading(false);
        });

    },[props.match.params.id, history]);

    const updateClient = (e) =>{
        e.preventDefault();

        const client_id=props.match.params.id
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('name', clientInput.name);
        formData.append('email', clientInput.email);

        axios.post(`/api/update-client/${client_id}`, formData).then(res => {
            if(res.data.status===200){
                swal("success", res.data.message,"success");
                setError([]);
            }else if(res.data.status===422){
                swal("Validation Error", "","error");
                setError(res.data.errors);
            }else if(res.data.status===404){
                swal("Error", res.data.message,"error");
                history.push('/admin/view-client');
            }
        });

    }

    if(loading){

        return <h4> Client data loading...</h4>
    }

    return(
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Client</h4>
                    <Link to="/admin/view-client" className="btn btn-primary btn-sm float-end">View Client List</Link>
                </div>

                <div className="card-body">
                    <form onSubmit={updateClient} encType="multipart/form-data">
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
                            <img src={`http://settly.test/${clientInput.image}`} className='img-thumbnail' width='50px'></img>
                            <span className='text-danger'>{errorlist.image}</span>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>
                </div>
            </div>  
        </div>
    ) 
}

export default EditClient;