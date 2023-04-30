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
import Validation from "../Validations/GuestValidation.js";

export default class GuestController {
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
            const TicketId = req.body.TicketId;
            const Vid = req.body.Vid;
            const results = [];
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            querySnapshot.forEach((doc) => {
                if (doc.id === id) {
                    // console.log(doc.data().Guests.length);
                    doc.data().Guests.forEach(item => {
                        if (item.Ticket === TicketId && item.VendorId === Vid) {
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

    InsertData = async (req, res) => {
        // console.log(req.body);
        const result = [];
        const errors = [];
        let i = req.body.length - 1;
        try {
            // console.log(i);
            while (i >= 0) {
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
                const validation = new Validation(document);
                if (validation.valid) {
                    await updateDoc(doc(FireStore, "Event", id), {
                        Guests: arrayUnion(document)
                    })
                        .then(() => {
                            result.push({ id: req.body[i].Ticket })
                        })
                        .catch(e => res.status(404).json(e));
                } else {
                    errors.push({ error: validation.errors })
                }
                i--;
            }
        } catch (e) {
            res.status(500).json(e);
        } finally {
            if (errors.length > 0) {
                res.status(422).json(errors);
            } else {
                res.status(200).json(result);
            }
        }
    };

    UpdateData = async (req, res) => {
        // console.log(req.body);
        const { id, Vid, TicketId } = req.body;
        try {
            const { GuestName, GuestPhone, GuestEmail, GuestAddress, GuestAddress_1, City, State, Zip } = req.body;
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            for (const doc of querySnapshot.docs) {
                if (doc.id === id) {
                    const guests = doc.data().Guests;
                    const guestIndex = guests.findIndex(guest => guest.Ticket === TicketId && guest.VendorId === Vid);
                    if (guestIndex === -1) {
                        throw new Error(`Guest with Ticket ID ${TicketId} and/or Vendor ID ${Vid} does not exist in event with ID ${id}.`);
                    }
                    // console.log(guestIndex);
                    const updatedGuest = {
                        ...guests[guestIndex],
                        GuestName: GuestName !== "" ? GuestName : guests[guestIndex].GuestName,
                        GuestPhone: GuestPhone !== "" ? GuestPhone : guests[guestIndex].GuestPhone,
                        GuestEmail: GuestEmail !== "" ? GuestEmail : guests[guestIndex].GuestEmail,
                        GuestAddress: GuestAddress !== "" ? GuestAddress : guests[guestIndex].GuestAddress,
                        GuestAddress_1: GuestAddress_1 !== "" ? GuestAddress_1 : guests[guestIndex].GuestAddress_1,
                        City: City !== "" ? City : guests[guestIndex].City,
                        State: State !== "" ? State : guests[guestIndex].State,
                        Zip: Zip !== "" ? Zip : guests[guestIndex].Zip,
                        Status: 0,
                    };
                    // console.log(updatedGuest)
                    const updatedGuests = [
                        ...guests.slice(0, guestIndex),
                        updatedGuest,
                        ...guests.slice(guestIndex + 1),
                    ];
                    // console.log(updatedGuests)
                    await updateDoc(doc.ref, { Guests: updatedGuests });
                }
            }
        } catch (e) {
            res.status(500).json({ message: e.message });
        } finally {
            res.status(200).json({ id: Vid, TicketId: TicketId });
        }
    };
}