import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

function ViewClient(){
    
    const [loading, setLoading] = useState(true);
    const [clientlist, setClientlist] = useState([]);

    useEffect (() => {

        axios.get(`/api/view-client`).then(res=>{
            if(res.status===200){
                setClientlist(res.data.client);
            }
            setLoading(false);
        });

    },[]);

    const deleteClient = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-client/${id}`).then(res=> {
            if(res.data.status===200){
                swal('Success', res.data.message,'success'); 
                thisClicked.closest('tr').remove();
            }else if(res.data.status===404){
                swal('Success', res.data.message,'success'); 
                thisClicked.innerText = "Deleting";
            }
        });
    }

    var viewclient_HTMLTABLE="";
    if(loading){
        return <h4>Loading client list...</h4>
    }
    else{

        viewclient_HTMLTABLE=
        clientlist.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>
                        {item.id}
                    </td>
                    <td>
                    <img src={`http://settly.test/${item.image}`} className='img-thumbnail' width='50px'></img>
                    </td>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        {item.email}
                    </td>
                    <td>
                        <Link to={`edit-client/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e)=>deleteClient(e,item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        });
    }

    return(
        <div className="card mt-4">
            <div className="card-header">
                <h4>Client List</h4>
                <Link to="/admin/add-client" className="btn btn-primary btn-sm float-end">Add Client</Link>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Edit</th> 
                            <th>Delete</th>     
                        </tr>
                    </thead>
                    <tbody>
                        {viewclient_HTMLTABLE}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewClient;   