import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { Button, Card } from 'react-bootstrap';
import { createFavorite, deleteFavorite, getFavorites } from '../api/favoriteData';


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

export default function LineupCards({ lineups, players, favorites, setFavorites }) {
    const hitsArr = [];
    const homeRuns = [];
    const walks = [];
    const avg = [];
    const names = [];
    const Fb = [];
    const Sb = [];
    const ss = [];
    const thirdb = [];
    const left = [];
    const center = [];
    const right = [];
    const starter = [];
    const closer = [];
    const test = [];
    const test2 =[];
    const fav = [];
    const lineupId = [];
    const favUid = [];
    const favId = [];

    favorites.forEach((e) => {
        if (e.lineupId === lineups.id.toString() && e.favoriteUid === uid) {
            fav.push(e.lineupId);
            favId.push(e.id);
            favUid.push(e.favoriteUid);
        }
    });

    lineupId.push(lineups.id.toString());
    test.push(lineups.id);

    test.forEach((e) => {
        if (e === lineups.id) {
            test2.push(e)
        }
    })

    players.forEach((e) => {
        if (e.id.toString() === lineups.firstbaseId) {
            names.push(e);
            Fb.push(e);
        } else if (e.id.toString() === lineups.secondbaseId) {
            names.push(e);
            Sb.push(e);
        } else if (e.id.toString() === lineups.shortstopId) {
            names.push(e);
            ss.push(e);
        } else if (e.id.toString() === lineups.thirdbaseId) {
            names.push(e);
            thirdb.push(e);
        } else if (e.id.toString() === lineups.leftFieldId) {
            names.push(e);
            left.push(e);
        } else if (e.id.toString() === lineups.centerFieldId) {
            names.push(e);
            center.push(e);
        } else if (e.id.toString() === lineups.rightFieldId) {
            names.push(e);
            right.push(e);
        } else if (e.id.toString() === lineups.startingPitchId) {
            names.push(e)
            starter.push(e);
        } else if (e.id.toString() === lineups.closingPitcherId) {
            names.push(e);
            closer.push(e);
        }
    });

    names.forEach((e) => {
        if (e.hits !== null) {
            hitsArr.push(parseInt(e.hits))
        }
    });
    let totalHits = hitsArr.reduce((acc, num) => {
        return acc + num
    }, 0);

    names.forEach((e) => {
        if (e.homeRuns !== null) {
            homeRuns.push(parseInt(e.homeRuns))
        }
    });
    let totalHomeruns = homeRuns.reduce((acc, num) => {
        return acc + num
    }, 0);

    names.forEach((e) => {
        if (e.walks !== null) {
            walks.push(parseInt(e.walks))
        }
    });
    let totalWalks = walks.reduce((acc, num) => {
        return acc + num
    }, 0);

    names.forEach((e) => {
        if (e.avg !== null) {
            avg.push(parseFloat(e.avg))
        }
    });
    let combindedAvg = avg.reduce((acc, num) => {
        return acc + num / 7
    }, 0);

    const setFavoriteUid = () => {
        if (window.confirm(`Favorite ${lineups.lineupName}?`) === true) {
            createFavorite({lineupId: test2[0].toString(), favoriteUid: uid}).then(() => getFavorites()).then((e) => setFavorites(e));
        }
    }

    const unFavorite = () => {
        if (window.confirm(`Un-Favorite ${lineups.lineupName}?`) === true) {
            deleteFavorite(favId[0]).then(e => setFavorites(e));
        }
    }

        return (
            <>
                <Card className="lineup-cards" style={{ width: '18rem' }}>
                    <Card.Body>
                        <h4>{lineups.lineupName}</h4>
                        <p>1B. {Fb[0].playerName}</p>
                        <p>2B. {Sb[0].playerName}</p>
                        <p>SS. {ss[0].playerName}</p>
                        <p>3B. {thirdb[0].playerName}</p>
                        <p>LF. {left[0].playerName}</p>
                        <p>CF. {center[0].playerName}</p>
                        <p>RF. {right[0].playerName}</p>
                        <p>SP. {starter[0].playerName}</p>
                        <p>CP. {closer[0].playerName}</p>
                        <p>Combined Avg - {combindedAvg.toFixed(3)}</p>
                        <p>Total Hits - {totalHits}</p>
                        <p>Total Homeruns - {totalHomeruns}</p>
                        <p>Total Walks - {totalWalks}</p>
                        {fav[0] !== lineupId[0] && favUid[0] !== uid ? (
                            <Button onClick={setFavoriteUid}>Favorite</Button>
                        ) : (
                            <Button className="btn-danger" onClick={unFavorite}>Un-Favorite</Button>
                        )}
                    </Card.Body>
                </Card>
            </>
        )
    }