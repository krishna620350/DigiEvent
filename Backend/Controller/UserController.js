import bcrypt from "bcrypt";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import FireStore from "../Config/Connection.js";

export default class UserController {
  ReadData = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const querySnapshot = await getDocs(collection(FireStore, "users"));

      let user = null;

      //code optimization is done when given email from user matches from DB
      for (var i in querySnapshot.docs) {
        const doc = querySnapshot.docs[i].data();
        if (doc.email === email) {
          user = doc;
          break;
        }
      }

      if (user) {
        //given password is matched against stored hashed password of the user

        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) res.status(200).json(user);
        else res.status(401).json("password is incorrect");
      } else {
        res.status(404).json("user is not registered.please signup");
      }
    } catch (e) {
      console.log(e);
      res.status(500).json("Error adding document: ", e);
    }
  };

  InsertData = async (req, res) => {
    const document = {
      name: req.body.name,
      email: req.body.email,
      visitorType: req.body.visitorType,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    try {
      //hashing password before storing it to DB
      document.password = document.confirmPassword = await hashPassword(
        document.password
      );

      const docRef = await addDoc(collection(FireStore, "users"), document);

      res.status(201).json({ ...document, id: docRef.id } );
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  };
}

// utility function to get hashed password
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
