import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// import Header from "./Header";
import Menu from './Navbar';
import state from "../../Json/State.json";
import GuestApi from '../../Apis/GuestApi';
import Footer from './Footer';

function GuestForm() {
    const [data, setData] = useState([]);

    const selectRef = useRef();
    const { id, vid, ticketid } = useParams();
    
    // console.log(Vid, TicketId);
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        id: id,
        GuestName: '',
        GuestPhone: '',
        GuestEmail: '',
        GuestAddress: '',
        GuestAddress_1: '',
        City: '',
        State: '',
        Zip: '',
        Status: -1
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
        // formValue.status = -1
        formValue.Vid = vid;
        formValue.TicketId = ticketid;
        api.UpdateData(formValue).then(response => {
            if (response.id !== "") {
                alert("You have successfully Book a Tickets 🙏🙏🙏🙏🙏");
                navigate(`/ticket/${id}?vid=${response.id}&ticketid=${response.TicketId}`);
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
            {/* <Header /> */}
            <Menu />
            <Container className='text-white mb-5'>
                <h2 className='text-center mb-1 text-danger'>
                    Update Guest <Badge bg="secondary">Form</Badge>
                </h2>
                {data.length > 0 && (
                    <div>
                        <Card className="border border-info border-3  mb-3  ">
                            <Card.Body>
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
                            </Card.Body>
                        </Card>
                        {data[0].Guests.map((item, key) => {
                            {console.log(item.TicketId)}
                            if (item.Ticket === ticketid && item.Status === -1) {
                                return (
                                    <Form method='POST' action='/' onSubmit={HandleSubmit} key={key}>
                                        <Card className="border border-success border-3">
                                            <Card.Body>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Guest Name:</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Your Name" name="GuestName" value={formValue.VendorName} onChange={HandleInput} />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                        <Form.Label>Guest Phone Number</Form.Label>
                                                        <Form.Control type="tel" placeholder="Enter Your Phone Number" name="GuestPhone" value={formValue.VendorPhone} onChange={HandleInput} />
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Guest Email ID:</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter Your Email" name="GuestEmail" value={formValue.VendorEmail} onChange={HandleInput} />
                                                    </Form.Group>
                                                </Row>

                                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control type='text' placeholder="1234 Main St" name="GuestAddress" value={formValue.VendorAddress} onChange={HandleInput} />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                                    <Form.Label>Address 2</Form.Label>
                                                    <Form.Control type='text' placeholder="Apartment, studio, or floor" name="GuestAddress_1" value={formValue.VendorAddress_1} onChange={HandleInput} />
                                                </Form.Group>

                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridCity">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control type='text' name="City" value={formValue.City} onChange={HandleInput} />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridState">
                                                        <Form.Label>State</Form.Label>
                                                        <Form.Select type='text' name="State" value={formValue.State} onChange={HandleInput} ref={selectRef}>
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
                                            </Card.Body>
                                        </Card>
                                        <div className="text-center mt-3">
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }
                            return null;
                        })}
                        {data[0].Guests.filter((item) => item.Ticket === ticketid && item.Status === -1).length === 0 ? <h3 className='text-danger'>Guest Already Updated</h3> : null}
                    </div>
                )}
            </Container>
            <Footer />
        </>

    );
}

export default GuestForm;