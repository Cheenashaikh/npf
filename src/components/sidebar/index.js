

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sidebar.css";
import logo from "../../assets/logo-dark.png"
import Dropdown from "./dropdown";
import { useNavigate } from "react-router-dom";

function Sidebar({ user, onLogout }) {
    const [navCollapse, setNavCollapse] = useState(false);
    const [drop, setDrop] = useState(false);
  


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



                    <img src="https://as2.ftcdn.net/v2/jpg/01/29/35/71/1000_F_129357114_ZjUlv9fW5umC66cuKOArjDu8Q7CGhCo7.jpg" className="image" onClick={() => setDrop(!drop)} 
                    />
                    {drop && (<Dropdown logout={onLogout} />)}

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
                        <i className="bi bi-telephone">  </i>
                        <Link to="/contact">
                            <h3>Contact Us</h3>
                        </Link>

                    </div>
                    <div className="nav-option option1">
                        <i className="bi bi-chat-dots">  </i>
                        <Link to="/complaint">
                            <h3>Complaint Box</h3>
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
