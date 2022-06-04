import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLineups } from '../api/lineupData';
import getPlayers from '../api/playerData';
import LineupCards from '../Components/LineupCards';

export default function Lineups() {
    const [lineups, setLineups] = useState([]);
    const [players, setPlayers] = useState([]);

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
            {lineups ? (
                <>
                <div>
                <Link to="/lineup-form">
                  <button type="button" className="btn btn-success edit-btn">Add</button>
                </Link>
                    {lineups.map((lineups) => (
                        <LineupCards lineups={lineups} key={lineups.id} setLineups={setLineups} players={players} />
                    ))}
                </div>
                </>
            ) : (
                ''
            )}
        </div>
    )

}