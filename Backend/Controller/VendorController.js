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
        const results = [];
        try {
            const id = req.body.id;
            const Vid = req.body.Vid;
            const querySnapshot = await getDocs(collection(FireStore, "Event"));
            querySnapshot.forEach((doc) => {
                if (doc.id === id) {
                    // console.log(doc.data().Guests.length);
                    doc.data().Vendors.forEach(item => {
                        if (item.id === Vid) {
                            results.push(item);
                            // console.log(results.length);
                        }
                    })
                }
            });
            // console.log(results)
        } catch (e) {
            // console.log(e);
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

    FindRecordAndUpdate = async (id, VID, result) => {
        // console.log(result, id, VID);
       const querySnapshot = await getDocs(collection(FireStore, "Event"));
       querySnapshot.forEach(async (doc) => {
           if (doc.id === id) {
               const vendors = doc.data().Vendors;
            //    console.log(vendors);
               const vendorIndex = vendors.findIndex((vendor) => vendor.id === VID);
            //    console.log(vendorIndex);
               if (vendorIndex === -1) {
                   throw new Error(`Vendor with ID ${VID} does not exist in event with ID ${id}.`);
               }
               const updatedVendor = { ...vendors[vendorIndex], GID: result };
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
            const VID = this.UniqueID();
            const id = req.body.id;
            const vendorDocuments = {
                id: VID,
                VendorName: req.body.VendorName,
                VendorPhone: req.body.VendorPhone,
                VendorEmail: req.body.VendorEmail,
                VendorAddress: req.body.VendorAddress,
                VendorAddress_1: req.body.VendorAddress_1,
                City: req.body.City,
                State: req.body.State,
                Zip: req.body.Zip,
                TicketCount: req.body.TicketCount,
            }
            await updateDoc(doc(FireStore, "Event", id), {
                Vendors: arrayUnion(vendorDocuments)
            }).then(async () => {
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
                // console.log(result);
                await this.FindRecordAndUpdate(id, VID, result).then(() => {
                    response = VID;
                    // console.log(response);
                });
            })
        } catch (e) {
            res.status(500).json(e);
        } finally {
            res.status(200).json({id: response});
        }
    };
}