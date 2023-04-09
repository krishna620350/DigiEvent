import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {Link, useParams } from "react-router-dom";
import QRCode from 'qrcode.react';


import VendorApi from "../../Apis/VendorApi";
import Menu from "./Navbar";
import URL from '../../Json/Url.json'

function Participant() {

    const { id } = useParams();
    const urlParams = new URLSearchParams(window.location.search);
    const Vid = urlParams.get('Vid');
    // console.log(guest); // prints "9988776655" to the console
    const [data, setData] = useState([]);

    const api = useMemo(() => new VendorApi(), []);

    const fetchData = useCallback(() => {
        api.FetchData(id, Vid).then(result => {
            if (result !== []) setData(result);
            else alert('data not found');
        }).catch(err => {
            console.log(err);
        });
    }, [id, Vid, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    // console.log(data);
    // console.log(data[0].VendorName);
    return (<>
        <Menu />
        <Container>
            {data.length > 0 && (
                <div className='text-white'>
                    <Row>
                        <Col><b>Vendor Name:</b> { data[0].VendorName }</Col>
                    </Row>
                    <Row>
                        <Col><b>Vendor Contact:</b> {`${ data[0].VendorEmail } | ${ data[0].VendorPhone } | ${ data[0].VendorAddress } ${ data[0].VendorAddress_1 }`}</Col>
                    </Row>
                    <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Guest Id</th>
                                <th>Guest Qrcode</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(data[0].Paticipants)} */}
                            {data[0].GID.map((participant, index) => (
                                <tr key={index}>
                                    <td>{participant.id}</td>
                                    <td><QRCode value={`${URL}/UpdateGuest/${id}?Vid=${Vid}&ticketid=${participant.id}`} size="200" /></td>
                                    <td><Link to={`/UpdateGuest/${id}?Vid=${Vid}&ticketid=${participant.id}`} target='_blank'><Button className='btn-danger'>Update Ticket</Button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    </>
    );
}

export default Participant;
