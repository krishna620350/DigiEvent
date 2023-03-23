import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Header from "./Header";
import state from "../../Json/State.json";
import GuestApi from '../../Apis/GuestApi';

function GuestForm() {
    const [data, setData] = useState([]);

    const selectRef = useRef();
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        id:id,
        GuestName: '',
        GuestPhone: '',
        GuestEmail: '',
        TicketCount: 0,
        GuestAddress: '',
        GuestAddress_1: '',
        City: '',
        State: '',
        Zip: ''
    });
    const api = useMemo(() => new GuestApi(), []);

    const HandleInput = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        // console.log(formValue);
    }

    const HandleSubmit = (e) => { 
        e.preventDefault();
        // console.log(formValue);
        let Count = formValue.TicketCount;
        const Ticket = []
        while (Count > 0) {
            const randomBytes = crypto.getRandomValues(new Uint8Array(12));
            const hexString = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
            Ticket.push(hexString)
            Count--;
        }
        formValue.Paticipants = Ticket;
        // console.log(formValue)
        api.InsertDate(formValue).then(response => {
            if (response.success !== '') {
                // console.log(response);
                alert("You have successfully Book a Tickets 🙏🙏🙏🙏🙏")
                navigate(`/Participant/${id}?guest=${formValue.GuestPhone}`);
            } else {
                alert("Your Tickets is not booked 😭😭😭😭😭😭")
            }
        });
    }

    const fetchData = useCallback(() => {
        api.ReadData(id).then(result => {
            setData(result);
            // console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }, [id, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <Header />
        <Container>
            {data.length > 0 && (
                <div>
                    <Row>
                        <Col><b>Event Name:</b> {data[0].EventName}</Col>
                        <Col><b>Host Name:</b> {data[0].HostName}</Col>
                    </Row>
                    <Row>
                        <Col><b>Start Date:</b> {data[0].StartDate}</Col>
                        <Col><b>End Date:</b> {data[0].EndDate}</Col>
                    </Row>
                    <Row>
                        <Col><b>Host Contact:</b> {`${data[0].HostEmail} | ${data[0].HostPhone} | ${data[0].EventAddress} ${data[0].EventAddress_1}`}</Col>
                    </Row>
                </div>
                )}<hr></hr>
                <Form method='POST' action='/' onSubmit={ HandleSubmit }>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Guest Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" name="GuestName" value={ formValue.GuestName} onChange={ HandleInput } />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Guest Phone Number</Form.Label>
                            <Form.Control type="tel" placeholder="Enter Your Phone Number" name="GuestPhone" value={ formValue.GuestPhone } onChange={HandleInput} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Guest Email ID:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Your Email" name="GuestEmail" value={ formValue.GuestEmail } onChange={HandleInput} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Number of Ticket</Form.Label>
                            <Form.Control type="number" placeholder="Enter Number of Ticket" name="TicketCount" value={formValue.TicketCount} onChange={HandleInput} />
            </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
                        <Form.Control type='text' placeholder="1234 Main St" name="GuestAddress" value={formValue.GuestAddress} onChange={HandleInput} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
                        <Form.Control type='text' placeholder="Apartment, studio, or floor" name="GuestAddress_1" value={formValue.GuestAddress_1} onChange={HandleInput} />
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                    <Form.Control type='text' name="City" value={formValue.City} onChange={HandleInput} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                    <Form.Select type='text' name="State" value={formValue.State} onChange={HandleInput}  ref={selectRef}>
                        <option value=''>Choose...</option>
                    {state.map(state => (
                        <option key={state.value} value={state.name}>
                        {state.name}
                        </option>
                    ))}
        </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                    <Form.Control type='number' name="Zip" value={formValue.Zip} onChange={HandleInput} />
            </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
            </Container>
        </>
  );
}

export default GuestForm;