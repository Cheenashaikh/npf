import React, { useEffect, useState } from "react";
import "./project.css";
import axios from "axios";
import Cookies from "js-cookie";

function Project({ user }) {
    const [projects, setProjects] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const openModal = (project) => {
        console.log("Open Modal clicked");
        setSelectedProject(project);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setSelectedProject(null);
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
                } else {
                    setError(response.data.message || "No projects found.");
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

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                console.log("Fetching project summary for CNIC:", user.cnic);
                const token = "30264|ZOrc7MNmEIgk3Rd6gUrZnFmoOdxKWaPWv3SOGP6g9a014ddd";

                await axios.get("/membership/sanctum/csrf-cookie", { withCredentials: true });
                const csrfToken = Cookies.get("XSRF-TOKEN");

                const response = await axios.post(
                    "/membership/api/AllotteePaymentSummaryPortal",
                    {
                        registrationNo: user.registrationNo,
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
                console.log("CSRF TOKEN", csrfToken);
                console.log("header", `Bearer ${token}`);

                console.log("data:", response.data);
                console.log(response.data.data.projectHistory);

                if (response.data.status && response.data.data?.History > 0) {
                    setHistory(response.data.data.projectHistory);
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

        fetchHistory();
    }, [user]);

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
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>
                        <p><strong>Project Name:</strong> {selectedProject.ProjectName}</p>
                        <p><strong>Project Code:</strong> {selectedProject.ProjectCode}</p>
                        <div className="col-6 tab p-5">
                            <ul className="d-flex">
                                <li className="flex-fill">Payment History</li>
                                <li className="flex-fill">Schedule</li>
                            </ul>
                            <div className="content"></div>
                            <h2>Payment History:</h2>
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
                                        {history.length > 0 ? (
                                            history.map((project, index) => (
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
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">No payment history available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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

