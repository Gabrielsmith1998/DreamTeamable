import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLineups } from '../api/lineupData';
import { getPlayers } from '../api/playerData';
import LineupCards from '../Components/LineupCards';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { getFavorites } from '../api/favoriteData';


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

export default function Profile() {
    const [lineups, setLineups] = useState([]);
    const [players, setPlayers] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if(isMounted) {
            getFavorites().then((allFavs) => {
                setFavorites(allFavs);
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if(isMounted) {
            getLineups().then((allLineups) => {
                setLineups(allLineups);
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if(isMounted) {
            getPlayers().then((allPlayers) => {
                setPlayers(allPlayers);
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const usersLineups = lineups.filter((allLineups) => allLineups.userId === uid);

    const favLineupId = [];
    const favLineups = [];

    favorites.forEach((e) => {
        favLineupId.push(e);
    });

    favLineupId.forEach((e) => {
        lineups.forEach((a) => {
            if (a.id.toString() === e.lineupId && e.favoriteUid === uid) {
                favLineups.push(a)
            }
        })
    });

    return(
        <div>
            <Link to="/lineup-form">
                <button type="button" className="btn btn-success edit-btn">Add</button>
            </Link>
            <h1 className="title">Your Lineups</h1>
            {lineups ? (
                <>
                <div className="lineups">
                    {usersLineups.map((lineups) => (
                        <LineupCards lineups={lineups} key={lineups.id} setLineups={setLineups} players={players} favorites={favorites} setFavorites={setFavorites} />
                    ))}
                </div>
                </>
            ) : (
                ''
            )}
            <br />
            <h1 className="title">Your Favorites</h1>
            {lineups ? (
                <>
                <div className="lineups">
                    {favLineups.map((lineups) => (
                        <LineupCards lineups={lineups} key={lineups.id} setLineups={setLineups} players={players} favorites={favorites} setFavorites={setFavorites} />
                    ))}
                </div>
                </>
            ) : (
                ''
            )}
        </div>
    )
}