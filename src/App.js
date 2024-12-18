import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signUp";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import "./App.css";
import Project from "./pages/project";
import ProjectSummary from "./pages/projectSummary";
import MakePayment from "./pages/makePayment";
import Contact from "./pages/contactUs";
import Complaint from "./pages/complaint";
import Profile from "./pages/profile";


function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = (user) => {
        setLoggedInUser(user);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    };

    const handleLoginSubmit = (userData) => {
        handleLogin(userData);
    };

    return (
        <Router>
            <div className="app-container">
                {loggedInUser && <Sidebar user={loggedInUser} onLogout={handleLogout} />}
                <div className="content-container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                loggedInUser ? (
                                    <Navigate to="/dashboard" replace />
                                ) : (
                                    <SignUp onLogin={handleLogin} />
                                )
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                loggedInUser ? (
                                    <Dashboard user={loggedInUser} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />
                        <Route
                            path="/project"
                            element={
                                loggedInUser ? (
                                    <Project user={loggedInUser} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />
                        <Route
                            path="/projectSummary"
                            element={
                                loggedInUser ? (
                                    <ProjectSummary user={loggedInUser} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />
                        <Route
                            path="/makePayment"
                            element={
                                loggedInUser ? (
                                    <MakePayment user={loggedInUser} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />
                        <Route
                            path="/contact"
                            element={
                                loggedInUser ? (
                                    <Contact user={loggedInUser} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />
                        <Route
                            path="/complaint"
                            element={
                                loggedInUser ? (
                                    <Complaint user={loggedInUser} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                loggedInUser ? (
                                    <Profile user={loggedInUser} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />


                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
