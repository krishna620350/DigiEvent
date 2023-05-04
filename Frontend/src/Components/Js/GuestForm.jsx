import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/esm/Badge';
import Container from 'react-bootstrap/Container';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"; //useNavigate 
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import dhoni from "./dhoni.jpg";

// import html2canvas from 'html2canvas';

import Menu from './Navbar';
import state from "../../Json/State.json";
import GuestApi from '../../Apis/GuestApi';
import Footer from './Footer';

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
// import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';
function isValidguestName(guestName) {
  const nameRegex = /^[A-Za-z ]+$/;
  return nameRegex.test(guestName);
}
function isValidguestPhone(guestPhone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(guestPhone);
}
function isValidguestEmail(guestEmail) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(guestEmail);
}
function GuestForm() {
  // const [name, setName] = useState("")
  const navigate = new useNavigate();
  const [token, setToken] = useState([])
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);


  const [data, setData] = useState([]);

  const selectRef = useRef();
  const { id } = useParams();
  // const navigate = useNavigate();

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
    let i = formValue.length - 1;
    const tickets = []
    while (i >= 0) {
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
        const hasError = response.every(obj => obj.hasOwnProperty('error'));
        const hasId = response.every(obj => obj.hasOwnProperty('id'));
        if (hasError) {
          let str = '';
          for (let i = (response.length - 1); i >= 0; i--) {
            if (response[i].error) {
              str += (`Guest ${response.length - i + 1} -- ${response[i].error}\n`);
            }
          }
          alert(str);
          setToken([]);
        } else if (hasId) {
          alert('You have successfully booked tickets');
          const bookedTickets = response.map(obj => obj.id);
          setToken(bookedTickets);
          toggleShow();
        } else {
          alert('Unexpected response format');
          setToken([]);
        }        navigate(`/event/${id}/guest/download`)

      } else {
        alert('Unexpected response format');
        setToken([]);
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





  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: "a4"
    });
    // const backgroundImage = dhoni;

    // pdf.addImage(backgroundImage, 'PNG', 0, 0, 210, 297);

    // Loop through each QR code on the page
    const qrs = document.getElementsByClassName("qr");
    let count = 20;
    let currPage = 0
    let maxPage = 50
    for (let i = 0; i < qrs.length; i++) {
      const currValue = formValue[i];
      if (count + 60 > 290 && currPage < maxPage) { // Check if there's not enough space on the page
        pdf.addPage();
        count = 20;
        currPage++;
        // pdf.text(data[0].EventName, 40, 5)
        // pdf.addImage(backgroundImage, 'PNG', 0, 0, 210, 297);
      }
      const arr = [currValue.GuestName, currValue.GuestPhone, currValue.GuestEmail, currValue.GuestAddress];

      // Add QR code image to the PDF
      pdf.setFontSize(10);
      pdf.text(`#${i + 1}`, 10, count + 8);
      pdf.rect(20, count, 40, 40);
      const base64Image = qrs[i].toDataURL();
      pdf.addImage(base64Image, 'png', 22, count + 2, 36, 36);

      // Add guest details to the PDF
      pdf.setFontSize(12);

      pdf.text("Guest Name:", 70, count + 5);
      pdf.text(arr[0], 105, count + 5);
      pdf.text("Guest Phone:", 70, count + 15);
      pdf.text(arr[1], 105, count + 15);
      pdf.text("Guest Email:", 70, count + 25);
      pdf.text(arr[2], 105, count + 25);
      pdf.text("Guest Address:", 70, count + 35);
      // pdf.text(arr[3], 105, count + 35);
      // pdf.rect(20, count, 170, 45, "S");

      const addressLines = pdf.splitTextToSize(arr[3], 80);
      pdf.text(addressLines, 105, count + 35, { lineHeightFactor: 1.25 });
      pdf.rect(65, count - 2, 125, 46);

      count += 60;
    }

    pdf.save('guest_list.pdf');
  };




  // const generatePDF = () => {
  //   const unit = "pt";
  //   const size = "A4";
  //   const orientation = "portrait";
  //   const marginLeft = 40;
  //   const doc = new jsPDF(orientation, unit, size);
  //   doc.setFontSize(12);
  //   const title = "Guest List";
  //   const headers = [["S.No", "Guest Ticket ID", "Guest Name", "Guest Email ID", "Guest Phone"]];
  //   const data = formValue.map((guest, index) => [
  //     (index + 1).toString(),
  //     {
  //       data: guest.Ticket,
  //       // Convert QR code object to image
  //       render: "image",
  //       // Use callback to get QR code image data URL
  //       callback: (dataUrl) => {
  //         return doc.addImage(document.getElementsByClassName("qr")[0].toDataURL(), "JPEG", 0, 0, 50, 50);
  //       },
  //     },
  //     guest.GuestName,
  //     guest.GuestEmail,
  //     guest.GuestPhone,
  //   ]);
  //   const options = {
  //     margin: { top: 50 },
  //     didParseCell: (data) => {
  //       if (data.column.dataKey === 'picture') {
  //         // const imageDataURI = getImageDataURIForPerson(data.row.index - 1); // Replace this with your own function to get the image data URI
  //         // const imgData = imageDataURI ? getImageDataFromURI(imageDataURI) : null;
  //         data.cell.raw = document.getElementsByClassName("qr")[0].toDataURL(); // Set the raw value of the cell to the image data
  //       }
  //     },
  //   };
  //   let content = {
  //     startY: 50,
  //     head: headers,
  //     body: data,
  //     columns: [
  //       { dataKey: 'name' },
  //       { dataKey: 'age' },
  //       { dataKey: 'age' },
  //       { dataKey: 'age' },
  //       { dataKey: 'age' },
  //       { dataKey: 'picture', width: 40, cellRenderer: 'image' }, // Define the image column
  //     ],
  //     ...options
  //   };
  //   doc.text(title, marginLeft, 40);
  //   doc.autoTable(content);
  //   doc.save("guest_list.pdf");
  // };







  return (
    <>
      {/* <Header /> */}

      

      <Menu />
      <Container className='text-white mb-5'>
        <p className="h2">Event Details</p><hr />
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
        <h2 className='text-center mb-1 text-danger'>
          Add Guest <Badge bg="secondary">Form</Badge>
        </h2>
        <Form method='POST' action='/' onSubmit={HandleSubmit}>
          {formValue.map((input, index) => {
            return (
              <div key={index}>
                <Card className="border border-danger border-3 mt-1">
                  <Card.Body>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Guest Name<span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" name="GuestName" value={input.GuestName} onChange={event => HandleInput(index, event)} required pattern="[A-Za-z0-9]+" className={isValidguestName(input.GuestName) ? '' : 'is-invalid'} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Guest Phone Number<span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Control type="tel" placeholder="Enter Your Phone Number" name="GuestPhone" value={input.GuestPhone} onChange={event => HandleInput(index, event)} required pattern="[0-9]{10}"  maxLength={10} className={isValidguestPhone(input.GuestPhone) ? '' : 'is-invalid'}  />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Guest Email ID<span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Control type="email" placeholder="Enter Your Email" name="GuestEmail" value={input.GuestEmail} onChange={event => HandleInput(index, event)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className={isValidguestEmail(input.GuestEmail) ? '' : 'is-invalid'}/>
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
                            <option key={state.value} value={state.name}>
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
                {formValue.length > 1 && (<Button variant="danger" className='mt-2' onClick={() => removeGuest(index)}>
                  Remove Guest
                </Button>)}

              </div>
            )
          })}
          <Button variant="info" className='mt-1' onClick={addGuest}>
            Add Guest
          </Button>
          <div className="text-center">
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </div>
        </Form>

        <>
          <div id="pdftable" style={{ position: 'absolute', left: -10000 }}>
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Guest Ticket ID</th>
                  <th>Guest Name</th>
                  <th>Guest Email ID</th>
                  <th>Guest Phone</th>
                  {/* <th>Guest Address</th> */}
                </tr>
              </thead>
              <tbody>
                {formValue.map((guest, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{guest.Ticket}</td>
                    <td>{guest.GuestName}</td>
                    <td>{guest.GuestEmail}</td>
                    <td>{guest.GuestPhone}</td>
                    {/* <td><pre>{`${guest.GuestAddress} ${guest.GuestAddress_1}\n${guest.City} ${guest.State} ${guest.Zip}`}</pre></td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

        </>
      </Container>
      <Footer />
    </>
  );
}

export default GuestForm;
