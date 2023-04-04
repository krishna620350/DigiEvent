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

export default class VendorController {
    ReadData = async (req, res) => {
        try {
            const id = req.body.id;
            const results = [];
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            querySnapshot.forEach((doc) => {
                if (doc.id === id) results.push(doc.data());
            });
            // console.log(results)
            res.status(200).json(results);
        } catch (e) {
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

    UniqueID = () => {
        const randomBytes = crypto.randomBytes(12);
        const hexString = randomBytes.toString('hex');
        return hexString;
    };

    InsertData = async (req, res) => {
        // console.log(req.body);
        const result = [];
        try {
            const VID = this.UniqueID();
            const id = req.body.id;
            const vendorDocuments = {
                id: VID,
                VendorName: req.body.VendorName,
                VendorPhone: req.body.VendorPhone,
                VendorEmail: req.body.VendorEmail,
                VendorAddress: req.body.VendorAddress,
                VendorAddress_1: req.body.VendorAddress,
                City: req.body.City,
                State: req.body.State,
                Zip: req.body.Zip,
                TicketCount: req.body.TicketCount
            }
            await updateDoc(doc(FireStore, "Event", id), {
                Vendors: arrayUnion(vendorDocuments)
            }).then(async () => {
                result.push(VID)
                let i = req.body.TicketCount;
                // console.log(i);
                while (i > 0) {
                    const TID = this.UniqueID();
                    const document = {
                        VendorId: VID,
                        GuestName: "",
                        GuestPhone: "",
                        GuestEmail: "",
                        GuestAddress: "",
                        GuestAddress_1: "",
                        City: "",
                        State: "",
                        Zip: "",
                        Ticket: TID,
                        Status: -1
                    }
                    // console.log(i)
                    await updateDoc(doc(FireStore, "Event", id), {
                        Guests: arrayUnion(document),
                    }).then((response) => {
                        result.push({ id: TID})
                    }).catch(e => res.status(404).json(e));

                    i--;
                }
            })
        } catch (e) {
            res.status(500).json(e);
        } finally {
            res.status(200).json(result);
        }
    };
}