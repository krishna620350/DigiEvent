import React from "react";

import Header from "./Js/Header";
// import Footer from "./Js/Footer";
import "./Css/App.css"

class App extends React.Component {

  render() {
    return  <div
              className="App"
            >
              <Header />
              {/* <Footer /> */}
            </div>
  }
}

export default App;
