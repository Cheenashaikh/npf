import React, { useEffect, useState } from "react";
import { BsFillArchiveFill, BsCurrencyDollar, BsCreditCard, BsGraphUp } from "react-icons/bs";
import { FaBuilding, FaCoins, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import "./dashboard.css";
import axios from "axios";
import Cookies from "js-cookie";

function Dashboard({ user }) {
    const [dashboardData, setDashboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "30264|ZOrc7MNmEIgk3Rd6gUrZnFmoOdxKWaPWv3SOGP6g9a014ddd";

                await axios.get("/membership/sanctum/csrf-cookie", { withCredentials: true });
                const csrf = Cookies.get("XSRF-TOKEN");

                const response = await axios.post(
                    "/membership/api/dashboardsummary",
                    { cnic: user.cnic },
                    {
                        headers: {
                            "X-XSRF-TOKEN": csrf,
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                if (response.data.status && response.data?.data?.projects) {
                    setDashboardData(response.data.data.projects);
                } else {
                    setError(response.data.message || "No projects found.");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return (
        <main className="main-container">
            {dashboardData.map((projects, index) => (
                <div className="main-cards" key={index}>
                  
                    <div className="card">
                        <div className="card-inner">
                            <FaBuilding className="card_iicon" id="one" style={{ color: "white" }} />
                            <h3>Property Detail</h3>
                            <h3>{projects.RegistrationNo}</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <BsCreditCard className="card_iicon" id="three" />
                            <h3>Total Cost</h3>
                            <h3>{projects.TotalCastOfUnit}</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <BsCurrencyDollar className="card_iicon" id="four" />
                            <h3>Total Paid</h3>
                            <h3>{projects.TotalPaidAmount}</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <BsGraphUp className="card_iicon" id="two" />
                            <h3>Remaining</h3>
                            <h3>{projects.TotalRemaining}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}

export default Dashboard;
