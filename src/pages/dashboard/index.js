import React from "react";
import {  BsFillArchiveFill } from 'react-icons/bs';
import "./dashboard.css"


function Dashboard({ user }) {
    return (
        <main className="main-container">
             
            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <h3>Projects</h3>
                        <BsFillArchiveFill className="card_iicon" />

                    </div>
                    <h1>{user.projects}</h1>
                </div>
            </div>

            <div className="card">
                <div className="card-inner">
                    <h3>Active</h3>
                    <BsFillArchiveFill className="card_iicon" />

                </div>
                <h1>{user.active}</h1>
            </div>

            <div className="card">
                    <div className="card-inner">
                        <h3>Passive</h3>
                        <BsFillArchiveFill className="card_iicon" />

                    </div>
                    <h1>{user.passive}</h1>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <h3>Payment</h3>
                        <BsFillArchiveFill className="card_iicon" />

                    </div>
                    <h1>{user.payment}</h1>
                </div>
        </main>
    );
}

export default Dashboard;
