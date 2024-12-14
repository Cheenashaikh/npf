
import React, { useState } from "react";
import image from "../../assets/pngtree-modern-home-3d-concept-png-image_13761355-removebg-preview.png";
import "./signup.css";
import axios from "axios";
import logo from "../../assets/logo-dark.png"

function SignUp({ onLogin }) {
    const [cnic, setCnic] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    const mobileRegex = /^03[0-9]{9}$/;


    const validateInputs = () => {
        if (!cnicRegex.test(cnic)) {
            setError("Invalid CNIC format. Format should be 12345-1234567-1.");
            return false;
        }
        if (!mobileRegex.test(mobile)) {
            setError("Invalid mobile number. It should start with 03 and be 11 digits long.");
            return false;
        }
        setError("");
        return true;
    };


    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {
            await axios.get(
                "/membership/sanctum/csrf-cookie",
                { withCredentials: true }
            );
          
            console.log("CNIC:", cnic);
            console.log("Mobile:", mobile);

           
            const response = await axios.post(
                "/membership/api/auth/login",
                
                { cnic, mobile_no: mobile },
                
                { withCredentials: true ,
                  
                }
               

            );
           
            console.log(response.data);

            if (response.data.status) {
                onLogin(response.data.data);
            } else {
                setError(response.data.message || "Invalid credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
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
                        // src="https://pha.gov.pk/img/logo12.png"
                        src={logo}
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
                        <button type="submit" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
