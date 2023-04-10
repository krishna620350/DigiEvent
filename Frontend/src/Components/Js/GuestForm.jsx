import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';

// import Header from "./Header";
import Menu from './Navbar';
import state from "../../Json/State.json";
import GuestApi from '../../Apis/GuestApi';

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

function GuestForm() {
    const [token, setToken] = useState([])
    const [centredModal, setCentredModal] = useState(false);

    const toggleShow = () => setCentredModal(!centredModal);


    const [data, setData] = useState([]);

    const selectRef = useRef();
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState([{
        id: id,
        GuestName: '',
        GuestPhone: '',
        GuestEmail: '',
        GuestAddress: '',
        GuestAddress_1: '',
        City: '',
        State: '',
        Zip: ''
    }]);
    const api = useMemo(() => new GuestApi(), []);

    const HandleInput = (index, event) => {
        let data = [...formValue];
        data[index][event.target.name] = event.target.value;
        setFormValue(data);
        // const { name, value } = e.target;
        // setFormValue({ ...formValue, [name]: value });
        // console.log(formValue);
    }

    const addGuest = () => {
        let newGuest = {
            id: id,
            GuestName: '',
            GuestPhone: '',
            GuestEmail: '',
            GuestAddress: '',
            GuestAddress_1: '',
            City: '',
            State: '',
            Zip: ''
        }
        setFormValue([...formValue, newGuest]);
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        // console.log(formValue);
        let i = formValue.length-1;
        const tickets=[]
        while(i >= 0) {
            const randomBytes = crypto.getRandomValues(new Uint8Array(12));
            const ticket = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
            tickets.push(ticket)
            const newFormValue = { ...formValue[i], Ticket: ticket, Status: 0 };
            formValue[i] = newFormValue;
            // console.log(formValue);
            i--;
        }
        // console.log(formValue)
        api.InsertDate(formValue).then(response => {
            // console.log(response);
            if (Array.isArray(response)) {
                alert("You have successfully Book a Tickets 🙏🙏🙏🙏🙏")
                // navigate(`/Participant/${id}?guest=${formValue.GuestPhone}`);
                setToken(tickets)
                console.log(tickets)
                toggleShow()

            } else {
                alert("Your Tickets is not booked 😭😭😭😭😭😭")
                setToken([])
            }


            // if (response.success !== ''){
             
            //     api.FetchData(id, formValue.GuestPhone).then(result => {
            //         console.log(result);
            //         setToken(result[0].Ticket)
            //     }).catch(err => {
            //         console.log(err);
            //     });
                // console.log(response);
                // alert("You have successfully Book a Tickets 🙏🙏🙏🙏🙏")
                // navigate(`/Participant/${id}?guest=${formValue.GuestPhone}`);
        //     } else {
        //         alert("Your Tickets is not booked 😭😭😭😭😭😭")
        //     }
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

    const removeGuest = (index) => {
        let data = [...formValue];
        data.splice(index, 1)
        setFormValue(data)
    }

    const generatePDF = (qrid) => {

        let pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [400, 500]
        })

        // let base64Image = document.getElementById(qrid).toDataURL()

        let qrs = document.getElementsByClassName("qr")
        console.log(qrs)

        let count = 0
        for (let elem of qrs) {
            let base64Image = elem.toDataURL();

            pdf.addImage(base64Image, 'png', 0, count, 40, 40)
            console.log(base64Image)
            count+=50
        }

        // qrs.array.forEach(element => {
        //     let base64Image = element.toDataURL()
        //     pdf.addImage(base64Image, 'png', 0, 0, 40, 40)
            
        // });


        pdf.save('QR.pdf')
    
    }

    return (
        <>
            {/* <Header /> */}

            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className='d-flex justify-content-center'>
              <MDBModalTitle className="text-primary d-flex justify-content-center" >Guest Details</MDBModalTitle>
              <MDBBtn className='btn-close' color='white' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='d-flex justify-content-center'>
              
              {/* {
                token.map(t => (<QRCode value={`${t}`} size="150" id={t}/>))
              } */}
              <ul>
              {
                token.map(t => (<li style={{padding:10}}><QRCode value={`${t}`} size="150" className="qr" key={t}/></li>))
              }
              </ul>

              
            </MDBModalBody>
            <MDBModalFooter className='d-flex justify-content-center'>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={()=>generatePDF(token)}>Download</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

            <Menu />
            <Container className='text-white'>
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
                <Form method='POST' action='/' onSubmit={HandleSubmit}>
                            {formValue.map((input, index) => { 
                        return (
                            <div key={index}>
                                <Card className="border border-danger border-3 mt-1">
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Guest Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Name" name="GuestName" value={input.GuestName} onChange={event => HandleInput(index, event)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Guest Phone Number</Form.Label>
                                        <Form.Control type="tel" placeholder="Enter Your Phone Number" name="GuestPhone" value={input.GuestPhone} onChange={event => HandleInput(index, event)} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Guest Email ID:</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Your Email" name="GuestEmail" value={input.GuestEmail} onChange={event => HandleInput(index, event)} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                    <Form.Control type='text' placeholder="1234 Main St" name="GuestAddress" value={input.GuestAddress} onChange={event => HandleInput(index, event)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                    <Form.Control type='text' placeholder="Apartment, studio, or floor" name="GuestAddress_1" value={input.GuestAddress_1} onChange={event => HandleInput(index, event)} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                        <Form.Control type='text' name="City" value={input.City} onChange={event => HandleInput(index, event)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                        <Form.Select type='text' name="State" value={input.State} onChange={event => HandleInput(index, event)} ref={selectRef}>
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
                                        <Form.Control type='number' name="Zip" value={input.Zip} onChange={event => HandleInput(index, event)} />
                                </Form.Group>
                                </Row>
                    </Card.Body>
                                </Card>
                                <Button variant="danger" className='mt-2' onClick={() => removeGuest(index)}>
                                    Remove Guest
                                </Button>
                            </div>
                        )
                    })}
                <Button variant="info" className='mt-1' onClick={ addGuest }>
                    Add Guest
                </Button>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
            </Container>
        </>
    );
}

export default GuestForm;