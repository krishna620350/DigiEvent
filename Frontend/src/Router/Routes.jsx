import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';

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
import GuestSearchVendor from '../Components/Js/GuestSearchVendor';

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
        <Route
            path="/login"
            element={<Login />}
        />
        <Route
            path="/signup"
            element={<Signup />}
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
            path="/guest/:id"
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
         <Route
            path="/event/:id/vendor/search"
            element={
            //     <PrivateRoute>
            <GuestSearchVendor />
            // </PrivateRoute>
            }
        />
    </Routes>
</BrowserRouter>
}

export default Router;