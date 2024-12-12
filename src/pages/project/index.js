

import React, { useEffect, useState } from "react";
import "./project.css";
import axios from "axios";
import Cookies from "js-cookie";

function Project({ user }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                console.log("Fetching projects for CNIC:", user.cnic);

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

                console.log("API response:", response.data);

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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No projects available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {loading && <p>Loading projects...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Project;

