import React, { useEffect, useState } from 'react';
import { onLoginStatusChange } from './api/authManager';
import '../src/styles/styles.scss'
import Navigation from './Components/Navbar';
import firebase from 'firebase/compat/app';
import PublicRoutes from './Routes/PublicRoutes';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
}, []);

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} />
      <PublicRoutes isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
