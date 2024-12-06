import React, { useState } from "react";
import image from "../../assets/pngtree-modern-home-3d-concept-png-image_13761355-removebg-preview.png";
import "./signup.css";
import dummyUsers from "../../data/user";

function SignUp({ onLogin }) {
    const [cnic, setCnic] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");

    const handleClick = (e) => {
        e.preventDefault();

        // Find the user based on entered credentials
        const user = dummyUsers.find(
            (user) => user.cnic === cnic && user.mobile === mobile
        );

        if (user) {
            setError("");
            onLogin(user); // Pass the user data to the parent component
        } else {
            setError("Invalid CNIC or Mobile Number");
        }
    };

    return (
        <div className="signUpContainer">
            <div className="container_left">
                <img src={image} alt="house" />
                <h2>Join PHA Today!</h2>
            </div>
            <div className="container_right">
                <div className="content">
                    <img
                        src="https://pha.gov.pk/img/logo12.png"
                        alt="logo"
                        className="logo"
                    />
                    <p className="header">Welcome, PHA!</p>
                    <form onSubmit={handleClick}>
                        <div className="input_group">
                            <input
                                value={cnic}
                                type="text"
                                id="cnic"
                                placeholder=" "
                                required
                                onChange={(e) => setCnic(e.target.value)}
                            />
                            <label htmlFor="cnic">CNIC</label>
                        </div>
                        <div className="input_group">
                            <input
                                value={mobile}
                                type="text"
                                id="mobile-number"
                                placeholder=" "
                                required
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            <label htmlFor="mobile-number">Mobile number</label>
                        </div>
                        <button type="submit">Sign in</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
