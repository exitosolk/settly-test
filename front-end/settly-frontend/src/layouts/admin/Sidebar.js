import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Settings</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Profile
                    </Link>
                    <div className="sb-sidenav-menu-heading">Clients</div>
                    <Link className="nav-link" to="/admin/add-client">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add New Client
                    </Link>
                    <Link className="nav-link" to="/admin/view-client">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Client
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;