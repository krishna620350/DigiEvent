import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Table } from "react-bootstrap";

// import Header from "./Header";
import Menu from './Navbar';
import state from "../../Json/State.json";
import GuestApi from '../../Apis/GuestApi';
import Footer from './Footer';

const GuestSearchVendor = () =>{
    const [guestid, setguestid] = useState("");
    const [eventid, seteventid] = useState("");
    const [vendorid, setvendorid] = useState("");
    const [data,setdata] = useState(null);
    const navigate = useNavigate();

    

    const useEffect = () =>{

    }
    const api = new GuestApi()

    // const {id}= useParams();

    const handleSearch = (event) => {
        event.preventDefault();
        // Do something with the search term, e.g. fetch data from an API
        console.log(`Searching for "${guestid}"...`);
        api.FetchData(eventid,"",guestid).then(data => {
            console.log(data)
            // if(data.Status == 0){
            //     // data.Status = 1
            // }
            setdata(data);
            setvendorid(data[0].VendorId ? data[0].VendorId : "")
        }).catch(e =>{
            console.log(e);
        })

    };

    const handleEventChange = (event) => {
        seteventid(event.target.value);
        
    };
    
    const handleGuestChange = (event) =>{

        setguestid(event.target.value);
    };
   

    const handleSubmit = () =>{
      // event.preventDefault();
      const formValue = {
      
        TicketId: guestid,
        id: eventid,
        Vid: data[0].VendorId ? data[0].VendorId : "",
        
        GuestName: `${data[0].GuestName}`,
        GuestPhone: `${data[0].GuestPhone}`,
        GuestEmail: `${data[0].GuestEmail}`,
        GuestAddress: `${data[0].GuestAddress}`,
        GuestAddress_1: `${data[0].GuestAddress_1}`,
        City: `${data[0].GuestCity}`,
        State: `${data[0].GuestState}`,
        Zip: `${data[0].GuestZip}`,
        Status : `${data[0].Status}`
    }
  
      
      if (data[0].Status === 0){
        
        api.UpdateData(formValue).then(resdata =>{
          
          // console.log(resdata)
          // // resdata.Status = 1;
          // // console.log(1)
          // console.log(data)
          // console.log(formValue)
          alert("Welcome!!")
        }).catch(e =>{
          console.log(e)
        })
      }
      else if(data[0].Status === 1){
        alert("The guest is already enjoying the show!!")
      }
      else{
        
        navigate(`/updateguest/event/${eventid}/vendor/${vendorid}/guest/${guestid}`)
      }
      setguestid("");
      setdata(null);

    }

    return(
        <>
        <div className="container mt-3">
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Label>Search Event Id:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event id"
            value={eventid}
            onChange={handleEventChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Search Guest Id:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter guest id"
            value={guestid}
            onChange={handleGuestChange}
          />
        </Form.Group>

        <Button type="submit">Search</Button>
      </Form>

      {data && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{data[0].GuestName}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{data[0].GuestAddress}</td>
            </tr>
            <tr>
              <td>Phone No:</td>
              <td>{data[0].GuestPhone}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{data[0].GuestEmail}</td>
            </tr>
            
          
          </tbody>
        </Table>
      )}
      {data && (
        <Button onClick={handleSubmit} variant="success">Accept</Button>
      )}
    </div>
  
        
        </>
    )

}

export default GuestSearchVendor;