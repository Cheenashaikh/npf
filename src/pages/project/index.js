import React from "react";
import "./project.css"
function Project({user}){
    return(
        <div className="table">
       
       <table className="content-table" >

            <thead >
                <tr>
                    <th>Registration Number</th>
                    <th>Applicant Name</th>
                    <th>CNIC</th>
                    <th>Project Name</th>
                    <th>Project Code</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.registration || "N/A"} </td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.cnic || "N/A"}</td>
                    <td>{user. projectName || "N/A"}</td>
                    <td>{user. code || "N/A"}</td>
                </tr>
            </tbody>
        </table>

        </div>

    )

}export default Project