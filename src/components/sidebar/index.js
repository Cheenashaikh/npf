

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sidebar.css";
import logo from "../../assets/logo-dark.png"

function Sidebar({ user, onLogout }) {
    const [navCollapse, setNavCollapse] = useState(false);

    return (
        <div>
            <div className="sidebar_content">
                <div className="headerSidebar">
                    <img
                        // src="https://pha.gov.pk/img/logo12.png"
                        src={logo}
                        alt="logo"
                        className="Sidebarlogo"
                    />
                    <i
                        className="bi bi-justify"
                        onClick={() => setNavCollapse(!navCollapse)}
                    ></i>

                    <h4 className="h4">{user.name}</h4>

                    <img src={user.image} className="image" />

                </div>
                <div className={`sidebar-container ${navCollapse ? "navCollapse" : ""}`}>
                    <div className="nav-option option1">
                        <i className="bi bi-speedometer2"></i>
                        <Link to="/dashboard">
                            <h3>Dashboard</h3>
                        </Link>
                    </div>
                    <div className="nav-option option1">
                        <i className="bi bi-clipboard-check"></i>
                        <Link to="/project">
                            <h3>Project</h3>
                        </Link>
                    </div>
                    <div className="nav-option option1">
                        <i className="bi bi-file-earmark-text"></i>
                        <Link to="/projectsummary">
                            <h3>Project Summary</h3>
                        </Link>
                    </div>
                    <div className="nav-option option1">
                    <i className="bi bi-cash"></i>


                        <Link to="/makePayment" >
                            <h3>Make Payment</h3>
                        </Link>
                    </div>
                    <div className="nav-option option1">
                        <i className="bi bi-power"></i>
                        <Link to="/" onClick={onLogout}>
                            <h3>Logout</h3>
                        </Link>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
