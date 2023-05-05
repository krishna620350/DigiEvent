import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import App from '../Components/App';
import Login from '../Components/Js/login';
import Responsive from '../Components/Js/Response';
import GuestForm from '../Components/Js/GuestForm';
import EventForm from '../Components/Js/EventForm';
import Guest from '../Components/Js/Guest';
import Vendor from '../Components/Js/Vendor';
import VendorResponse from '../Components/Js/VendorResponse';
import UpdateGuest from '../Components/Js/UpdateGuest';
import Signup from '../Components/Js/Signup';
import PrivateRoute from '../PrivateRoute';
import AcceptGuest from '../Components/Js/AcceptGuest';
import Header from "../Components/Js/Header";
import Events from "../Components/Js/Events"
import GuestDownload from "../Components/Js/GuestDownload"
import { useAuth } from "../context/AuthContext";


const Router =()=>{
    
    return <BrowserRouter>
    <Routes>
        <Route
            path="/"
            element={
            // <PrivateRoute>
            <App />
            // </PrivateRoute>
            }
        />
        <Route path="/dashboard" element={<Header />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/eventlist" element={<Events />} />
        <Route
            path="/signup"
            element={<Signup />}
        />
        <Route
            path="/acceptguest"
            element={
            //     <PrivateRoute>
            <AcceptGuest />
            // </PrivateRoute>
            }
        />
        <Route 
            path="/event"
            element={
            //     <PrivateRoute>
            <EventForm />
            // </PrivateRoute>
            }
        />
        <Route
            path="/event/:id"
            element={
            // <PrivateRoute>
            <Responsive />
            // </PrivateRoute>
            }
            />
        <Route 
            path="/event/:id/guest"
            element={
            // <PrivateRoute>
            <GuestForm />
            // </PrivateRoute>
            }
        />
        <Route
            path="/ticket/:id"
            element={
            // <PrivateRoute>
            <Guest />
            // </PrivateRoute>
            }
        />
        <Route 
            path="/event/:id/vendor"
            element={
            //     <PrivateRoute>
            <Vendor />
            // </PrivateRoute>
            }
        />
        <Route 
            path="/event/:id/guest/download"
            element={
            // <PrivateRoute>
            <GuestDownload />
            // </PrivateRoute>
            }
        />
         
        <Route
            path="/event/:id/vendor/:vid"
            element={
            //     <PrivateRoute>
            <VendorResponse />
            // </PrivateRoute>
            }
         />
        <Route
            path="/updateguest/event/:id/vendor/:vid/guest/:ticketid"
            element={
            //     <PrivateRoute>
            <UpdateGuest />
            // </PrivateRoute>
            }
        />
      </Routes>
    </BrowserRouter>
  
};

export default Router;


