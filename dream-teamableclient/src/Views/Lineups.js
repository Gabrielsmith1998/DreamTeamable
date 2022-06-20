import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites } from '../api/favoriteData';
import { getLineups } from '../api/lineupData';
import { getPlayers } from '../api/playerData';
import LineupCards from '../Components/LineupCards';

export default function Lineups() {
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

    return(
        <div>
            <Link to="/lineup-form">
                <button type="button" className="btn btn-success add-btn">Add</button>
            </Link>
            <h1 className="title">DreamTeamable Lineups</h1>
            {lineups && players && favorites ? (
                <>
                <div className="lineups">
                    {lineups.map((lineups) => (
                        <LineupCards lineups={lineups} key={lineups.id} setLineups={setLineups} players={players} setPlayers={setPlayers} favorites={favorites} setFavorites={setFavorites} />
                    ))}
                </div>
                </>
            ) : (
                ''
            )}
        </div>
    )
}