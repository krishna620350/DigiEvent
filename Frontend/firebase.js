import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBWG_IdYX6RcAkTNjC_NmLppOu4qmZQeiY",
  authDomain: "digievent-cc3b1.firebaseapp.com",
  databaseURL: "https://digievent-cc3b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "digievent-cc3b1",
  storageBucket: "digievent-cc3b1.appspot.com",
  messagingSenderId: "1073860671136",
  appId: "1:1073860671136:web:e2856d8e5fbe92ddc93bc5",
  measurementId: "G-DB8SKBMCCP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);