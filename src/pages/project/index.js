import React, { useEffect, useState } from "react";
import "./project.css";
import axios from "axios";
import Cookies from "js-cookie";

function Project({ user }) {
    const [projects, setProjects] = useState([]);
    const [history, setHistory] = useState([]);
    const [paymentSchedule, setPaymentSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState("history");
    const [registrationNo, setRegistrationNo] = useState(null)

    const openModal = (project) => {
        setSelectedProject(project);
        setRegistrationNo(project.RegistrationNo)
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setSelectedProject(null);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = "30264|ZOrc7MNmEIgk3Rd6gUrZnFmoOdxKWaPWv3SOGP6g9a014ddd";

                await axios.get("/membership/sanctum/csrf-cookie", { withCredentials: true });
                const csrfToken = Cookies.get("XSRF-TOKEN");

                const response = await axios.post(
                    "/membership/api/getProjectsByCnic",
                    { cnic: user.cnic },
                    {
                        headers: {
                            "X-XSRF-TOKEN": csrfToken,
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                if (response.data.status && response.data.data?.projects) {
                    setProjects(response.data.data.projects);
                    // setRegistrationNo(response.data.data.projects.RegistrationNo)
                } else {
                    setError(response.data.message || "No projects found.");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user]);

    useEffect(() => {
        if (!registrationNo) return;
        const fetchHistory = async () => {
            try {
                const token = "30264|ZOrc7MNmEIgk3Rd6gUrZnFmoOdxKWaPWv3SOGP6g9a014ddd";

                await axios.get("/membership/sanctum/csrf-cookie", { withCredentials: true });
                const csrfToken = Cookies.get("XSRF-TOKEN");

                const response = await axios.post(
                    "/membership/api/AllotteePaymentSummaryPortal",
                    { RegistrationNo: registrationNo },
                    {
                        headers: {
                            "X-XSRF-TOKEN": csrfToken,
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                console.log("AA")
                console.log(registrationNo)
               

                if (response.data.status && response.data.data) {
                    setHistory(response.data.data.PaymentHistory || []);
                    setPaymentSchedule(response.data.data.PaymentSchedule || []);
                }
                 else {
                    setError(response.data.message || "No data found");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
            console.log("History:", history);
            console.log("Payment Schedule:", paymentSchedule);        };

        fetchHistory();
    }, [registrationNo]);

    return (
        <div className="table">
        
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Registration Number</th>
                        <th>Applicant Name</th>
                        <th>CNIC</th>
                        <th>Project Name</th>
                        <th>Project Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
               
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <tr key={project.ProjectID}>
                                <td>{project.RegistrationNo}</td>
                                <td>{project.ApplicantName}</td>
                                <td>{project.CNIC}</td>
                                <td>{project.ProjectName}</td>
                                <td>{project.ProjectCode}</td>
                                <td className="button">
                                    <button onClick={() => openModal(project)}>View Details</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No projects available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {modal && selectedProject && (
                <div className="modal">
                <div className="overlay" onClick={closeModal}></div>
                    <div className="modal-content" >
                        
                        <p><strong>Project Name:</strong> {selectedProject.ProjectName}</p>
                        <p><strong>Project Code:</strong> {selectedProject.ProjectCode}</p>

                        <div className="tabs">
                            <ul className="tab">
                                <li
                                    className={`flex-fill ${activeTab === "history" ? "active" : ""}`}
                                    onClick={() => handleTabChange("history")}
                                >
                                    Payment History
                                </li>
                                <li
                                    className={`flex-fill ${activeTab === "schedule" ? "active" : ""}`}
                                    onClick={() => handleTabChange("schedule")}
                                >
                                    Schedule
                                </li>
                                
                            </ul>


                            <div className="content">
                                {activeTab === "history" && (
                                    <>
                                        <h2>Payment History:</h2>
                                        <div className="history">
                                            <table className="history-table">
                                                <thead>
                                                    <tr>
                                                        <th>Payment Type</th>
                                                        <th>Amount Paid</th>
                                                        <th>DPO Number</th>
                                                        <th>Payment Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {history.length > 0 ? (
                                                        history.map((payment, index) => (
                                                            <tr key={index}>
                                                                <td>{payment.PaymentType}</td>
                                                                <td>{payment.AmountPaid}</td>
                                                                <td>{payment.DDPONumber}</td>
                                                                <td>{payment.PaymentDate}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4">No payment history available</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}

                                {activeTab === "schedule" && (
                                    <>
                                        <h2>Payment Schedule:</h2>
                                        <div className="history">
                                            <table className="history-table">
                                                <thead>
                                                    <tr>
                                                        <th>Schedule Type</th>
                                                        <th>Due Date</th>
                                                        <th>Amount Due</th>
                                                        <th>Amount Paid</th>
                                                        <th>Status</th>
                                                        <th>Installment No</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paymentSchedule.length > 0 ? (
                                                        paymentSchedule.map((schedule, index) => (
                                                            <tr key={index}>
                                                                <td>{schedule.ScheduleType}</td>
                                                                <td>{schedule.DueDate}</td>
                                                                <td>{schedule.AmountDue}</td>
                                                                <td>{schedule.AmountPaid}</td>
                                                                <td>{schedule.Status}</td>
                                                                <td>{schedule.InstallmentNo}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="6">No payment schedule available</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                                
                            </div>
                            <button onClick={closeModal} style={{color:"#FFFFFF"}}>Close</button>
                        </div>
                    </div>
                </div>
                
            )}

            {loading && <p>Loading projects...</p>}
            {error && <p>{error}</p>}
        </div>
    
    );
}

export default Project;
