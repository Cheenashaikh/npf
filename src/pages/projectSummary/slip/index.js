import React, { useState, useEffect } from "react";
import "./slip.css";

function Slip({  payment, paymentMethod }) {
    const [slipNumber, setSlipNumber] = useState("");

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

    return (
        <div className="slip">
            <h3>PHA Invoice</h3>
            <h4>(PHA Residencia Peshawar)</h4>
            <div className="slipNo">
                <h6>Slip No: {slipNumber}</h6>
                <h6>Date: {formattedDate}</h6>
            </div>
           
            <div className="info">
                <h4>Member Information</h4>
                <table className="history-table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Member No</td>
                            <td>{payment.RegistrationNo || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{payment.ApplicantName || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>CNIC</td>
                            <td>{payment.CNIC || "N/A"}</td>
                        </tr>
                    </tbody>
                </table>

                <h4>Payment Information</h4>
                <table className="history-table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Payment Detail</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{paymentMethod || "N/A"}</td>
                            <td>{payment.AmountDue || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td>{payment || "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Slip;


