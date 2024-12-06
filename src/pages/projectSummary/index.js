import React, { useState } from "react";
import "./projectSummary.css";
import Slip from "./slip";


function ProjectSummary({ user }) {
    const [modal, setModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [paymentData, setPaymentData] = useState(null);  
    const [partialPayment, setPartialPayment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [slipModal ,setSlipModal]= useState(false);
  

    const toggleModal = () => {
        setModal(!modal);
    };
    
    const openPaymentModal = (data) => {
        setPaymentData(data);
        setPaymentModal(true);
    };

    const closePaymentModal = () => {
        setPaymentData(null);
        setPaymentModal(false);
    };

    const handleRadioChange = (e) => {
        setPaymentMethod(e.target.value);
    };
  const openSlipModal=()=>{
    setSlipModal(true)
  }
  const closeSlipModal=()=>{
    setSlipModal(false)
  }
    
    
    
    

    return (
        <div className="projectSummary">
            <div className="card" onClick={toggleModal}>
                <div className="card-inner projectSum">
                    <h3>{user.registration}</h3>
                </div>
                <h3>{user.projectName}</h3>
            </div>

            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <h3>Payment Details</h3>
                        <h2>Project Information</h2>
                        <div className="information">
                            <p><span>Registration No:</span>{user.registration}</p>
                            <p><span>Project Name:</span>{user.projectName}</p>
                            <p><span>Project Name:</span>{user.name}</p>
                            <p><span>Total Cost Of Unit:</span>{user.payment}</p>
                        </div>
                        <h2>Payment History</h2>
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
                                    <td>{user.schedule || "N/A"}</td>
                                    <td>{user.ddop || "N/A"}</td>
                                    <td>{user.amount ? `₹${user.amount}` : "N/A"}</td>
                                    <td>{user.paymentDate || "N/A"}</td>
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
                                        {['type1', 'type2', 'type3', 'type4'].map((type, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{user[type] || "N/A"}</td>
                                                    <td>{user[`date${index + 1}`] || "N/A"}</td>
                                                    <td>{user[`payment${index + 1}`] || "N/A"}</td>
                                                    <td>{user[`status${index + 1}`] || "N/A"}</td>
                                                    <td className="button">
                                                        <button onClick={() => openPaymentModal({
                                                            type: user[type],
                                                            dueDate: user[`date${index + 1}`],
                                                            amountDue: user[`payment${index + 1}`],
                                                            status: user[`status${index + 1}`]
                                                        })}>Make Payment</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}

            {paymentModal && (
                <div className="modal">
                    <div className="overlay" onClick={closePaymentModal}></div>
                    <div className="modal-content">
                        <h3>Payment Information</h3>
                        <p><span>Schedule Type:  </span>{paymentData.type}</p>
                        <p><span>Due Date:  </span>{paymentData.dueDate}</p>
                        <p><span>Amount Due:  </span>{paymentData.amountDue}</p>
                        <p><span>Status:  </span>{paymentData.status}</p>
                        <form>
                            <div className="input_group">
                                <input
                                    value={partialPayment}
                                    type="text"
                                    id="payment"
                                    placeholder=" "
                                    required
                                    onChange={(e) => setPartialPayment(e.target.value)}
                                />
                                 <label htmlFor="Partial-payment">Partial Payment</label>
                            </div>
                        </form>
                        <div className="payment">
                            <label htmlFor="partialPayment">Partial Payment</label>
                            <input type="radio" id="psid" name="paymentMethod" value="PSID" checked={paymentMethod === "PSID"} onChange={handleRadioChange} />
                            <label htmlFor="psid">PSID</label>

                            <input type="radio" id="card" name="paymentMethod" value="Card" checked={paymentMethod === "Card"} onChange={handleRadioChange} />
                            <label htmlFor="card">Card</label>

                            <input type="radio" id="bank" name="paymentMethod" value="Bank" checked={paymentMethod === "Bank"} onChange={handleRadioChange} />
                            <label htmlFor="bank">Bank</label>
                            <button className="slip"  onClick={openSlipModal}>Generate Slip</button>

                        </div>
                        <button onClick={closePaymentModal}>Close</button>
                    </div>
                </div>
            )}
            {slipModal &&(
                <div className="modal">
                    <div className="overlay" onClick={closeSlipModal}></div>
                    <div className="slip-modal">
                    {/* <h3>PHA Invoice</h3>
                    <h4>(PHA Residencia Peshawar)</h4>
                        <p><span>Schedule Type:  </span>{paymentData.type}</p>
                        <p><span>Due Date:  </span>{paymentData.dueDate}</p>
                        <p><span>Amount Due:  </span>{paymentData.amountDue}</p>
                        <p><span>Status:  </span>{paymentData.status}</p>
                       */}
                       <Slip user={user} payment={paymentData} paymentMethod={paymentMethod} />

                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectSummary;

