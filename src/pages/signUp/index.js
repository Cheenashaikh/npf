import React, { useState } from "react";
import image from "../../assets/pngtree-modern-home-3d-concept-png-image_13761355-removebg-preview.png";
import "./signup.css";
import axios from "axios";
function SignUp({ onLogin }) {
    const [cnic, setCnic] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


   

    const handleClick = async (e) => {
        e.preventDefault(e);
        setLoading(true);
        
        try {
            console.log("CNIC:", cnic);
            console.log("Mobile:", mobile);
            const response=await axios.post("/membership/api/auth/login",{cnic,mobile_no:mobile});
            console.log(response.data);
            if(response.data.status){
                onLogin(response.data.data);
            }else{
                
                setError(response.data.message);

            }}catch(error){
                console.error(error);
                setTimeout(()=>{
                    setLoading(false);
                    setCnic("");
                    setMobile("");
                    setError("An error accured during login")
                },500);
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

