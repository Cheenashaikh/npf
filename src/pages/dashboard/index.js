import React from "react";
import { BsFillArchiveFill, BsCurrencyDollar, BsCreditCard, BsGraphUp } from "react-icons/bs";
import { FaBuilding, FaCoins, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import "./dashboard.css"


function Dashboard({ user }) {
    return (
        <main className="main-container">
        
            <div className="main-cards">
          
                <div className="card">
                    <div className="card-inner">
                    <FaBuilding className="card_iicon" id=" one" />
                        <h3>Total Apartment</h3>
                     
                        <h3>150</h3>

                    </div>
                  
                </div>
            </div>

       




                <div className="main-cards">
          
          <div className="card">
              <div className="card-inner">
              <BsGraphUp className="card_iicon" id="two" />
                  <h3>Total Apartment</h3>
                  
                  <h3>150</h3>
                  

              </div>
            
          </div>
      </div>

      <div className="card">
          <div className="card-inner">
          <BsCreditCard className="card_iicon" id="three" />
              <h3>Total Cost</h3>
              <h3>RS 750,000.00</h3>

          </div>
        
      </div>

      

          <div className="card">
              <div className="card-inner">
              <BsCurrencyDollar className="card_iicon" id="four" />
                  <h3>Remaining</h3>
                
                  <h3>Rs 350,000.00</h3>
              </div>
              
          </div>

          <div className="main-cards">
          
                <div className="card">
                    <div className="card-inner">
                    <FaBuilding className="card_iicon" id=" one" />
                        <h3>Total Apartment</h3>
                     
                        <h3>150</h3>

                    </div>
                  
                </div>
            </div>

       




                <div className="main-cards">
          
          <div className="card">
              <div className="card-inner">
              <BsGraphUp className="card_iicon" id="two" />
                  <h3>Total Apartment</h3>
                  
                  <h3>150</h3>
                  

              </div>
            
          </div>
      </div>

      <div className="card">
          <div className="card-inner">
          <BsCreditCard className="card_iicon" id="three" />
              <h3>Total Cost</h3>
              <h3>RS 750,000.00</h3>

          </div>
        
      </div>

      

          <div className="card">
              <div className="card-inner">
              <BsCurrencyDollar className="card_iicon" id="four" />
                  <h3>Remaining</h3>
                
                  <h3>Rs 350,000.00</h3>
              </div>
              
          </div>
          <div className="main-cards">
          
          <div className="card">
              <div className="card-inner">
              <FaBuilding className="card_iicon" id=" one" />
                  <h3>Total Apartment</h3>
               
                  <h3>150</h3>

              </div>
            
          </div>
      </div>

 




          <div className="main-cards">
    
    <div className="card">
        <div className="card-inner">
        <BsGraphUp className="card_iicon" id="two" />
            <h3>Total Apartment</h3>
            
            <h3>150</h3>
            

        </div>
      
    </div>
</div>

<div className="card">
    <div className="card-inner">
    <BsCreditCard className="card_iicon" id="three" />
        <h3>Total Cost</h3>
        <h3>RS 750,000.00</h3>

    </div>
  
</div>



    <div className="card">
        <div className="card-inner">
        <BsCurrencyDollar className="card_iicon" id="four" />
            <h3>Remaining</h3>
          
            <h3>Rs 350,000.00</h3>
        </div>
        
    </div>
    <div className="main-cards">
          
          <div className="card">
              <div className="card-inner">
              <FaBuilding className="card_iicon" id=" one" />
                  <h3>Total Apartment</h3>
               
                  <h3>150</h3>

              </div>
            
          </div>
      </div>

 




          <div className="main-cards">
    
    <div className="card">
        <div className="card-inner">
        <BsGraphUp className="card_iicon" id="two" />
            <h3>Total Apartment</h3>
            
            <h3>150</h3>
            

        </div>
      
    </div>
</div>

<div className="card">
    <div className="card-inner">
    <BsCreditCard className="card_iicon" id="three" />
        <h3>Total Cost</h3>
        <h3>RS 750,000.00</h3>

    </div>
  
</div>



    <div className="card">
        <div className="card-inner">
        <BsCurrencyDollar className="card_iicon" id="four" />
            <h3>Remaining</h3>
          
            <h3>Rs 350,000.00</h3>
        </div>
        
    </div>
   
         


      
        </main>
    );
}

export default Dashboard;
