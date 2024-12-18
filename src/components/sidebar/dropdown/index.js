import React from "react";
import "./dropdown.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dropdown({logout}){
    const navigate = useNavigate();
      const handleLogout=()=>{
            navigate("/")
        }
    return(
        
              <div className="flex flex-col dropdown">
                <ul className="flex flex-col gap-4">
                  {/* <li onClick={handleLogout}>LogOut</li> */}
                  <li ><div >
                        
                        <Link to="/" onClick={logout} style={{textDecoration:"none"}}>
                            <li >Logout</li>
                        </Link>
                    </div></li>
                  <li>Profile</li>
                </ul>
              </div>
            );
          }
          

   
export default Dropdown