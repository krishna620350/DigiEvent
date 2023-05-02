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
import GuestDownload from '../Components/Js/GuestDownload';
import GuestSearchVendor from '../Components/Js/GuestSearchVendor';

class Router extends React.Component {
    render() {
        return <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<App />}
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
                            element={<EventForm />}
                        />
                        <Route
                            path="/event/:id"
                            element={<Responsive />}
                            />
                        <Route 
                            path="/event/:id/guest"
                            element={<GuestForm />}
                        />
                        <Route
                            path="/ticket/:id"
                            element={<Guest />}
                        />
                        <Route 
                            path="/event/:id/vendor"
                            element={<Vendor />}
                        />
                        <Route
                            path="/event/:id/vendor/:vid"
                            element={<VendorResponse />}
                         />
                        <Route
                            path="/updateguest/event/:id/vendor/:vid/guest/:ticketid"
                            element={<UpdateGuest />}
                        />
                        <Route
                            path="/event/:id/guest/download"
                            element={<GuestDownload />}
                        />
                        <Route
                            path="/event/:id/vendor/search"
                            element={<GuestSearchVendor />}
                        />
                    </Routes>
                </BrowserRouter>
    }
}

export default Router;