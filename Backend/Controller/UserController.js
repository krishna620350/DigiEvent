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
                if (data.email === email && data.password === password)
                {
                results.push({ id: doc.id, data: doc.data() });
                }
                else{
                    alert('Invalid email');
                }
            });
            res.status(200).send(results);
        }catch(e){
            res.status(500).send("Error adding document: ", e);
        }
    }

    InsertData = async(req, res) => {
        const document = {
            name: req.body.name,
            email: req.body.email,
            visitorType: req.body.visitorType,
            password: req.body.password,
            confirmPassword : req.body.confirmPassword
        }
        
        try {
            const docRef = await addDoc(collection(FireStore, "users"), document);
        
            res.status(201).json({ id: docRef.id });
          } catch (e) {
            res.status(500).json({ error: e });
          }
    }

   // findRecord = async (name) => {
       // try{
         //   const querySnapshot = await getDocs(collection(FireStore, "users"));
           // const result = [];
            //querySnapshot.forEach((doc) => {
              //  if(doc.data().name===name){
               //     result.push(doc.id);
                //}
        //    });
         //   return result;
      //  }catch(e) {
       //     console.error(e);
      //  }
  //  }
    
//     findUser = async (email, password) => {
//     try {
//       const querySnapshot = await getDocs(collection(FireStore, 'users'));
//       let result = null;
//       querySnapshot.forEach(doc => {
//         const data = doc.data();
//         if (data.email === email && data.password === password) {
//           result = doc;
//         }
//       });
//       return result;
//     } catch (e) {
//       console.error(e);
//     }
//   };
  
    // UpdateData = async (req, res) => {
    //     const name = req.body.name;
    //     const Uname = req.body.Uname;
    //     // console.log(firstName,UfirstName);
    //     try{
    //         const result = await this.findRecord(name);
    //         const update = doc(FireStore, "users", result[0]);
    //         await updateDoc(update, {
    //             name:Uname,
    //         });
    //         res.status(200).send(result);
    //     }catch(e) {
    //         res.status(500).json({ error: e });
    //     }
    // }

    // DeleteData = async (req, res) => {
    //     const name = req.body.firstName;
    //     const result = await this.findRecord(name)
    //     // console.log(result);
    //     try{
    //         const Delete = await deleteDoc(doc(FireStore, "users", result[0]));
    //         res.status(200).send("record deleted successfully");
    //     }catch(e){
    //         res.status(404).send("record not found");
    //     }
    // }
}