
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./search.css";


function MakePayment({ user }) {
    const [registrationNo, setRegistrationNo] = useState(null);
    const [modal, setModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [partialPayment, setPartialPayment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [slipModal, setSlipModal] = useState(false);
    const [inputError, setInputError] = useState("");
    const [projectSummary, setProjectSummary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [projects, setProjects] = useState([]);
    const [history, setHistory] = useState([]);
    const [paymentSchedule, setPaymentSchedule] = useState([]);
    const [slipNumber, setSlipNumber] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);

 
    useEffect(() => {
        function generateRandomSlipNumber() {
            const prefix = "720-";
            const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
            return prefix + randomNumber.toString().padStart(7, '0');
        }
        setSlipNumber(generateRandomSlipNumber());
    }, []);

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

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
                    setRegistrationNo(response.data.data.projects[0].RegistrationNo);
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

                    setProjectSummary(response.data.data)
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
        };

        fetchHistory();
    }, [registrationNo]);


    const openPaymentModal = (schedule) => {
        setPaymentData(schedule);

        setPaymentModal(true);

    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const toggleModal = () => {
        setModal(!modal); 
    };
    


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
        
            const filtered = projects.filter((project) => 
              project.ProjectName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProjects(filtered);
        }
    };

    return (
        <div className="search">
            <p>Make Payment</p>

            <form>
    <div className="input_group">
        <input 
            style={{ width: "90%" }}
            type="text"
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown} 
            value={searchTerm}
        />
        <label htmlFor="">Select Project</label>
    </div>
</form>

<div className="projects-list">
    <div className="grid">
        {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
                <div key={project.RegistrationNo} className="card" onClick={toggleModal}>
                    <div className="card-inner">
                        <h3>{project.CNIC}</h3>
                    </div>
                    <h3>{project.ProjectName}</h3>
                </div>
            ))
        ) : (
            <p>No Projects Found</p>
        )}
    </div>
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
                                <th>Payment Type</th>
                                <th>DDPONumber</th>
                                <th>Amount Paid</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length > 0 ? (
                                history.map((payment, index) => (
                                    <tr key={index}>
                                        <td>{payment.PaymentType}</td>
                                        <td>{payment.DDPONumber}</td>
                                        <td>{payment.AmountPaid}</td>
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
                                {paymentSchedule.length > 0 ? (
                                    paymentSchedule.map((schedule, index) => (
                                        <tr key={index}>
                                            <td>{schedule.ScheduleType}</td>
                                            <td>{schedule.DueDate}</td>
                                            <td>{schedule.AmountDue}</td>
                                            <td>{schedule.Status}</td>
                                            <td className="button">
                                                <button style={{ color: "white" }} onClick={() => openPaymentModal(schedule)}>
                                                    Make Payment
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No payment schedule available</td>
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
    
</div>

        
    );
}

export default MakePayment;
