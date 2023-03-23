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
        try {
            const id = req.body.id;
            const document = {
                GuestName: req.body.GuestName,
                GuestPhone: req.body.GuestPhone,
                GuestEmail: req.body.GuestEmail,
                TicketCount: req.body.TicketCount,
                GuestAddress: req.body.GuestAddress,
                GuestAddress_1: req.body.GuestAddress,
                City: req.body.City,
                State: req.body.State,
                Zip: req.body.Zip,
                Paticipants: req.body.Paticipants
            }
            // console.log(Gid)
            await updateDoc(doc(FireStore, "Event", id), {
                Guests: arrayUnion(document)
            })
                .then(() => {
                    res.status(200).json({ "success": "success", "message": "guest added" });
                })
                .catch(e => res.status(404).json(e));
        } catch (e) { 
            res.status(500).json(e);
        }
    };
}