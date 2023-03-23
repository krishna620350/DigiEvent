import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import QRCode from 'qrcode.react';

import URL from '../../Json/Url.json'


import EventApi from "../../Apis/EventApi";
import Header from "./Header";

function ResponsiveExample() {

    const { id } = useParams();
    const [data, setData] = useState([]);

    const api = useMemo(() => new EventApi(), []);

    const fetchData = useCallback(() => {
        api.ReadData(id).then(result => {
            setData(result);
        }).catch(err => {
            console.log(err);
        });
    }, [id, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (<>
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
            <Col><b>Guest Link:</b>
              <span> <Link to={`/Guest/${id}`}> {`${URL.URL}`}/Guest/{id}</Link></span>
              <QRCode value={`${URL.URL}/Guest/${id}`} size={256}/> 
              </Col>
          </Row>
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              {Array.from({ length: 12 }).map((_, index) => (
                <th key={index}>Table heading</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    )}
    </Container>
    </>
  );
}

export default ResponsiveExample;
/*
import Table from 'react-bootstrap/Table';

function DarkExample() {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default DarkExample;
 */