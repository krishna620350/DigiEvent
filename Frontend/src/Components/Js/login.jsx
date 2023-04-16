import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Css/login.css"
import Menu from './Navbar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';

function Login() {
  const [userInfo,setUserInfo]=useState({
    email:"",
    password:"",
  });

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    // console.log(formValue);
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(userInfo);
    if(!userInfo.email && !userInfo.password ) return;
    
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
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={userInfo.password} onChange={HandleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
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