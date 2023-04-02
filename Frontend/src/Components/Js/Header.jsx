import React from "react";
import { Link } from "react-router-dom";

import "../Css/Header.css"
import Menu from "./Navbar";

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import {Link} from "react-router-dom"

class Header extends React.Component {
    
    render() {
        return <>
                {/* <Container>
                    <Row className="header">
                        <Col sm={8}>
                            <div
                                className="header-left"
                            >
                                <Link
                                    href="/"
                                >
                                    <span
                                    className="h-l"
                                    >
                                        Digi
                                    </span>
                                    .
                                    <span 
                                        className="h-r"
                                    >
                                        Event
                                    </span>
                                </Link>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div
                                className="header-right"
                            >
                                <div
                                    className="l-l"
                                >
                                    <Link
                                        to="/login"
                                        className="a-l"
                                    >
                                        login
                                    </Link>
                                    <Link
                                        to="/Register"
                                        className="a-r"
                                    >
                                        Sign-up
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Menu />
                    </Row>
                    </Container> */}
            <Menu />
            <div className="main-content">
                <ul>
                    <div className="eventContainer">
                        <li ><p href="#" className="create-event">Want to organise a business event? Or an event for an informal occasion? We've got you covered.</p></li>
                        <Link to='/Event' className="button1">create event</Link>
                    </div>
                    <div className="ongoingContainer">
                        <li ><a href="#" className="ongoing-events">Ongoing Events </a></li>
                    </div>
                </ul>
            </div>
            <footer>
                <p>Copyright &copy;2023 Tata Consultancy Services.</p>
            </footer>
            </>
    }
}

export default Header;