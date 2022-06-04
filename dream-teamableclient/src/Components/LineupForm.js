import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPlayers } from '../api/playerData';
import { createLineup, updateLineups } from '../api/lineupData';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';

const initialState = {
    lineupName: '',
    lineupLogo: '',
    firstbaseId: '',
    secondbaseId: '',
    shortstopId: '',
    thirdbaseId: '',
    leftFieldId: '',
    centerFieldId: '',
    rightFieldId: '',
    startingPitchId: '',
    closingPitcherId: '',
    userId: '',
}

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
  };
  firebase.initializeApp(firebaseConfig);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      initialState.userId = user.uid;
    }
  });
  
  export default function LineupForm({ lineups }){
    const [formInput, setFormInput] = useState(initialState);
    const [players, setPlayers] = useState([]);

    const Navigate = useNavigate();

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

    useEffect(() => {
        if (lineups.id) {
            setFormInput(lineups);
        } else {
            setFormInput(initialState);
        }
    }, [lineups]);

    const handleChange = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          lineupName: e.target.value
        }));
      };

      const handleLogo = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          lineupLogo: e.target.value
        }));
      };

      const handleFirst = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          firstbaseId: e.target.value
        }));
      };

      const handleSecond = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          secondbaseId: e.target.value
        }));
      };

      const handleShort = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          shortstopId: e.target.value
        }));
      };

      const handleThird = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          thirdbaseId: e.target.value
        }));
      };

      const handleLeft = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          leftFieldId: e.target.value
        }));
      };

      const handleCenter = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          centerFieldId: e.target.value
        }));
      };

      const handleRight = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          rightFieldId: e.target.value
        }));
      };

      const handleStarting = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          startingPitchId: e.target.value
        }));
      };

      const handleClosing = (e) => {
        setFormInput((prevState) => ({
          ...prevState,
          closingPitcherId: e.target.value
        }));
      };

      const resetForm = () => {
        setFormInput(initialState);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (lineups.id) {
          updateLineups(formInput).then(() => {
            resetForm();
            Navigate("/lineups");
          });
        } else {
          createLineup(formInput).then(() => {
            resetForm();
            Navigate('/lineups');
          });
        }
      };

    const firstBase = players.filter((allPlayers) => allPlayers.position === "1B");
    const secondBase = players.filter((allPlayers) => allPlayers.position === "2B");
    const shortstop = players.filter((allPlayers) => allPlayers.position === "SS");
    const thirdBase = players.filter((allPlayers) => allPlayers.position === "3B");
    const leftField = players.filter((allPlayers) => allPlayers.position === "LF");
    const rightField = players.filter((allPlayers) => allPlayers.position === "RF");
    const centerField = players.filter((allPlayers) => allPlayers.position === "CF");
    const startingPitcher = players.filter((allPlayers) => allPlayers.position === "SP");
    const closingPitcher = players.filter((allPlayers) => allPlayers.position === "RP");

    return(
        <div className="lineup-form">
        <form onSubmit={handleSubmit} className="lineup-form">
        <input
          className="search-bar"
          placeholder="Lineup Name"
          onChange={handleChange}
          value={formInput.name}
        />
        <br />
        <input
          className="search-bar"
          placeholder="Lineup Logo"
          onChange={handleLogo}
          value={formInput.lineupLogo}
        />
        <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleFirst}
            value={formInput.firstbaseId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Firstbase
              </option>{' '}
              {firstBase ? firstBase.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleSecond}
            value={formInput.secondbaseId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Secondbase
              </option>{' '}
              {secondBase ? secondBase.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleShort}
            value={formInput.shortstopId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Shortstop
              </option>{' '}
              {shortstop ? shortstop.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleThird}
            value={formInput.thirdbaseId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Thirdbase
              </option>{' '}
              {thirdBase ? thirdBase.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleLeft}
            value={formInput.leftFieldId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Left Field
              </option>{' '}
              {leftField ? leftField.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleCenter}
            value={formInput.centerFieldId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Center Field
              </option>{' '}
              {centerField ? centerField.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleRight}
            value={formInput.rightFieldId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Right Field
              </option>{' '}
              {rightField ? rightField.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleStarting}
            value={formInput.startingPitchId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Starting Pitcher
              </option>{' '}
              {startingPitcher ? startingPitcher.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <select
            className="dropDown"
            typeof="text"
            onChange={handleClosing}
            value={formInput.closingPitcherId}
          >
              {' '}
              <option disabled="disabled" value="">
                  Closing Pitcher
              </option>{' '}
              {closingPitcher ? closingPitcher.map((allPlayers) => (
                  <option key={allPlayers.id} value={allPlayers.id}>
                      {allPlayers.playerName}
                  </option>
              )): ( '' )}
            </select>
          <br />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    )
}

LineupForm.propTypes = {
    lineups: PropTypes.shape(PropTypes.obj),
};

LineupForm.defaultProps = {
    lineups: {},
};