import React from 'react';
import signOutUser from '../api/auth';
import {
    Navbar,
    Container,
    Nav,
} from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
  };
  firebase.initializeApp(firebaseConfig);
  
  var uid;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
    }
  });

export default function Navigation({ isLoggedIn }) {
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">DreamTeamable</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/lineups">Lineups</Nav.Link>
                    <Nav.Link href="/compare">Compare</Nav.Link>
                    <Nav.Link href={`/profile/${uid}`}>Profile</Nav.Link>
                        {isLoggedIn
                        ? <Nav.Link href="/login" onClick={signOutUser}>Logout</Nav.Link>
                        : <Nav.Link href="/login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}
