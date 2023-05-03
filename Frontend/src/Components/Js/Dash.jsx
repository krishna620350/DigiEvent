import React from "react";

import "../Css/Header.css";
import "../Css/dash.css";
import Menu from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
//const navigate=useNavigate();

const Dash = () => {

    const navigate=useNavigate();
    return (
      <>
        <div class="row d-row">
          <div class="col-sm-6">
            <div class="card logo">
              <div class="card-body">
                <h5 class="card-title logo-title">DigiEvent</h5>
                <p class="card-text">
                Experience unforgettable events with ease - plan, create and manage all in one place.
                </p>
                
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card sign-in">
              <div class="card-body">
                <h5 class="card-title sign-in-title">Sign up for free!</h5>
                {/* <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p> */}
                <ul className="buttons d-ul">
               <li className="d-li"> <a href='/login' onClick={()=>navigate("/login")} class="btn b-l ">
                  Log in
                </a></li>
                <li className="d-li"><a href='/signup' onClick={()=>navigate("/signup")} class="btn b-s">
                  Sign up
                </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }


export default Dash;



