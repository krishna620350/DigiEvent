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
        api.InsertData(formValue)
            .then(response => {
                // console.log(response);
                if (response && response.id) {
                    alert(`Your event is booked 🙏🙏🙏🙏🙏🙏🙏`);
                    navigate(`/event/${response.id}`);
                } else if (response && response.error) {
                    // console.log(response.error);
                    alert(`Your event is not booked 😭😭😭😭😭😭\n\n${response.error}`);
                } else {
                    console.log("Response not defined.");
                }
            }).catch(error => {
                console.log(error);
            });
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
                                <Form.Label>Host Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Host Name" name='HostName' value={formValue.HostName} onChange={HandleInput} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Event Name" name='EventName' value={formValue.EventName} onChange={HandleInput} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Host Email ID</Form.Label>
                                <Form.Control type="email" placeholder="Enter Host Email ID" name='HostEmail' value={formValue.HostEmail} onChange={HandleInput} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Host Phone Number</Form.Label>
                                <Form.Control type="tel" placeholder="Enter Host Phone No." name='HostPhone' value={formValue.HostPhone} onChange={HandleInput} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Event Address</Form.Label>
                            <Form.Control type="text" placeholder="1234 Main St" name='EventAddress' value={formValue.EventAddress} onChange={HandleInput} /><br></br>
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
                                <Form.Label>Zip</Form.Label>
                                <Form.Control name='Zip' value={formValue.Zip} onChange={HandleInput} />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name='EventDescription' value={formValue.EventDescription} onChange={HandleInput} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Event Start Date</Form.Label>
                                <Form.Control type="date" name='StartDate' value={formValue.StartDate} onChange={HandleInput} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Event End Date</Form.Label>
                                <Form.Control type="date" name='EndDate' value={formValue.EndDate} onChange={HandleInput} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Total Tickets</Form.Label>
                            <Form.Control type="number" placeholder="Enter Host Name" name='TotalTicket' value={formValue.TotalTicket} onChange={HandleInput} />
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