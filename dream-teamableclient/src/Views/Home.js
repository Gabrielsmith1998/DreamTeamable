import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { Card } from 'react-bootstrap';


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

export default function Home(){

    return(
        <>
        <h1 className="title">DreamTeamable</h1>
        <br />
        <div className="Home">
        <Card className="Link2" style={{ width: '18rem' }}>
            <Card.Body>
            <h4>View Lineups</h4>
            <br />
            <Link to="/lineups">
                <button type="button" className="btn btn-success add-btn">Go</button>
            </Link>
            </Card.Body>
        </Card>
        <Card className="Link2" style={{ width: '18rem' }}>
            <Card.Body>
            <h4>View Your Lineups</h4>
            <br />
            <Link to={`/profile/${uid}`}>
                <button type="button" className="btn btn-success go-btn">Go</button>
            </Link>
            </Card.Body>
        </Card>
        </div>
        </>
    )
}