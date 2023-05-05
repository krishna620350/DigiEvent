import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import FireStore from "../Config/Connection.js";

import Validation from "../Validations/EventValidation.js";

export default class EventController{
    ReadData = async(req, res) => {
        try{
            const id = req.body.id;
            const results = [];
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            querySnapshot.forEach((doc) => {
                if (doc.id == id) {
                    results.push(doc.data());
                    // console.log(doc.id, doc.data());
                }
            });
            // console.log(results);
            res.status(200).json(results);
        }catch(e){
            // console.log(e);
            res.status(404).json(e);
        }
    };
    InsertData = async (req, res) => {
        let response = {};
        try {
            const document = {
                HostName: req.body.HostName,
                EventName: req.body.EventName,
                HostEmail: req.body.HostEmail,
                HostPhone: req.body.HostPhone,
                EventAddress: req.body.EventAddress,
                EventAddress_1: req.body.EventAddress_1,
                City: req.body.City,
                State: req.body.State,
                Zip: req.body.Zip,
                EventDescription: req.body.EventDescription,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                TotalTicket: req.body.TotalTicket,
                Guests: []
            }
            // console.log(document);
            const validation = new Validation(document);
            console.log(validation.valid);
            if (validation.valid) {
                const docRef = await addDoc(collection(FireStore, "Event"), document);
                response.id = docRef.id;
            } else {
                response.error = validation.errors[0];
            }
        } catch (e) {
            response.error = e.message;
        }

        if (response.id) {
            res.status(201).json(response);
        } else if (response.error) {
            res.status(422).json(response);
        } else {
            res.status(500).json({ error: "Unexpected error" });
        }
    }

    EventRead = async (req, res) => {
        try {
            const results = [];
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
                // console.log(doc.id, doc.data());
            });
            // console.log(results);
            res.status(200).json(results);
        } catch (e) {
            // console.log(e);
            res.status(404).json(e);
        };

    }
}