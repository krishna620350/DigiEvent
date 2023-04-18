import React from "react";
import { Link } from "react-router-dom";

import "../Css/Header.css"
import Menu from "./Navbar";

class Header extends React.Component {
    
    render() {
        return (
            <>
                <Menu />
                <div className="main-content">
                    <ul>
                        <div className="eventContainer">
                            <li ><p className="create-event">Want to organise a business event? Or an event for an informal occasion? We've got you covered.</p></li>
                            <Link to='/Event' className="button1">create event</Link>
                        </div>
                        <div className="ongoingContainer">
                            <li ><a href="/" className="ongoing-events">Ongoing Events </a></li>
                        </div>
                    </ul>
                </div>
            </>
        )
    }
}

export default Header;