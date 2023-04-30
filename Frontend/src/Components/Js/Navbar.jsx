import { useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';
import { useAuth } from '../../context/AuthContext';

function Menu() {
  const navigate=useNavigate();
  const {currentUser,setUser} =useAuth();

  const handleLogout=()=>{
    setUser((prev)=>({...prev,currentUser:null}));

    //logic to call backend /logout route is currently missing
  }

  return (
    <nav className='main-nav'>
      <label className='logo'>DigiEvent </label>
      <div className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
      <ul>
        <li><a  onClick={()=>navigate("/")} className='active pointerHover'>Home</a></li>
        <li><a >About</a></li>
        <li><a >Events</a></li>
        {currentUser?
        <li><a onClick={handleLogout} className="pointerHover">Log out</a></li>
        :
        <>
        <li><a onClick={()=>navigate("/login")} className="pointerHover">Log in</a></li>
        <li><a onClick={()=>navigate("/signup")} className="pointerHover">Sign up</a></li>
        </>
        }
      </ul>
    </nav>
  );
}

export default Menu;