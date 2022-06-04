import React from 'react';
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
export default function LineupCards({ lineups, players }) {
    const firstBase = players.filter((allPlayers) => allPlayers.id.toString() === lineups.firstbaseId);
    const secondBase = players.filter((allPlayers) => allPlayers.id.toString() === lineups.secondbaseId);
    const shortstop = players.filter((allPlayers) => allPlayers.id.toString() === lineups.shortstopId);
    const thirdbase = players.filter((allPlayers) => allPlayers.id.toString() === lineups.thirdbaseId);
    const leftField = players.filter((allPlayers) => allPlayers.id.toString() === lineups.leftFieldId);
    const centerField = players.filter((allPlayers) => allPlayers.id.toString() === lineups.centerFieldId);
    const rightField = players.filter((allPlayers) => allPlayers.id.toString() === lineups.rightFieldId);
    const startingPitcher = players.filter((allPlayers) => allPlayers.id.toString() === lineups.startingPitchId);
    const closingPitcher = players.filter((allPlayers) => allPlayers.id.toString() === lineups.closingPitcherId);
    const hitsArr = [];
    const homeRuns = [];
    players.forEach(e => console.warn(e));
    players.forEach((e) => {
        if (e.hits !== null) {
            hitsArr.push(parseInt(e.hits))
        }
    });
    let totalHits = hitsArr.reduce((acc, num) => {
        return acc + num
    }, 0);
    players.forEach((e) => {
        if (e.homeRuns !== null) {
            homeRuns.push(parseInt(e.homeRuns))
        }
    });
    let totalHomeruns = homeRuns.reduce((acc, num) => {
        return acc + num
    }, 0);
    return(
        <>
        <div>
            <h4>{lineups.lineupName}</h4>
            <p>1B. {firstBase[0].playerName}</p>
            <p>2B. {secondBase[0].playerName}</p>
            <p>SS. {shortstop[0].playerName}</p>
            <p>3B. {thirdbase[0].playerName}</p>
            <p>LF. {leftField[0].playerName}</p>
            <p>CF. {centerField[0].playerName}</p>
            <p>RF. {rightField[0].playerName}</p>
            <p>SP. {startingPitcher[0].playerName}</p>
            <p>CP. {closingPitcher[0].playerName}</p>
            <p>Hits - {totalHits}</p>
            <p>Homeruns - {totalHomeruns}</p>
        </div>
        </>
    )
}