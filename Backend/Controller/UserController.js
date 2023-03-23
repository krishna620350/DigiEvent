import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import FireStore from "../Config/Connection.js";

export default class UserController{
    ReadData = async (req, res) => {
        try{
            const querySnapshot = await getDocs(collection(FireStore, "users"));
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, data: doc.data() });
            });
            res.status(200).send(results);
        }catch(e){
            res.status(500).send("Error adding document: ", e);
        }
    }

    InsertData = async(req, res) => {
        const document = {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            born: req.body.born
        }
        
        try {
            const docRef = await addDoc(collection(FireStore, "users"), document);
        
            res.status(201).json({ id: docRef.id });
          } catch (e) {
            res.status(500).json({ error: e });
          }
    }

    findRecord = async (firstName) => {
        try{
            const querySnapshot = await getDocs(collection(FireStore, "users"));
            const result = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().firstName===firstName){
                    result.push(doc.id);
                }
            });
            return result;
        }catch(e) {
            console.error(e);
        }
    }

    UpdateData = async (req, res) => {
        const firstName = req.body.firstName;
        const UfirstName = req.body.UfirstName;
        // console.log(firstName,UfirstName);
        try{
            const result = await this.findRecord(firstName);
            const update = doc(FireStore, "users", result[0]);
            await updateDoc(update, {
                firstName:UfirstName,
            });
            res.status(200).send(result);
        }catch(e) {
            res.status(500).json({ error: e });
        }
    }

    DeleteData = async (req, res) => {
        const firstName = req.body.firstName;
        const result = await this.findRecord(firstName)
        // console.log(result);
        try{
            const Delete = await deleteDoc(doc(FireStore, "users", result[0]));
            res.status(200).send("record deleted successfully");
        }catch(e){
            res.status(404).send("record not found");
        }
    }
}