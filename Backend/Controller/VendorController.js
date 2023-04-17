import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    arrayUnion,
} from "firebase/firestore";
import FireStore from "../Config/Connection.js";
import crypto from "crypto";

export default class VendorController {
    ReadData = async (req, res) => {
        try {
            const id = req.body.id;
            const results = [];
            if (id === 'vendor') {
                const querySnapshot = await getDocs(collection(FireStore, "Vendors"));
                querySnapshot.forEach((doc) => {
                    results.push({
                        id: doc.id,
                        name: doc.data().VendorName
                    });
                });
            } else {
                const querySnapshot = await getDocs(collection(FireStore, "Event"));
                querySnapshot.forEach((doc) => {
                    if (doc.id === id) results.push(doc.data());
                });
            }
            // console.log(results)
            res.status(200).json(results);
        } catch (e) {
            // console.log(e);
            res.status(404).json(e);
        }
    };

    FetchData = async (req, res) => {
        const results = [];
        const guest = [];
        try {
            const id = req.body.id;
            const Vid = req.body.Vid;
            const query1 = await getDocs(collection(FireStore, "Event"));
            const query2 = await getDocs(collection(FireStore, "Vendors"));
            query1.forEach((doc) => {
                if (doc.id === id) {
                    doc.data().Vendors.forEach(item => {
                        if (item.Vid === Vid) {
                            const vendorDoc = query2.docs.find(docitem => docitem.id === Vid);
                            if (vendorDoc) {
                                results.push(vendorDoc.data());
                            }
                            item.GuestId.forEach(guestid => guest.push(guestid));
                        }
                    })
                }
            });
            results.push({ GID: guest });
            // console.log(results)
        } catch (e) {
            res.status(404).json(e);
        } finally {
            res.status(200).json(results);
        }
    };


    UniqueID = () => {
        const randomBytes = crypto.randomBytes(12);
        const hexString = randomBytes.toString('hex');
        return hexString;
    };

    FindRecordAndUpdate = async (id, VID, result, TicketCount) => {
        // console.log(result, id, VID);
       const querySnapshot = await getDocs(collection(FireStore, "Event"));
       querySnapshot.forEach(async (doc) => {
           if (doc.id === id) {
               const vendors = doc.data().Vendors;
            //    console.log(vendors);
               const vendorIndex = vendors.findIndex((vendor) => vendor.Vid === VID);
            //    console.log(vendorIndex);
               if (vendorIndex === -1) {
                   throw new Error(`Vendor with ID ${VID} does not exist in event with ID ${id}.`);
               }
               const updatedVendor = {
                   ...vendors[vendorIndex],
                   GuestId: result,
                   TicketCount: TicketCount
                };
            //    console.log(updatedVendor);
               const updatedVendors = [
                   ...vendors.slice(0, vendorIndex),
                   updatedVendor,
                   ...vendors.slice(vendorIndex + 1),
               ];
            //    console.log(updatedVendor);

               await updateDoc(doc.ref, { Vendors: updatedVendors });
           }
       });
    };


    InsertData = async (req, res) => {
        // console.log(req.body);
        const result = [];
        let response = '';
        try {
            const id = req.body.id;
            const vendorDocuments = {
                VendorName: req.body.VendorName,
                VendorPhone: req.body.VendorPhone,
                VendorEmail: req.body.VendorEmail,
                VendorAddress: req.body.VendorAddress,
                VendorAddress_1: req.body.VendorAddress_1,
                City: req.body.City,
                State: req.body.State,
                Zip: req.body.Zip,
            }
            const docRef = await addDoc(collection(FireStore, "Vendors"), vendorDocuments);
            const Vid = docRef.id;
            await updateDoc(doc(FireStore, "Event", id), {
                Vendors: arrayUnion({Vid: Vid, GuestId:[]})
            }).then(async () => {
                let i = req.body.TicketCount;
                // console.log(i);
                while (i > 0) {
                    const TID = this.UniqueID();
                    const document = {
                        VendorId: Vid,
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
                const TicketCount = req.body.TicketCount;
                // console.log(result);
                await this.FindRecordAndUpdate(id, Vid, result, TicketCount ).then(() => {
                    response = Vid;
                    // console.log(response);
                });
            })
        } catch (e) {
            res.status(500).json(e);
        } finally {
            res.status(200).json({id: response});
        }
    };

    UpdateData = async (req, res) => { 
        const result = [];
        let response = '';
        try {
            const id = req.body.id;
            const Vid = req.body.VendorName;
            await updateDoc(doc(FireStore, "Event", id), {
                Vendors: arrayUnion({ Vid: Vid, GuestId: [] })
            }).then(async () => {
                let i = req.body.TicketCount;
                // console.log(i);
                while (i > 0) {
                    const TID = this.UniqueID();
                    const document = {
                        VendorId: Vid,
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
                        result.push({ id: TID })
                    }).catch(e => res.status(404).json(e));
                    i--;
                }
                // console.log(result);
                const TicketCount = req.body.TicketCount;
                await this.FindRecordAndUpdate(id, Vid, result, TicketCount).then(() => {
                    response = Vid;
                    // console.log(response);
                });
            })
        } catch (e) {
            res.status(500).json(e);
        } finally {
            res.status(200).json({ id: response });
        }
    }
}