import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Css/login.css"
import Menu from './Navbar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import validateAuthInput from '../../utils/validateAuthInput';
import FormErrorMessage from './FormErrorMessage';
import loginApi from '../../Apis/Usersapi';
import { Navigate, useNavigate } from 'react-router-dom';

let flag = 0;

function Login() {
   const {currentUser,setUser} =useAuth();
   const navigate =useNavigate();
  // console.log(currentUser);
  const [userInfo,setUserInfo]=useState({
    email:"",
    password:"",
  });
  const [errorMessage,setErrorMessage]=useState({
    email:"",
    password:"",
    responseMessage:""
  });

  const api = useMemo(() => new loginApi(), []);
  

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    if(errorMessage.responseMessage)
    setErrorMessage((prev)=>({...prev,responseMessage:""}));
    if(flag)
    validateAuthInput(name,value,userInfo,setErrorMessage);
    // console.log(formValue);
  }
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setErrorMessage((prev)=>({...prev,responseMessage:""}));
    console.log(userInfo);
    flag = 1;
    let status = 1;
    for(let [name,value] of Object.entries(userInfo)){
       status &=  validateAuthInput(name,value,userInfo,setErrorMessage);
    }

    if(!status)
      return console.log("Form validation failed,it is not submitted");


      const response = await api.ReadData(userInfo)
    
      console.log(response);
      if(response.error){
        console.log("error while loggining in",response);
        setErrorMessage((prev)=>({...prev,responseMessage:response.error}));
      }else{
        setUser((user)=>({...user,currentUser:response}))
        return navigate("/")
      }

    
  }
  return (
    <>
      <Container >
      <Menu/>
      <p class="h1">Login Form</p><hr />
    <Form noValidate onSubmit={handleSubmit}>
    <Card className="border border-info border-3  mb-3"> 
    <Card.Body>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={userInfo.email} onChange={HandleInput}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <FormErrorMessage errorMessage={errorMessage.email}/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={userInfo.password} onChange={HandleInput} />
        <FormErrorMessage errorMessage={errorMessage.password}/>
      </Form.Group>
      
      </Card.Body>
      </Card>
    <FormErrorMessage errorMessage={errorMessage.responseMessage}/>
      <Button variant="primary" type="submit" className='mb-5'>
        Submit
      </Button>
    </Form>
    </Container>

    </>
  );
}

export default Login;