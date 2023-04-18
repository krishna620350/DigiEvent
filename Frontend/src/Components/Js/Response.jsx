import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from "react";
import URL from '../../Json/Url.json'


import EventApi from "../../Apis/EventApi";
import Footer from './Footer';
import Menu from "./Navbar";

function ResponsiveExample() {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const qrCodeRef = useRef(null);

  const api = useMemo(() => new EventApi(), []);

  const fetchData = useCallback(() => {
    api.ReadData(id, pageSize, (currentPage - 1) * pageSize).then(result => {
      setData(result);
    }).catch(err => {
      console.log(err);
    });
  }, [id, api, currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const downloadPDF = () => {
    const table = document.querySelector("#pdftable");
    html2canvas(table).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      const imgWidth = 200;
      const pageHeight = 287;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", position, position, imgWidth - position, imgHeight);
      heightLeft -= pageHeight - 2 * position;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 2 * position;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth - position, imgHeight);
        heightLeft -= pageHeight - 2 * position;
      }

      pdf.save("guest-list.pdf");
    });

  }

  const downloadQR = () => {
    const input = qrCodeRef.current;
    html2canvas(input, {scale: 2, backgroundColor: "transparent"})
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = 150;
        const pdfWidth = 150;
        const pdfHeight = (imgProps * pdfWidth) / imgProps;
        const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
        const y = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;
        pdf.setDrawColor(0);
        pdf.setFillColor(0, 255, 0);
        pdf.roundedRect(x - 5, y - 5, pdfWidth + 10, pdfHeight + 10, 3, 3, 'FD');
        pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);
        pdf.save('qrcode.pdf');
      })
      .catch((error) => {
        console.log('Error generating PDF:', error);
      });
  };

  return (<>
    {/* <Header /> */}
    <Menu />
    <Container className='mb-5'>
      {data.length > 0 && (
        <>
          <p class="h1">Event Response</p><hr />
          <p class="h5">Event Details</p>
          <div className='border border-3 border-secondary rounded p-3 mb-3'>
            <span>
              <Row>
                <Col><b>Event Name:</b> {data[0].EventName}</Col>
                <Col><b>Host Name:</b> {data[0].HostName}</Col>
              </Row>
              <Row>
                <Col><b>Start Date:</b> {data[0].StartDate}</Col>
                <Col><b>End Date:</b> {data[0].EndDate}</Col>
              </Row>
              <Row>
                <Col>
                  <Row xs={2} md={4} lg={5}>
                    <Col><b>Host Contact:</b></Col>
                    <Col> <span style={{ whiteSpace: 'pre-line' }}>
                      {`${data[0].HostEmail} \n ${data[0].HostPhone}\n${data[0].EventAddress} ${data[0].EventAddress_1}`}
                    </span>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col><Link to={`/Guest/${id}`}><Button variant="info">Add-Guest</Button></Link></Col>
                    <Col><Link to={`/Vendor/${id}`}><Button variant="warning">Vendor</Button></Link></Col>
                  </Row>
                </Col>
              </Row>
            </span>
          </div>
          <span className='text-center'>
            <Col>
              <div style={{ position: 'absolute', left: -10000, backgroundColor: 'white' }} ref={qrCodeRef}>
                <QRCode value={`${URL.URL}/Guest/${id}`} size={256} />
              </div>
              <div>
                <QRCode value={`${URL.URL}/Guest/${id}`} size={256} />
              </div>
              <div>
                <Button variant="success" onClick={downloadQR}>Download QR code</Button>
              </div>
            </Col>
          </span>
          <div id="pdftable" style={{ position: 'absolute', left: -10000 }}>
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Guest Ticket ID</th>
                  <th>Guest Name</th>
                  <th>Guest Email ID</th>
                  <th>Guest Phone</th>
                  <th>Guest Address</th>
                </tr>
              </thead>
              <tbody>
                {data[0].Guests.map((guest, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{guest.Ticket}</td>
                    <td>{guest.GuestName}</td>
                    <td>{guest.GuestEmail}</td>
                    <td>{guest.GuestPhone}</td>
                    <td><pre>{`${guest.GuestAddress} ${guest.GuestAddress_1}\n${guest.City} ${guest.State} ${guest.Zip}`}</pre></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={() => downloadPDF()} style={{marginBottom: 10, marginTop: 20}}>Download Guest List</button>
          </div>
          <p class="h5">All Guest Details</p>
            <Table responsive striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Guest Ticket ID</th>
                  <th>Guest Name</th>
                  <th>Guest Email ID</th>
                  <th>Guest Phone</th>
                  <th>Guest Address</th>
                </tr>
              </thead>
              <tbody>
              {data[0].Guests
                .filter(guest => guest.Status === 0) // filter by status
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((guest, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{guest.Ticket}</td>
                    <td>{guest.GuestName}</td>
                    <td>{guest.GuestEmail}</td>
                    <td>{guest.GuestPhone}</td>
                    <td><pre>{`${guest.GuestAddress} ${guest.GuestAddress_1}\n${guest.City} ${guest.State} ${guest.Zip}`}</pre></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='text-black' >Prev</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data[0].Guests.length / pageSize)} className='text-black'>Next</button>
          </div>
          
        </>
      )}
    </Container>
    <Footer />
  </>
  );
}

export default ResponsiveExample;