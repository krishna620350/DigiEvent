import { useNavigate } from "react-router-dom";
import "../Css/Navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function Menu() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    setUser(null) 

    //logic to call backend /logout route is currently missing
    
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand navLogo" href="#">
          DigiEvent
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <li> */}
              <a
                onClick={() => navigate("/dashboard")}
                className="pointerHover nav-link"
              >
                HOME
              </a>
              {/* </li> */}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                ABOUT
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                EVENTS
              </a>

              <ul className="dropdown-menu">
                <Link to="/event" className="dropdown-item">
                  Create event
                </Link>
                {/* <li>
                  <a className="dropdown-item" href="#">
                    Accept Guest
                  </a>
                </li> */}
                {/* {user.visitorType === "Admin" && ( */}
                  <Link to="/acceptguest" className="dropdown-item">
                    Accept Guest
                  </Link>
                {/* )} */}
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <a onClick={handleLogout} className="pointerHover login">
                Log out
              </a>
            </li>
            <li>
              <a className="pointerHover login">Welcome, !</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
