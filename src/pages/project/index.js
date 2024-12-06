import React from "react";
import "./project.css"
function Project({user}){
    return(
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
                <tr>
                    <td>{user.registration}</td>
                    <td>{user.name}</td>
                    <td>{user.cnic}</td>
                    <td>{user. projectName}</td>
                    <td>{user. code}</td>
                </tr>
            </tbody>
        </table>

        </div>

    )

}export default Project