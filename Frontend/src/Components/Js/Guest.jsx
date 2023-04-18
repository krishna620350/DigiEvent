import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

import URL from "../../Json/Url.json";
import GuestApi from "../../Apis/GuestApi";
import Menu from "./Navbar";
import Footer from './Footer';

function Participant() {

    const { id } = useParams();
    const urlParams = new URLSearchParams(window.location.search);
    const TicketId = urlParams.get('ticketid');
    const Vid = urlParams.get('vid');
    // console.log(Vid,TicketId);
    const [data, setData] = useState([]);
    const api = useMemo(() => new GuestApi(), []);

    const fetchData = useCallback(() => {
        api.FetchData(id, Vid, TicketId).then(result => {
            setData(result);
        }).catch(err => {
            console.log(err);
        });
    }, [id, Vid, TicketId, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const DownloadPdf = () => { 
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
            pdf.save(`${data[0].GuestName}_${TicketId}.pdf`);
        });
    }
    // console.log(data);
    return (
        <>
        <Menu />
        <Container>
            {data.length > 0 && (
                <div>
                    <Row>
                        <Col><b>Guest Name:</b> {data[0].GuestName}</Col>
                    </Row>
                    <Row>
                        <Col><b>Guest Contact:</b> {`${data[0].GuestEmail} | ${data[0].GuestPhone}`}</Col>
                    </Row>
                    <Table responsive striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Guest Id</th>
                                <th>Guest Qrcode</th>
                                    <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data[0].Ticket}</td>
                                    <td><QRCode value={`${URL.URL}/Scanner/${id}?ticketid=${TicketId}`} size="200" /></td>
                                    <td><Button onClick={() => DownloadPdf()}>Download Pdf</Button></td>
                            </tr>
                        </tbody>
                        </Table>
                        <div className="card align-items-center" style={{ position: 'absolute', left: -10000 }} id='card'>
                            <div className='' style={{ backgroundColor: 'white' }}>
                                <QRCode value={`${URL.URL}/Scanner/${id}?ticketid=${TicketId}`} size="200" />
                            </div>
                            <div className="card-body" style={{ backgroundColor: 'white' }}>
                                <h5 className="card-title">{data.EventName}</h5>
                                <ul className="list-group">
                                    <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Guest Name : </b>{data[0].GuestName}</li>
                                    <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Guest Email or Phone Number: </b>{data[0].GuestEmail} | {data[0].GuestPhone}</li>
                                    <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Guest Ticket Id: </b>{TicketId}</li>
                                    <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Vendor Id: </b>{Vid}</li>
                                    <li className="list-group-item"><b style={{ backgroundColor: 'white' }}>Event Id: </b>{id}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
            )}
            </Container>
            <Footer />
    </>
    );
}

export default Participant;