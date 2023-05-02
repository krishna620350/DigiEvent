import React from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate ,Link} from "react-router-dom";
import QRCode from 'qrcode.react';
import  jsPDF from 'jspdf';
import EventApi from '../../Apis/EventApi';
// import QRScanner from './QRScanner';
// import autoTable from 'jspdf-autotable';

import html2canvas from 'html2canvas';

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
  }from 'mdb-react-ui-kit';

const GuestDownload = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const qrCodeRef = useRef(null);
  const navigate = useNavigate();
  const [GuestList, setGuestList] = useState([])

  const api = useMemo(() => new EventApi(), []);

  const fetchData = useCallback(() => {
    api.ReadData(id, pageSize, (currentPage - 1) * pageSize).then(result => {
      setGuestList(result[0].Guests);
      seteventName(result[0].EventName);
      console.log(GuestList);

    //   console.log(result[0].Guests)
    }).catch(err => {
      console.log(err);
    });
  }, [id, api, currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

    const [token, setToken] = useState([])
    const [centredModal, setCentredModal] = useState(true);
    const [eventName, seteventName] = useState(null)

    const toggleShow = () => setCentredModal(!centredModal);

    const handleOnClose = () => navigate(`/event/${id}`);

    const generatePDF = () => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: "a4"
        });
        // const backgroundImage = localStorage.getItem(`background`);
        
        
        // pdf.addImage(backgroundImage, 'JPEG', 0, 0, 210, 297);
      
        // Loop through each QR code on the page
        const qrs = document.getElementsByClassName("qr");
        let count = 20;
        let count_eventname = 0;
        let currPage=0
        let maxPage=50
        for (let i = 0; i < qrs.length; i++) {
          const currValue = GuestList[i];
          console.log(GuestList[i].Ticket)
          if (count + 60 > 290 && currPage < maxPage) { // Check if there's not enough space on the page
            pdf.addPage();
            count = 20;
            currPage++;
            // pdf.text(data[0].EventName, 40, 5)
            // pdf.addImage(backgroundImage, 'PNG', 0, 0, 210, 297);
            count_eventname = 0;
            // pdf.addImage(backgroundImage, 'JPEG', 0, 0, 210, 297);
          }
          const arr = [currValue.GuestName, currValue.GuestPhone, currValue.GuestEmail, currValue.GuestAddress];
      
          // Add QR code image to the PDF
          pdf.setFontSize(10);
          pdf.text(`#${i+1}`, 10, count + 8);
          pdf.rect(20, count, 40, 40);
          const base64Image = qrs[i].toDataURL();
          pdf.addImage(base64Image, 'png', 22, count + 2, 36, 36);
          
          if (count_eventname==0){
            pdf.setFontSize(20);
            pdf.text(eventName, 80 , count-10,)
            count_eventname = 1
          }
  
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
          pdf.rect(65, count -2, 125, 46);
      
          count += 60;
        }
      
        pdf.save('guest_list.pdf');
        navigate(`/event/${id}`);
        
  
      };

      
    const generatesinglePDF = (ind) => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: "a4"
        });
        // const backgroundImage = localStorage.getItem(`background`);
        
        
        // pdf.addImage(backgroundImage, 'JPEG', 0, 0, 210, 297);
      
        // Loop through each QR code on the page
        const qrs = document.getElementsByClassName("qr");
        let count = 20;
        let currPage=0
        let maxPage=50
        
          const currValue = GuestList[ind];
          
          const arr = [currValue.GuestName, currValue.GuestPhone, currValue.GuestEmail, currValue.GuestAddress];
  
          
          // Add QR code image to the PDF
          pdf.setFontSize(10);
          pdf.text(`#${1}`, 10, count + 8);
          pdf.rect(20, count, 40, 40);
          const base64Image = qrs[ind].toDataURL();
          pdf.addImage(base64Image, 'png', 22, count + 2, 36, 36);
          
          pdf.setFontSize(20);
          pdf.text(eventName, 80 , count-10,)
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
          pdf.rect(65, count -2, 125, 46);
      
          count += 60;
        
      
        pdf.save('guest_list.pdf');
      }

  return (
    <>
        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className='d-flex justify-content-center'>
              <MDBModalTitle className="text-primary d-flex justify-content-center" >Guest Details</MDBModalTitle>
              <MDBBtn className='btn-close' color='white' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='d-flex justify-content-center'>
              
              

              <div style={{ display: "flex", flexDirection: "column" }}>
                {[...GuestList].map((x, i) => (
                   
                  <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                  {/* {console.log(x)} */}
                    <div style={{ display: "flex", flexDirection: "column", marginRight: 20 }}>
                      <p style={{ fontWeight: "bold", marginRight: 20, textDecoration: "underline" }}>Guest{` `}{i+1}</p>
                      <p style={{ fontWeight: "normal" }}><span style={{fontWeight : "bold",paddingRight: 10}}>Event:</span>{eventName}</p>
                      <p style={{ fontWeight: "normal" }}><span style={{fontWeight : "bold",paddingRight: 10}}>Name:</span>{GuestList[i].GuestName}</p>
                      <p style={{ fontWeight: "normal" }}><span style={{fontWeight: "bold", paddingRight: 10}}>Contact:</span>{GuestList[i].GuestPhone}</p>
                    </div>
                    {/* <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ marginRight: 10 }}>{GuestList[i].GuestName}</p>
                      <p>{GuestList[i].Contact}</p> 
                    </div>  */}
                    <div style={{display: "flex", flexDirection:"column",marginLeft: "auto", marginTop:50}}>
                      <QRCode value={`Guest Id: ${x.Ticket}  Event Id: ${id}`} size="100" className="qr" key={token[i]} />
                      <button style={{marginTop: 10, backgroundColor: "#4285f4", color: "white", padding: "10px 18px", border: "none", borderRadius: "4px", cursor: "pointer"}} onClick={() => generatesinglePDF(i)}>Download</button>
                    </div>
                  </div>
                ))}
              </div> 


          


              
              
            </MDBModalBody>
            <MDBModalFooter className='d-flex justify-content-center'>
              <MDBBtn color='secondary' onClick={handleOnClose}>
                Close
              </MDBBtn>
                
              <MDBBtn  onClick={()=>generatePDF(token)} >Download All</MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default GuestDownload