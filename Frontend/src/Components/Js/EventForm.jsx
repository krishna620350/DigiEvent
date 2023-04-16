import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import EventApi from "../../Apis/EventApi";
import data from "../../Json/State.json";
import Footer from "./Footer";
import Menu from './Navbar';

function EventForm() {
    const selectRef = useRef(null);
    const navigate = useNavigate();
    const api = new EventApi();
    const [formValue, setFormValue] = useState({
        HostName: '',
        EventName: '',
        HostEmail: '',
        HostPhone: 0,
        EventAddress: '',
        EventAddress_1: '',
        City: '',
        State: '',
        Zip: 0,
        EventDescription: '',
        StartDate: '',
        EndDate: '',
        TotalTicket: 0
    });
    const HandleInput = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        // console.log(formValue);
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        // console.log(JSON.stringify(formValue));
        api.InsertDate(formValue).then(response => {
            if (response !== '') {
                // console.log(response);
                alert("You have successfully Book a event 🙏🙏🙏🙏🙏")
                navigate(`/Response/${response}`);
            } else {
                alert("Your event is not booked 😭😭😭😭😭😭")
            }
        });
    }
    function isValidPhoneNumber(phoneNumber) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    }
    function isValidHostName(hostName) {
        const nameRegex = /^[A-Za-z ]+$/;
        return nameRegex.test(hostName);
    }
    function isValidEventName(eventName) {
        const nameRegex = /^[A-Za-z0-9 ]+$/;
        return nameRegex.test(eventName);
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isValidZip(zip) {
        const zipRegex = /^[0-9]{6}$/;
        return zipRegex.test(zip);
    }
    function isInvalid(value) {
        if (!value) {
          return true; // data is invalid
        }
        return false; // data is valid
    }
      
    return (
        <>
        <Container>
            <Menu />
            <p class="h1">Event Form</p><hr />
            <Form method="POST" action="#" onSubmit={HandleSubmit}>
                <Card className="border border-info border-3  mb-3">
                    <Card.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Host Name<span style={{color: 'red'}}>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Host Name" name='HostName' value={formValue.HostName} onChange={HandleInput} required pattern="[A-Za-z0-9]+" className={isValidHostName(formValue.HostName) ? '' : 'is-invalid'}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Event Name<span style={{color: 'red'}}>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Event Name" name='EventName' value={formValue.EventName} onChange={HandleInput} required pattern="[A-Za-z0-9]+"className={isValidEventName(formValue.EventName) ? '' : 'is-invalid'} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>abc@example.com<span style={{color: 'red'}}>*</span></Form.Label>
                                <Form.Control type="email" placeholder="Enter Host Email ID" name='HostEmail' value={formValue.HostEmail} onChange={HandleInput} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className={isValidEmail(formValue.HostEmail) ? '' : 'is-invalid'}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>10 digit phone number<span style={{color: 'red'}}>*</span></Form.Label>
                                <Form.Control type="tel" placeholder="Enter Host Phone No." name='HostPhone' value={formValue.HostPhone} onChange={HandleInput} pattern="[0-9]{10}" required maxLength={10} className={isValidPhoneNumber(formValue.HostPhone) ? '' : 'is-invalid'} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Event Address<span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="1234 Main St" name='EventAddress' value={formValue.EventAddress} onChange={HandleInput} required className={isInvalid(formValue.EventAddress) ? 'is-invalid' : ''}/><br></br>
                            <Form.Control type="text" placeholder="Apartment, studio, or floor" name='EventAddress_1' value={formValue.EventAddress_1} onChange={HandleInput} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter city name" name='City' value={formValue.City} onChange={HandleInput} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select name='State' value={formValue.State} onChange={HandleInput} ref={selectRef}>
                                    <option value="" >Choose...</option>
                                    {data.map(state => (
                                        <option key={state.value} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>PIN Code<span style={{color: 'red'}}>*</span></Form.Label>
                                <Form.Control name='Zip' value={formValue.Zip} placeholder="6 digit PIN Code" onChange={HandleInput}pattern="[1-9][0-9]{5}" required className={isValidZip(formValue.Zip) ? '' : 'is-invalid'}  />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name='EventDescription' value={formValue.EventDescription} onChange={HandleInput} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Event Start Date<span style={{color: 'red'}}>*</span></Form.Label>
                                <Form.Control type="date" name='StartDate' value={formValue.StartDate} onChange={HandleInput} min={new Date().toISOString().split('T')[0]} required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Event End Date<span style={{color: 'red'}}>*</span></Form.Label>
                                <Form.Control type="date" name='EndDate' value={formValue.EndDate} onChange={HandleInput} min={formValue.StartDate} required/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Total Tickets<span style={{color: 'red'}}>*</span></Form.Label>
                            <Form.Control type="number" placeholder="Enter Host Name" name='TotalTicket' value={formValue.TotalTicket} onChange={HandleInput} required min={1}/>
                        </Form.Group>
                    </Card.Body>
                </Card>

                <Button variant="primary" type="submit" className='mb-5'>
                    Submit
                </Button>
            </Form>
            </Container>
            <Footer />
        </>
    );
}

export default EventForm;
