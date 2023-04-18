import { useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';

function Menu() {
  const navigate=useNavigate();
  return (
    <nav className='main-nav'>
      <label className='logo'>DigiEvent </label>
      <div className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
      <ul>
        <li><a href='/' className='active'>Home</a></li>
        <li><a href='/'>About</a></li>
        <li><a href='/'>Events</a></li>
        <li><a href='/login' onClick={()=>navigate("/login")} className="login">Log in</a></li>
        <li><a href='/signup' onClick={()=>navigate("/signup")} className="login">Sign up</a></li>
      </ul>
    </nav>
  );
}

export default Menu;