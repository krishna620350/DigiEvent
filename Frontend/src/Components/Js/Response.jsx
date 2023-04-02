import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import URL from '../../Json/Url.json'


import EventApi from "../../Apis/EventApi";
// import Header from "./Header";
import Menu from "./Navbar";

function ResponsiveExample() {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (<>
    {/* <Header /> */}
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
            <Col><b>Guest Link:</b>
              <span> <Link to={`/Guest/${id}`}> {`${URL.URL}`}/Guest/{id}</Link></span>
              <QRCode value={`${URL.URL}/Guest/${id}`} size={256} />
            </Col>
          </Row>
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
            <button className="btn btn-primary" onClick={() => downloadPDF()} style={{marginBottom: 10, marginTop: 20}}>Download PDF</button>
          </div>
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
                {data[0].Guests.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((guest, index) => (
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
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='text-white'>Prev</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data[0].Guests.length / pageSize)} className='text-white'>Next</button>
          </div>
        </div>
      )}
    </Container>
  </>
  );
}

export default ResponsiveExample;