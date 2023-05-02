import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Css/login.css"
import Menu from './Navbar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
import validateAuthInput from '../../utils/validateAuthInput';
import FormErrorMessage from './FormErrorMessage';

function Login() {
  // const {currentUser} =useAuth();
  // console.log(currentUser);
  const [userInfo,setUserInfo]=useState({
    email:"",
    password:"",
  });
  const [errorMessage,setErrorMessage]=useState({
    email:"",
    password:"",
  });

  

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    validateAuthInput(name,value,userInfo,setErrorMessage);
    // console.log(formValue);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(userInfo);
    let status = 1;
    for(let [name,value] of Object.entries(userInfo)){
       status &=  validateAuthInput(name,value,userInfo,setErrorMessage);
    }

    if(!status)
      console.log("Form validation failed,it is not submitted");

    
  }
  return (
    <>
      <Container >
      <Menu/>
      <p class="h1">Login Form</p><hr />
    <Form onSubmit={handleSubmit}>
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
      <Button variant="primary" type="submit" className='mb-5'>
        Submit
      </Button>
    </Form>
    </Container>
    </>
  );
}

export default Login;