import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import MasterLayout from './layouts/admin/MasterLayout';
import { useHistory } from 'react-router-dom';

function AdminPrivateRoute({...rest}){

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        axios.get(`/api/checkingAuthenticated`).then( res => {
            if(res.status===200){
                setAuthenticated(true);
            }
            setloading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    },[]);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status===401){
            swal('Unautharized', err.response.data.message,'warning');
            history.push('/');
        }

        return Promise.reject(err);
    });

    if(loading){
        return <h1>Loading...</h1>
    }
    
    return (

        <Route {...rest}
            render = {({
                props, location
            })=>
            Authenticated ?
            (<MasterLayout {...props}></MasterLayout>):
            (<Redirect to={{pathname:'/login', state:{from:location}}}></Redirect>)
            }
        >
        </Route>
    );

}

export default AdminPrivateRoute;