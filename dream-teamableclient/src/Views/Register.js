import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../api/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const user = { name, email };
      register(user, password)
        .then(() => navigate("/"));
    }
  };

  return (
    <div className="register-container">
      <Form onSubmit={registerClick} className="register-form">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input className="reg-name" id="name" type="text" autoFocus onChange={e => setName(e.target.value)} required/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" className="reg-email" type="text" onChange={e => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" className="reg-password" type="password" onChange={e => setPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" className="reg-password" type="password" onChange={e => setConfirmPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Button type="submit" id="register-btn">Register</Button>
        </FormGroup>
      </Form>
    </div>
  );
}
