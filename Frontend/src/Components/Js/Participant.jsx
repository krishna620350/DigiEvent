import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {useParams } from "react-router-dom";
import QRCode from 'qrcode.react';


import GuestApi from "../../Apis/GuestApi";
import Header from "./Header";

function Participant() {

    const { id } = useParams();
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('guest');
    // console.log(guest); // prints "9988776655" to the console
    const [data, setData] = useState([]);

    const api = useMemo(() => new GuestApi(), []);

    const fetchData = useCallback(() => {
        api.FetchData(id, guest).then(result => {
            setData(result);
        }).catch(err => {
            console.log(err);
        });
    }, [id, guest, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    console.log(data);
    return (<>
        <Header />
        <Container>
            {data.length > 0 && (
                <div>
                    <Row>
                        <Col><b>Guest Name:</b> {data[0].GuestName}</Col>
                    </Row>
                    <Row>
                        <Col><b>Host Contact:</b> {`${data[0].HostEmail} | ${data[0].HostPhone} | ${data[0].EventAddress} ${data[0].EventAddress_1}`}</Col>
                    </Row>
                    <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Guest Id</th>
                                <th>Guest Qrcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(data[0].Paticipants)} */}
                            {data[0].Paticipants.map((participant, index) => (
                                <tr key={ index }>
                                    <td>{participant.hexString}</td>
                                    <td><QRCode value={`${participant.hexString}`} size="200"/></td>
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