// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';

function Menu() {
  const navigate=useNavigate();
  return (
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="/">Home</Nav.Link>
    //         <Nav.Link href="/Event">Event</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">
    //             Profile
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Logout
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <nav className='main-nav'>
      <label className='logo'>DigiEvent </label>
      <div className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
      <ul>
        <li><a href='/' className='active'>Home</a></li>
        <li><a href='#'>About</a></li>
        <li><a href='#'>Events</a></li>
        <li><a onClick={()=>navigate("/login")} className="login">Log in</a></li>
        <li><a onClick={()=>navigate("/signup")} className="login">Sign up</a></li>
      </ul>
    </nav>
  );
}

export default Menu;