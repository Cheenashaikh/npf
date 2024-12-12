
import React, { useEffect, useState } from "react";
import "./projectSummary.css";
import Slip from "./slip";
import axios from "axios";
import Cookies from "js-cookie";
import Project from "../project";

function ProjectSummary({ user }) {
    const [modal, setModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [partialPayment, setPartialPayment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [slipModal, setSlipModal] = useState(false);
    const [inputError, setInputError] = useState("");
    const [projectSummary, setProjectSummary] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const toggleModal = () => {
        setModal(!modal);
    };

    const openPaymentModal = (data) => {
        setPaymentData(data);
      
        setPaymentModal(true);
       
    };

    const closePaymentModal = () => {
        setPaymentData(null);
        setPaymentModal(false);
    };

    const handleRadioChange = (e) => {
        setPaymentMethod(e.target.value);
    };


    const openSlipModal = () => {

        if (!partialPayment || isNaN(partialPayment)) {
            setInputError("Please enter a valid numeric value for partial payment.");
            return;
        }

        setInputError("");
        setSlipModal(true);
    };

    const closeSlipModal = () => {
        setSlipModal(false);
    };
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                console.log("Fetching project summary for CNIC:", user.cnic);
                const token = "30264|ZOrc7MNmEIgk3Rd6gUrZnFmoOdxKWaPWv3SOGP6g9a014ddd";


                await axios.get("/membership/sanctum/csrf-cookie", { withCredentials: true });
                const csrfToken = Cookies.get("XSRF-TOKEN");

                const response = await axios.post(
                    "/membership/api/AllotteePaymentSummaryPortal",
                    {
                        // cnic: user.cnic,
                        registrationNo: user.registrationNo
                    },
                    {
                        headers: {
                            "X-XSRF-TOKEN": csrfToken,
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                console.log("API response:", response.data);

                if (response.data.status && response.data.data?.projectSummary) {
                    setProjectSummary(response.data.data.projectSummary);
                } else {
                    setError(response.data.message || "No data found");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.response?.data?.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user]);

    return (
        <div className="projectSummary">
            <div className="card" onClick={toggleModal}>
                <div className="card-inner projectSum">
                    <h3>{projectSummary?.RegistrationNo}</h3>
                </div>
                <h3>{projectSummary?.ProjectName}</h3>
            </div>

            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <h3>Payment Details</h3>
                        <h2>Project Information</h2>
                        <div className="information">
                            <p>
                                <span>Registration No:</span>
                                {projectSummary.RegistrationNo}
                            </p>
                            <p>
                                <span>Project Name:</span>
                                {projectSummary.ProjectName}
                            </p>
                            <p>
                                <span>Application Name:</span>
                                {projectSummary.ApplicantName}
                            </p>
                            <p>
                                <span>Total Cost Of Unit:</span>
                                {projectSummary.TotalCastOfUnit}
                            </p>
                        </div>
                        <h2>Payment History</h2>
                        <div className="history">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Schedule Type</th>
                                        <th>DDPONumber</th>
                                        <th>Amount Paid</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectSummary.length > 0 ? (
                                        projectSummary.map((project, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{project.PaymentSchedule.map((schedule, idx) => (
                                                        <div key={idx}>{schedule.ScheduleType}</div>
                                                    ))}</td>
                                                    <td>
                                                        {project.PaymentHistory.map((payment, idx) => (
                                                            <div key={idx}>{payment.DDPONumber}</div>
                                                        ))}
                                                    </td>
                                                    <td>{project.PaymentSchedule.map((amount, idx) => (
                                                        <div key={idx}>{amount.AmountPaid}</div>
                                                    ))}</td>
                                                    <td>{project.PaymentSchedule.map((payment, idx) => (
                                                        <div key={idx}>{payment.PaymentDate}</div>
                                                    ))}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No payment history available</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                            <div className="history">
                                <table className="history-table action">
                                    <thead>
                                        <tr>
                                            <th>Schedule Type</th>
                                            <th>Due Date</th>
                                            <th>Amount Due</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {/* {["type1", "type2", "type3", "type4"].map(
                                            (type, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{user[type] || "N/A"}</td>
                                                        <td>
                                                            {user[`date${index + 1}`] || "N/A"}
                                                        </td>
                                                        <td>
                                                            {user[`payment${index + 1}`] || "N/A"}
                                                        </td>
                                                        <td>
                                                            {user[`status${index + 1}`] || "N/A"}
                                                        </td> */}

                                         {projectSummary.length > 0 ? (
                                            projectSummary.map((project, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{project.PaymentSchedule.map((schedule, idx) => (
                                                            <div key={idx}>{schedule.ScheduleType}</div>
                                                        ))}</td>
                                                        <td>
                                                            {project.PaymentHistory.map((payment, idx) => (
                                                                <div key={idx}>{payment.DDPONumber}</div>
                                                            ))}
                                                        </td>
                                                        <td>{project.PaymentSchedule.map((amount, idx) => (
                                                            <div key={idx}>{amount.AmountPaid}</div>
                                                        ))}</td>
                                                        <td>{project.PaymentSchedule.map((payment, idx) => (
                                                            <div key={idx}>{payment.PaymentDate}</div>
                                                        ))}</td>
                                                        <td>{project.PaymentSchedule.map((schedule, idx) => (
                                                            <div key={idx}>{schedule.Action}</div>
                                                        ))}</td> 
                                                        <td className="button">
                                                            
                                                            {project.PaymentSchedule.some(schedule => schedule.Action === 'Make Payment') && (
                                                                <button
                                                                    onClick={() =>
                                                                        openPaymentModal({
                                                                            type: project.PaymentSchedule[0].ScheduleType,
                                                                            dueDate: project.PaymentHistory[0]?.DueDate,
                                                                            amountDue: project.PaymentSchedule[0].AmountDue,
                                                                            status: project.PaymentSchedule[0].Status,
                                                                        })
                                                                    }
                                                                >
                                                                    Make Payment
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="6">No payment history available</td>
                                            </tr>
                                        )} 

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}

            {paymentModal &&  (
                <div className="modal">
                    <div className="overlay" onClick={closePaymentModal}></div>
                    <div className="modal-content">
                        <h3>Payment Information</h3>
                        <p>
                            <span>Schedule Type: </span>
                            {paymentModal.ScheduleType}
                        </p>
                        <p>
                            <span>Due Date: </span>
                            {paymentModal.DueDate}
                        </p>
                        <p>
                            <span>Amount Due: </span>
                            {paymentModal.AmountDue}
                        </p>
                        <p>
                            <span>Status: </span>
                            {paymentModal.Status}
                        </p>
                        <form>
                            <div className="input_group">
                                <input
                                    value={partialPayment}
                                    type="text"
                                    id="payment"
                                    placeholder=" "
                                    required
                                    onChange={(e) => setPartialPayment(e.target.value)}
                                />
                                <label htmlFor="Partial-payment">Partial Payment</label>
                            </div>
                            {inputError && <p className="error">{inputError}</p>}
                        </form>
                        <div className="payment">
                            <label htmlFor="partialPayment">Partial Payment</label>
                            <input
                                type="radio"
                                id="psid"
                                name="paymentMethod"
                                value="PSID"
                                checked={paymentMethod === "PSID"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="psid">PSID</label>

                            <input
                                type="radio"
                                id="card"
                                name="paymentMethod"
                                value="Card"
                                checked={paymentMethod === "Card"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="card">Card</label>

                            <input
                                type="radio"
                                id="bank"
                                name="paymentMethod"
                                value="Bank"
                                checked={paymentMethod === "Bank"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="bank">Bank</label>

                            <button className="slip" onClick={openSlipModal}>
                                Generate Slip
                            </button>
                        </div>
                        <button onClick={closePaymentModal}>Close</button>
                    </div>
                </div>
            )}
            {slipModal && (
                <div className="modal">
                    <div className="overlay" onClick={closeSlipModal}></div>
                    <div className="slip-modal">
                        <Slip
                            user={user}
                            payment={paymentData}
                            paymentMethod={paymentMethod}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectSummary;
 