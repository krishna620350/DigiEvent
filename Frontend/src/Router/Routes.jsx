import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';

import App from '../Components/App';
import Login from '../Components/Js/login';
import ResponsiveExample from '../Components/Js/Response';
import GuestForm from '../Components/Js/GuestForm';
import EventForm from '../Components/Js/EventForm';
import Participant from '../Components/Js/Participant';
import Vendor from '../Components/Js/Vendor';
import VendorResponse from '../Components/Js/VendorResponse';
import UpdateGuest from '../Components/Js/UpdateGuest';
import Signup from '../Components/Js/Signup';

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
                            path="/Event"
                            element={<EventForm />}
                        />
                        <Route 
                            path="/Guest/:id"
                            element={<GuestForm />}
                        />
                        <Route 
                            path="/Vendor/:id"
                            element={<Vendor />}
                        />
                        <Route
                            path="/Response/:id"
                            element={<ResponsiveExample />}
                         />
                        <Route
                            path="/Participant/:id"
                            element={<Participant />}
                        />
                        <Route
                            path="/VendorResponse/:id"
                            element={<VendorResponse />}
                         />
                         <Route
                            path="/UpdateGuest/:id"
                            element={<UpdateGuest />}
                         />
                    </Routes>
                </BrowserRouter>
    }
}

export default Router;