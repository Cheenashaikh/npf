
import React, { useEffect, useState } from "react";
import "./project.css";
import axios from "axios";

function Project({ user }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {

            try {
                console.log("Fetching projects for CNIC:", user.cnic);
               
                // await axios.get(
                //     "http://175.107.14.182:8080/membership/sanctum/csrf-cookie",
                //     { withCredentials: true }
                // );
                await axios.get(
                    "http://175.107.14.182:8080/membership/sanctum/csrf-cookie",
                    { withCredentials: true }
                );
                
                const response = await axios.post(
                    "http://175.107.14.182:8080/membership/api/getProjectsByCnic",
                    { cnic: user.cnic },
                    {
                        headers: {
                            'X-CSRF-TOKEN': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1], 
                        },
                        withCredentials: true,
                    }
                );

                console.log("API response:", response.data);

                if (response.data.status) {
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
                    {projects.map((project) => (
                        <tr key={project.ProjectID}>
                            <td>{project.RegistrationNo}</td>
                            <td>{project.ApplicantName}</td>
                            <td>{project.CNIC}</td>
                            <td>{project.ProjectName}</td>
                            <td>{project.ProjectCode}</td>
                        </tr>
                    ))}


                </tbody>
            </table>

            {loading && <p>Loading projects...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Project;


