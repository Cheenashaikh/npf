import React, { useState } from "react";
import "./contactUs.css";
import image from "../../assets/logo-dark.png"
function Contact({ user }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlasttName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const formErrors = {};
        if (!firstName) formErrors.firstName = "First name is required";
        if (!lastName) formErrors.lastName = "Last name is required";
        if (!email) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid";
        if (!tel) formErrors.tel = "Telephone is required";
        else if (!/^\d{10}$/.test(tel)) formErrors.tel = "Telephone must be 10 digits";
        if (!message) formErrors.message = "Message is required";

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

    const handleSubject = (e) => {
        setSubject(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFirstName("");
        setEmail("")
        setTel("")
        setSubject("")
        setMessage("")
        setlasttName("")
        if (validateForm()) {
            setFirstName("");
            setlasttName("");
            setEmail("");
            setTel("");
            setSubject("");
            setMessage("");
            setErrors({});
        }


    }

    return (
        <div className="contact">

            <div className="heading">
                <img src={image} />
                {/* <img src={image}/> */}
                <h2>Contact Us!</h2>
            </div>



            <p>PHA Foundation is a Public Company registered with the Securities and Exchange Commission of Pakistan under Section 42 of the Companies Ordinance, 1984. Being one of the implementing arms of the Ministry of Housing & Works, PHA Foundation is consistently striving to eliminate shelterlessness and reduce the housing shortfall in Pakistan.</p>

            <div className="information">
                <div className="Contactinformation">
                    <h3>Contact Information</h3>
                    <p>Shaheed-e-Milat Secretariat, Ground Floor, Blue Area, Islamabad  <a data-v-79c31995="" href="mailto:webmaster@pha.gov.pk" class="email">webmaster@pha.gov.pk</a></p>
                  
                </div>

                <div className="Contactinformation">
                    <h3>Useful Links</h3>
                    <ul data-v-79c31995="" class="links-list"><li data-v-79c31995="">
                        <a data-v-79c31995="" href="https://mohw.gov.pk" target="_blank" class="link"><i data-v-79c31995="" class="fas fa-external-link-alt"></i> Ministry of Housing &amp; Works</a></li><li data-v-79c31995=""><a data-v-79c31995="" href="https://fgeha.gov.pk" target="_blank" class="link"><i data-v-79c31995="" class="fas fa-external-link-alt"></i> FGEHA</a></li><li data-v-79c31995=""><a data-v-79c31995="" href="https://sifc.gov.pk" target="_blank" class="link"><i data-v-79c31995="" class="fas fa-external-link-alt"></i> Special Investment Facilitation Council (SIFC)</a></li><li data-v-79c31995=""><a data-v-79c31995="" href="https://mohtasib.gov.pk" target="_blank" class="link"><i data-v-79c31995="" class="fas fa-external-link-alt"></i> Wafaqai Mohtasib</a></li></ul>
                </div>

                <div className="Contactinformation">
                <h3>Policies</h3>
                    <ul data-v-79c31995="" class="links-list"><li data-v-79c31995=""><a data-v-79c31995="" href="#term-of-use" class="link"><i data-v-79c31995="" class="fas fa-file-alt"></i> Terms of Use</a></li><li data-v-79c31995=""><a data-v-79c31995="" href="#terms-and-conditions" class="link"><i data-v-79c31995="" class="fas fa-file-alt"></i> Terms and Conditions</a></li><li data-v-79c31995=""><a data-v-79c31995="" href="#refund-policy" class="link"><i data-v-79c31995="" class="fas fa-file-alt"></i> Refund Policy</a></li><li data-v-79c31995=""><a data-v-79c31995="" href="#disclaimer" class="link"><i data-v-79c31995="" class="fas fa-file-alt"></i> Disclaimer</a></li></ul>

                </div>
            </div>
        </div>

    )

} export default Contact