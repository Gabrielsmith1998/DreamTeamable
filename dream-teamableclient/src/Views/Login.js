import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authManager';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <div className="login-container">
      <div className="text-center">
        <h1>Welcome! Login!</h1>
        <Form className="login" onSubmit={loginSubmit}>
          <fieldset>
            <FormGroup>
              <Label for="login-email">Email</Label>
              <Input className="email" id="login-email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="login-password">Password</Label>
              <Input className="password" id="login-password" type="password" onChange={e => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Button id="login-button">Login</Button>
            </FormGroup>
            <em>
              Not registered? <Link to='/register'>Register</Link>
            </em>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
