import React, { useState } from "react";
import "./complaint.css"

import image from "../../assets/logo-dark.png"
function Complaint({ user }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlasttName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [subject, setSubject] = useState("");
    const [complaint, setComplaint] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const[file,setFile]=useState([])

    const validateForm = () => {
        const formErrors = {};
        if (!firstName) formErrors.firstName = "First name is required";
        if (!lastName) formErrors.lastName = "Last name is required";
        if (!email) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid";
        if (!tel) formErrors.tel = "Telephone is required";
        else if (!/^\d{10}$/.test(tel)) formErrors.tel = "Telephone must be 10 digits";
        if (!message) formErrors.message = "Message is required";
        if (!description) formErrors.description = "Complaint description is required";
        if (!date) formErrors.date = "Date is required";
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) formErrors.date = "Date must be in the format YYYY-MM-DD";


        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };


    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setlasttName(e.target.value);
    }
    const handleMesssage = (e) => {
        setMessage(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleTel = (e) => {
        setTel(e.target.value);
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handleSubject = (e) => {
        setSubject(e.target.value);
    }

    const handleComplaint = (e) => {
        setComplaint(e.target.value);
    }
    const handleFileUpload=(e)=>{
        const file = e.target.files[0];
        setFile(file)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFirstName("");
        setEmail("")
        setTel("")
        setSubject("")
        setMessage("")
        setlasttName("")
        setComplaint("")
        setDate("")
        setDescription("")
        if (validateForm()) {
            setFirstName("");
            setlasttName("");
            setEmail("");
            setTel("");
            setSubject("");
            setMessage("");
            setDescription("");
            setDate("");
            setErrors({});
        }


    }

    return (
        <div className="contact">

            <div className="heading">
                <img src={image} />

                <h2>Complaint Box!</h2>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <div className="name">
                            <div className="input_group">
                                <input
                                    value={firstName}
                                    type="text"
                                    id="firstName"
                                    placeholder=""
                                    required
                                    onChange={handleFirstName}

                                />
                                <label htmlFor="firstName">First Name</label>
                            </div>

                            <div className="input_group">
                                <input
                                    value={lastName}
                                    type="text"
                                    id="lastName"
                                    placeholder=""
                                    required
                                    onChange={handleLastName}

                                />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>


                    </div>
                    <div className="tel">
                        <div className="input_group">
                            <input
                                value={tel}
                                type="tel"
                                id="tel"
                                placeholder=""
                                required
                                onChange={handleTel}

                            />
                            <label htmlFor="Telephone">Tel</label>
                        </div>



                    </div>

                    <div className="email">
                        <div className="input_group">
                            <input
                                value={email}
                                type="email"
                                id="email"
                                placeholder=""
                                required
                                onChange={handleEmail}

                            />
                            <label htmlFor="Email">Email</label>
                        </div>



                    </div>


                    <div className="complaint">
                        <div className="input_group">
                            <select
                                value={complaint}
                                id="complaint"
                                required
                                onChange={handleComplaint}
                            >
                                <option value="">Select Complaint Subject</option>
                                <option value="General Complaint">General Complaint</option>
                                <option value="Staff Behaviour">Staff Behaviour</option>
                                <option value="Technical Problem">Technical Problem</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>
                    </div>

                    <div className="Subject">
                        <div className="input_group">
                            <input
                                value={subject}
                                type="text"
                                id="subject"
                                placeholder=""
                                required
                                onChange={handleSubject}

                            />
                            <label htmlFor="subject">subject</label>
                        </div>
                    </div>


                    <div className="message">
                        <div className="input_group">
                            <textarea
                                value={description}
                                type="textarea"
                                id="description"
                                placeholder="Description..."
                                required
                                onFocus={(e) => e.target.placeholder = ""}
                                onBlur={(e) => e.target.placeholder = "Description..."}
                                onChange={handleMesssage}


                            />

                        </div>
                    </div>




                    <div className="Attachment">
                        <div className="input_group">
                            <input

                                type="file"
                                id="description"
                                placeholder=""
                                required
                                onChange={handleFileUpload}




                            />
                            <label htmlFor="file">Attach File</label>
                        </div>
                    </div>


                    <div className="date">
                        <div className="input_group">
                            <input
                                value={date}
                                type="date"
                                id="date"
                                placeholder=""
                                required
                                onChange={handleDate}

                            />
                            <label htmlFor="date">Date</label>
                        </div>
                    </div>
                    <button>Submit</button>





                </form>
            </div>

        </div>

    )

} export default Complaint