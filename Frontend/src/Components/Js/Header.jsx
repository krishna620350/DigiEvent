import React from "react";

import "../Css/Header.css"
import Menu from "./Navbar";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Link} from "react-router-dom"

class Header extends React.Component {
    
    render() {
        return <>
                <Container>
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
                    </Container>
            </>
    }
}

export default Header;