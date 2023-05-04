import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {Link, useParams } from "react-router-dom";
import QRCode from 'qrcode.react';


import VendorApi from "../../Apis/VendorApi";
import GuestApi from "../../Apis/GuestApi";
import Menu from "./Navbar";
import URL from '../../Json/Url.json'
import Footer from './Footer';

function VendorResponse() {

    const { id, vid } = useParams();
    // console.log(guest); // prints "9988776655" to the console
    const [data, setData] = useState([]);
    const [Guest, setDataGuest] = useState([]);

    const api = useMemo(() => new VendorApi(), []);
    const gapi = useMemo(() => new GuestApi(), []);

    const fetchData = useCallback(() => {
        api.FetchData(id, vid).then(result => {
            // console.log(result);
            if (result !== []) setData(result);
            else alert('data not found');
        }).catch(err => {
            console.log(err);
        });
    }, [id, vid, api]);

    const fetchDataGuest = useCallback(() => {
        gapi.ReadData(id).then(result => {
            if (result !== []) setDataGuest(result);
            else alert('data not found');
        }).catch(err => {
            console.log(err);
        });
    }, [id, gapi]);

    useEffect(() => {
        fetchData();
        // console.log(data[0]);
    }, [fetchData]);

    useEffect(() => {
        fetchDataGuest();
    }, [fetchDataGuest]);
    // console.log(Guest)
    
    return (<>
        <Menu />
        <Container className='mb-5'>
            <p className="h1">Vendor Response</p><hr />
            {data.length > 0 && (
                <div>
                    <p className="h5">Vendor Details</p>
                    <div className="border border-3 border-secondary rounded p-3 mb-3">
                    <Row>
                        <Col><b>Vendor Name:</b> { data[0].VendorName }</Col>
                    </Row>
                    <Row>
                        <Col><b>Vendor Contact:</b> {`${ data[0].VendorEmail } | ${ data[0].VendorPhone } | ${ data[0].VendorAddress } ${ data[0].VendorAddress_1 }`}</Col>
                    </Row>
                    </div>
                    <p className="h5">Ticket Details</p>
                    <Table responsive className="text-center table-light border border-dark">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Guest Id</th>
                                <th>Guest Qrcode</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(data[0].Paticipants)} */}
                            {data[1].GID.map((item, index) => {
                                const isGuestUpdated = Guest.length > 0 && Guest[0].Guests.some(guest => guest.Ticket === item.id && guest.Status === -1);
                                // console.log(isGuestUpdated);
                                return (
                                    <tr key={index}>
                                        <td style={isGuestUpdated ? {} : { backgroundColor: '#98FB98' }}>{ index+1 }</td>
                                        <td style={isGuestUpdated ? {} : { backgroundColor: '#98FB98' }}>{item.id}</td>
                                        <td style={isGuestUpdated ? {} : { backgroundColor: '#98FB98' }}>
                                            {isGuestUpdated ? (
                                                <QRCode value={`${URL.URL}/UpdateGuest/${id}?Vid=${vid}&ticketid=${item.id}`} size="200" />
                                            ) : (
                                                    <span className='text-danger fw-bold bg-transparent'>Guest Already Updated</span>
                                            )}
                                        </td>
                                        <td style={isGuestUpdated ? {} : { backgroundColor: '#98FB98' }}>
                                            {isGuestUpdated ? (
                                                <Link to={`/guest/${id}/${vid}/${item.id}`}>
                                                    <Button className='btn-danger'>
                                                        Update Ticket
                                                    </Button>
                                                </Link>
                                            ) : (
                                                    <Button className='text-black btn-outline-info' disabled>
                                                    Guest Already Updated
                                                </Button>
                                            )}
                                        </td>

                                    </tr>
                                );
                            })}


                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
        <Footer />
    </>
    );
}

export default VendorResponse;
