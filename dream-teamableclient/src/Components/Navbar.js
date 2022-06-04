import React from 'react';
import signOutUser from '../api/auth';
import {
    Navbar,
    Container,
    Nav,
} from 'react-bootstrap';

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
                        <Nav.Link href="/profile">Profile</Nav.Link>
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
