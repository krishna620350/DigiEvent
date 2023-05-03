import React, { useState, useEffect, useMemo } from "react";
import "../Css/Header.css";
import Menu from "./Navbar";
import { useAuth } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import EventApi from "../../Apis/EventApi";
import Footer from "./Footer";

const Header = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser.name);
  const [events, setEvents] = useState([]);
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      return (
        new Date(event.StartDate) < new Date() &&
        new Date(event.EndDate) > new Date()
      );
    });
  }, [events]);
  // console.log(filteredData);
  const guests = useMemo(() => {
    return filteredEvents.map((event) => event.Guests).flat();
  }, [events]);

  useEffect(() => {
    const api = new EventApi();
    api.EventGet().then((event) => {
      // console.log(event);
      setEvents(event);
    });
  }, []);

  return (
    <>
      <Menu />
      {filteredEvents.length > 0 && (
        <>
          <div>
          
            <p className="text-center main-para">
              Want to organise a business event? Or an event for an informal
              occasion? We've got you covered.
            </p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card border-success border border-2 ">
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="#">{guests.length}</a>
                    </h5>
                    <p className="card-text text-center">
                      Total number of guests
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card border-success border border-2">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to="/eventlist">{filteredEvents.length}</Link>
                    </h5>
                    <p className="card-text text-center">
                      Number of Ongoing Events
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Header;
