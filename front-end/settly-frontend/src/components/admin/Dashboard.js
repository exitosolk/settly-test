import React from 'react';

function Dashboard(){
    
    const user = localStorage.getItem("userData");
    return(
        <h1>Welcome, {user}</h1>
    ) 
}

export default Dashboard;