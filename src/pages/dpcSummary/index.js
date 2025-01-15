import React, { useEffect, useState } from "react";
import "./dpcSummary.css";
import axios from "axios";
import Cookies from "js-cookie";
function DpcSummary({ user }) {

    const [projects, setProjects] = useState([]);
    const [dpc, setDpc] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
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
                    setRegistrationNo(response.data.data.projects.RegistrationNo)
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
        const fetchDPC = async () => {
            try {
                const token = "30264|ZOrc7MNmEIgk3Rd6gUrZnFmoOdxKWaPWv3SOGP6g9a014ddd";

                await axios.get("/membership/sanctum/csrf-cookie", { withCredentials: true });
                const csrfToken = Cookies.get("XSRF-TOKEN");

                const response = await axios.post(
                    "/membership/api/dpcsummary",
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
                console.log("AA")



                if (response.data.status && response.data.data) {
                    setDpc(response.data.data || []);
                    console.log("DPC Data set:", response.data.data.DPC);

                } else {
                    setError(response.data.message || "No data found");
                }

            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
            console.log("dpc:", dpc);
        };

        fetchDPC();
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
                        <th>Project Details</th>
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
                                <td>{project.PropertyDetail}</td>
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

                        <p><strong>Membership No :</strong> {selectedProject.RegistrationNo}</p>
                        <p><strong>Applicant Name:</strong> {selectedProject.ApplicantName}</p>
                        <p><strong>Total Cost of Uni:</strong> {dpc.TotalCastOfUnit}</p>
                        <p><strong>Total Paid:</strong> {dpc.TotalPaidAmount}</p>
                        <p><strong>Remaining Amount:</strong> {dpc.TotalRemaining}</p>



                        <div className="content">


                            <>
                                <h2>DPC Details:</h2>
                                <div className="history">
                                    <table className="history-table" id="table">
                                        <thead>
                                            <tr>
                                                <th> Intallment</th>
                                                <th>Amount Paid</th>
                                                <th>Schedule Date</th>
                                                <th>Payment Date</th>
                                                <th>Period of DPC(Days)</th>
                                                <th>Rate 1% (per month)</th>
                                                <th>DPC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dpc.DPC && dpc.DPC.length > 0 ? (
                                                dpc.DPC.map((payment, index) => (
                                                    <tr key={index}>
                                                        <td>{payment.AmountDue}</td>
                                                        <td>{payment.AmountPaid}</td>
                                                        <td>{payment.DueDate}</td>
                                                        <td>{payment.PaymentDate}</td>
                                                       
                                                        <td>{payment.PerDayAmount}</td>
                                                        <td>{payment.RatePerMonth}</td>
                                                        <td>{payment.DPC}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8">No DPC records available</td>
                                                </tr>
                                            )}

                                        </tbody>

                                    </table>
                                </div>
                            </>


                        </div>
                    </div>
                </div>

            )}

            {loading && <p>Loading projects...</p>}
            {error && <p>{error}</p>}
        </div>

    )

} export default DpcSummary