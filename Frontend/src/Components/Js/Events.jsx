import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import EventApi from "../../Apis/EventApi";

import "../Css/Header.css";
import "../Css/ongoingevents.css";
import Menu from "./Navbar";
import Footer from "./Footer";

function Header() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((event) => {
      return (
        new Date(event.StartDate) < new Date() &&
        new Date(event.EndDate) > new Date()
      );
    });
  }, [data]);
  console.log(filteredData);

  useEffect(() => {
    const api = new EventApi();
    api.EventGet().then((event) => {
      console.log(event.id);
      setData(event);
    });
  }, []);

  const showdets = (index) => {
    filteredData.map((values, i) => {
      if (i === index) {
        setModal(values);
      }
    });
  };

  return (
    <>
      <Menu />
      <p className="event-head">Here's the list of ongoing events:</p>
      <div className="container">
        {filteredData.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>S. No</th>
                <th>Event Name</th>
                <th>Host Name</th>
                <th>Start Date</th>
                <th>Show Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((event, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.EventName}</td>
                    <td>{event.HostName}</td>
                    <td>{event.StartDate}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-success btn-sm"
                        onClick={(e) => showdets(index)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No ongoing events found.</p>
        )}
      </div>
      <hr></hr>
      {/*Modal */}
      <div
        class="modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {modal.EventName}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              
              <p>Hosted by: {modal.HostName}</p>
              <p>Description: {modal.EventDescription}</p>
              <p>Starts on: {modal.StartDate}</p>
              <p>Ends on: {modal.EndDate}</p>
              <p>Location: {modal.City}</p>

              </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
      </div>
      

      <Footer />
    </>
  );
}

export default Header;
