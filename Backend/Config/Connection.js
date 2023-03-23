import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import * as dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
  apiKey: "AIzaSyBWG_IdYX6RcAkTNjC_NmLppOu4qmZQeiY",
  authDomain: "digievent-cc3b1.firebaseapp.com",
  projectId: "digievent-cc3b1",
  storageBucket: "digievent-cc3b1.appspot.com",
  messagingSenderId: "1073860671136",
  appId: "1:1073860671136:web:e2856d8e5fbe92ddc93bc5",
  measurementId: "G-DB8SKBMCCP"
};

const DataBase = initializeApp(firebaseConfig);
const FireStore = getFirestore(DataBase);

export default (FireStore);
