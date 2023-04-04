import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    arrayUnion
} from "firebase/firestore";
import FireStore from "../Config/Connection.js";
import crypto from "crypto";

export default class GuestController{
    ReadData = async(req, res) => {
        try{
            const id = req.body.id;
            const results = [];
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            querySnapshot.forEach((doc) => {
                if(doc.id === id) results.push(doc.data());
            });
            // console.log(results)
            res.status(200).json(results);
        }catch(e){
            // console.log(e);
            res.status(404).json(e);
        }
    };

    FetchData = async (req, res) => {
        try {
            const id = req.body.id;
            const phone = req.body.guest;
            const results = [];
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            querySnapshot.forEach((doc) => {
                if (doc.id === id) {
                    // console.log(doc.data().Guests.length);
                    doc.data().Guests.forEach(item => {
                        if (item.GuestPhone == phone) { 
                            results.push(item);
                            // console.log(results.length);
                        }
                    })
                }
            });
            // console.log(results)
            res.status(200).json(results);
        } catch (e) {
            // console.log(e);
            res.status(404).json(e);
        }
    };

    InsertData = async(req, res) => {
        // console.log(req.body);
        const result = [];
        try {
            let i = req.body.length - 1;
            // console.log(i);
            while(i >= 0) {
                const id = req.body[i].id;
                const document = {
                    GuestName: req.body[i].GuestName,
                    GuestPhone: req.body[i].GuestPhone,
                    GuestEmail: req.body[i].GuestEmail,
                    GuestAddress: req.body[i].GuestAddress,
                    GuestAddress_1: req.body[i].GuestAddress_1,
                    City: req.body[i].City,
                    State: req.body[i].State,
                    Zip: req.body[i].Zip,
                    Ticket: req.body[i].Ticket,
                    Status: req.body[i].Status
                }
                // console.log(i)
                await updateDoc(doc(FireStore, "Event", id), {
                    Guests: arrayUnion(document)
                })
                    .then(() => {
                        result.push({id : req.body[i].Ticket})
                    })
                    .catch(e => res.status(404).json(e));
                i--;
            }
        } catch (e) { 
            res.status(500).json(e);
        } finally {
            res.status(200).json(result);
        }
    };
}