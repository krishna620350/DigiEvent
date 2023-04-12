import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';

// import Header from "./Header";
import Menu from './Navbar';
import state from "../../Json/State.json";
import URL from "../../Json/Url.json";
import GuestApi from '../../Apis/GuestApi';
import html2canvas from 'html2canvas';

function GuestForm() {
    const [data, setData] = useState([]);

    const selectRef = useRef();
    const { id } = useParams();
    const urlParams = new URLSearchParams(window.location.search);
    const Vid = urlParams.get('Vid');
    const TicketId = urlParams.get('ticketid');
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
        formValue.status = -1
        formValue.Vid = Vid;
        formValue.TicketId = TicketId;
        api.UpdateData(formValue).then(response => {
            if (response.id !== "") {
                alert("You have successfully Book a Tickets 🙏🙏🙏🙏🙏");

                const card = document.querySelector("#card");

                html2canvas(card).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "mm",
                        format: "a4"
                    });
                    pdf.addImage(imgData, 'PNG', 10, 10, 150, 150);
                    // pdf.text(`Response: ${JSON.stringify(response)}`, 10, 70);
                    pdf.save(`${formValue.GuestName}_${TicketId}.pdf`);
                });
                navigate(`/VendorResponse/${id}?Vid=${response.id}`);
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
            <Container className='text-white'>
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
                        <Form method='POST' action='/' onSubmit={HandleSubmit}>
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
                                                    <option key={state.value} value={state.name} className='text-white'>
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
                        
                    </div>
                )}
                <div className="card align-items-center" style={{ position: 'absolute', left: -10000 }} id='card'>
                    <div className='' style={{ backgroundColor: 'white' }}>
                        <QRCode value={`${URL.URL}/Scanner/${id}?ticketid=${TicketId}`} size="200" />
                    </div>
                    <div className="card-body" style={{ backgroundColor: 'white' }}>
                        <h5 className="card-title">{ data.EventName }</h5>
                        <ul className="list-group">
                            <li className="list-group-item"><b style={{backgroundColor: 'white'}}>Guest Name : </b>{ formValue.GuestName }</li>
                            <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Guest Email or Phone Number: </b>{formValue.GuestEmail} | { formValue.GuestPhone }</li>
                            <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Guest Ticket Id: </b>{TicketId}</li>
                            <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Vendor Id: </b>{Vid}</li>
                            <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Event Id: </b>{id}</li>
                        </ul>
                    </div>
                </div>
            </Container>
        </>

    );
}

export default GuestForm;