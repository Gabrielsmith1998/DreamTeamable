import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getLineup, getLineups } from '../api/lineupData';
import { getPlayers } from '../api/playerData';
import LineupCards from '../Components/LineupCards';

export default function Compare() {
    const [lineups, setLineups] = useState([]);
    const [players, setPlayers] = useState([]);
    const [lineups2, setLineups2] = useState([]);
    const [players2, setPlayers2] = useState([]);
    const [lineup1, setLineup1] = useState([]);
    const [lineup1Players, setLineup1Players] = useState([]);
    const [lineup2, setLineup2] = useState([]);
    const [lineup2Players, setLineup2Players] = useState([]);

    const hitsArr = [];
    const homeRuns = [];
    const walks = [];
    const ks = [];
    const wins = [];
    const Saves = [];
    const losses = [];
    const avg = [];
    const names = [];
    const names2 = [];
    const catcher = [];
    const Fb = [];
    const Sb = [];
    const ss = [];
    const thirdb = [];
    const left = [];
    const center = [];
    const right = [];
    const starter = [];
    const closer = [];
    const catcher2 = [];
    const Fb2 = [];
    const Sb2 = [];
    const ss2 = [];
    const thirdb2 = [];
    const left2 = [];
    const center2 = [];
    const right2 = [];
    const starter2 = [];
    const closer2 = [];
    lineup1Players.forEach((e) => {
        if (e.id.toString() === lineup1.firstbaseId) {
            names.push(e);
            Fb.push(e.playerName);
        } else if (e.id.toString() === lineup1.secondbaseId) {
            names.push(e);
            Sb.push(e.playerName);
        } else if (e.id.toString() === lineup1.shortstopId) {
            names.push(e);
            ss.push(e.playerName);
        } else if (e.id.toString() === lineup1.thirdbaseId) {
            names.push(e);
            thirdb.push(e.playerName);
        } else if (e.id.toString() === lineup1.leftFieldId) {
            names.push(e);
            left.push(e.playerName);
        } else if (e.id.toString() === lineup1.centerFieldId) {
            names.push(e);
            center.push(e.playerName);
        } else if (e.id.toString() === lineup1.rightFieldId) {
            names.push(e);
            right.push(e.playerName);
        } else if (e.id.toString() === lineup1.startingPitchId) {
            names.push(e)
            starter.push(e.playerName);
        } else if (e.id.toString() === lineup1.closingPitcherId) {
            names.push(e);
            closer.push(e.playerName);
        } else if (e.id.toString() === lineup1.catcherId) {
            names.push(e);
            catcher.push(e.playerName);
        }
    });

    lineup2Players.forEach((e) => {
        if (e.id.toString() === lineup2.firstbaseId) {
            names2.push(e);
            Fb2.push(e.playerName);
        } else if (e.id.toString() === lineup2.secondbaseId) {
            names2.push(e);
            Sb2.push(e.playerName);
        } else if (e.id.toString() === lineup2.shortstopId) {
            names2.push(e);
            ss2.push(e.playerName);
        } else if (e.id.toString() === lineup2.thirdbaseId) {
            names2.push(e);
            thirdb2.push(e.playerName);
        } else if (e.id.toString() === lineup2.leftFieldId) {
            names2.push(e);
            left2.push(e.playerName);
        } else if (e.id.toString() === lineup2.centerFieldId) {
            names2.push(e);
            center2.push(e.playerName);
        } else if (e.id.toString() === lineup2.rightFieldId) {
            names2.push(e);
            right2.push(e.playerName);
        } else if (e.id.toString() === lineup2.startingPitchId) {
            names2.push(e)
            starter2.push(e.playerName);
        } else if (e.id.toString() === lineup2.closingPitcherId) {
            names2.push(e);
            closer2.push(e.playerName);
        } else if (e.id.toString() === lineup2.catcherId) {
            names2.push(e);
            catcher2.push(e.playerName);
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

    names.forEach((e) => {
        if (e.strikeouts !== null) {
            ks.push(parseInt(e.strikeouts))
        }
    });
    let totalKs = ks.reduce((acc, num) => {
        return acc + num
    }, 0);

    names.forEach((e) => {
        if (e.wins !== null) {
            wins.push(parseInt(e.wins))
        }
    });
    let totalWins = wins.reduce((acc, num) => {
        return acc + num
    }, 0);

    names.forEach((e) => {
        if (e.losses !== null) {
            losses.push(parseInt(e.losses))
        }
    });
    let totalLosses = losses.reduce((acc, num) => {
        return acc + num
    }, 0);

    names.forEach((e) => {
        if (e.saves !== null) {
            Saves.push(parseInt(e.saves))
        }
    });
    let totalSaves = Saves.reduce((acc, num) => {
        return acc + num
    }, 0);

    const hitsArr2 = [];
    const homeRuns2 = [];
    const walks2 = [];
    const ks2 = [];
    const wins2 = [];
    const Saves2 = [];
    const losses2 = [];
    const avg2 = [];
    names2.forEach((e) => {
        if (e.hits !== null) {
            hitsArr2.push(parseInt(e.hits))
        }
    });
    let totalHits2 = hitsArr2.reduce((acc, num) => {
        return acc + num
    }, 0);

    names2.forEach((e) => {
        if (e.homeRuns !== null) {
            homeRuns2.push(parseInt(e.homeRuns))
        }
    });
    let totalHomeruns2 = homeRuns2.reduce((acc, num) => {
        return acc + num
    }, 0);

    names2.forEach((e) => {
        if (e.walks !== null) {
            walks2.push(parseInt(e.walks))
        }
    });
    let totalWalks2 = walks2.reduce((acc, num) => {
        return acc + num
    }, 0);

    names2.forEach((e) => {
        if (e.avg !== null) {
            avg2.push(parseFloat(e.avg))
        }
    });
    let combindedAvg2 = avg2.reduce((acc, num) => {
        return acc + num / 7
    }, 0);

    names2.forEach((e) => {
        if (e.strikeouts !== null) {
            ks2.push(parseInt(e.strikeouts))
        }
    });
    let totalKs2 = ks2.reduce((acc, num) => {
        return acc + num
    }, 0);

    names2.forEach((e) => {
        if (e.wins !== null) {
            wins2.push(parseInt(e.wins))
        }
    });
    let totalWins2 = wins2.reduce((acc, num) => {
        return acc + num
    }, 0);

    names2.forEach((e) => {
        if (e.losses !== null) {
            losses2.push(parseInt(e.losses))
        }
    });
    let totalLosses2 = losses2.reduce((acc, num) => {
        return acc + num
    }, 0);

    names2.forEach((e) => {
        if (e.saves !== null) {
            Saves2.push(parseInt(e.saves))
        }
    });
    let totalSaves2 = Saves2.reduce((acc, num) => {
        return acc + num
    }, 0);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
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
        if (isMounted) {
            getPlayers().then((allPlayers) => {
                setPlayers(allPlayers);
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getLineups().then((allLineups) => {
                setLineups2(allLineups);
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getPlayers().then((allPlayers) => {
                setPlayers2(allPlayers);
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && lineup1.length !== 0) {
            getLineup(lineup1.id).then((lineup) => {
                setLineup1(lineup);
            })
        }
        return () => {
            isMounted = false;
        };
    }, [lineup1.id]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && lineup2.length !== 0) {
            getLineup(lineup2.id).then((lineup) => {
                setLineup2(lineup);
            })
        }
        return () => {
            isMounted = false;
        };
    }, [lineup2.id]);

    const handleChange = (e) => {
        setLineup1((prevState) => ({
            ...prevState,
            id: e.target.value
        }));
        getPlayers().then((allPlayers) => {
            setLineup1Players(allPlayers);
        })
    };

    const handleChange2 = (e) => {
        setLineup2((prevState) => ({
            ...prevState,
            id: e.target.value
        }));
        getPlayers().then((allPlayers) => {
            setLineup2Players(allPlayers);
        })
    };

    return (
        <>
        <h1 className="title">Compare Lineups</h1>
        <div className="Compare">
            <select
                className="dropDown"
                typeof="text"
                onChange={handleChange}
                value={lineups.id}
            >
                {' '}
                <option disabled selected defaultValue="Lineup 1">
                    Lineup 1
                </option>{' '}
                {lineups ? lineups.map((allLineups) => (
                    <option key={allLineups.id} value={allLineups.id}>
                        {allLineups.lineupName}
                    </option>
                )) : ('')}
            </select>
            <br />
            <select
                className="dropDown"
                typeof="text"
                onChange={handleChange2}
                value={lineups.id}
            >
                {' '}
                <option disabled selected>
                    Lineup 2
                </option>{' '}
                {lineups ? lineups.map((allLineups) => (
                    <option key={allLineups.id} value={allLineups.id}>
                        {allLineups.lineupName}
                    </option>
                )) : ('')}
            </select>
            <br />
            </div>
            <div className="compare-cards">
            <Card className="lineup-cards" style={{ width: '18rem' }}>
                <Card.Body>
                    {lineup1.length !== 0 ? (
                        <>
                            <h4>{lineup1.lineupName}</h4>
                            <p>C. {catcher[0]}</p>
                            <p>1B. {Fb[0]}</p>
                            <p>2B. {Sb[0]}</p>
                            <p>SS. {ss[0]}</p>
                            <p>3B. {thirdb[0]}</p>
                            <p>LF. {left[0]}</p>
                            <p>CF. {center[0]}</p>
                            <p>RF. {right[0]}</p>
                            <p>SP. {starter[0]}</p>
                            <p>CP. {closer[0]}</p>
                            <p>Hitting Stats -</p>
                            {combindedAvg >= combindedAvg2 ? (
                                <p className="avg-more">Combined Avg - {combindedAvg.toFixed(3)}</p>
                            ) : (
                                <p className="avg-less">Combined Avg - {combindedAvg.toFixed(3)}</p>
                            )}
                            {totalHits >= totalHits2 ? (
                                <p className="hits-more">Total Hits - {totalHits}</p>
                            ) : (
                                <p className="hits-less">Total Hits - {totalHits}</p>
                            )}
                            {totalHomeruns >= totalHomeruns2 ? (
                                <p className="hr-more">Total Homeruns - {totalHomeruns}</p>
                            ) : (
                                <p className="hr-less">Total Homeruns - {totalHomeruns}</p>
                            )}
                            <p>Pitching Stats -</p>
                            {totalWalks <= totalWalks2 ? (
                                <p className="bb-more">Total Walks - {totalWalks}</p>
                            ) : (
                                <p className="bb-less">Total Walks - {totalWalks}</p>
                            )}
                            {totalKs >= totalKs2 ? (
                                <p className="k-more">Total Strikeouts - {totalKs}</p>
                            ) : (
                                <p className="k-less">Total Strikeouts - {totalKs}</p>
                            )}
                            {totalWins >= totalWins2 ? (
                                <p className="w-more">Total Wins - {totalWins}</p>
                            ) : (
                                <p className="w-less">Total Wins - {totalWins}</p>
                            )}
                            {totalLosses <= totalLosses2 ? (
                                <p className="l-more">Total Losses - {totalLosses}</p>
                            ) : (
                                <p className="l-less">Total Losses - {totalLosses}</p>
                            )}
                            {totalSaves >= totalSaves2 ? (
                                <p className="s-more">Total Saves - {totalSaves}</p>
                            ) : (
                                <p className="s-less">Total Saves - {totalSaves}</p>
                            )}
                        </>
                    ) : (<h1>Select Lineup 1</h1>)}
                </Card.Body>
            </Card>
            <br />
            <Card className="lineup-cards" style={{ width: '18rem' }}>
                <Card.Body>
                    {lineup2.length !== 0 ? (
                        <>
                            <h4>{lineup2.lineupName}</h4>
                            <p>C. {catcher2[0]}</p>
                            <p>1B. {Fb2[0]}</p>
                            <p>2B. {Sb2[0]}</p>
                            <p>SS. {ss2[0]}</p>
                            <p>3B. {thirdb2[0]}</p>
                            <p>LF. {left2[0]}</p>
                            <p>CF. {center2[0]}</p>
                            <p>RF. {right2[0]}</p>
                            <p>SP. {starter2[0]}</p>
                            <p>CP. {closer2[0]}</p>
                            <p>Hitting Stats -</p>
                            {combindedAvg2 >= combindedAvg ? (
                                <p className="avg-more">Combined Avg - {combindedAvg2.toFixed(3)}</p>
                            ) : (
                                <p className="avg-less">Combined Avg - {combindedAvg2.toFixed(3)}</p>
                            )}
                            {totalHits2 >= totalHits ? (
                                <p className="hits-more">Total Hits - {totalHits2}</p>
                            ) : (
                                <p className="hits-less">Total Hits - {totalHits2}</p>
                            )}
                            {totalHomeruns2 >= totalHomeruns ? (
                                <p className="hr-more">Total Homeruns - {totalHomeruns2}</p>
                            ) : (
                                <p className="hr-less">Total Homeruns - {totalHomeruns2}</p>
                            )}
                            <p>Pitching Stats -</p>
                            {totalWalks2 <= totalWalks ? (
                                <p className="bb-more">Total Walks - {totalWalks2}</p>
                            ) : (
                                <p className="bb-less">Total Walks - {totalWalks2}</p>
                            )}
                            {totalKs2 >= totalKs ? (
                                <p className="k-more">Total Strikeouts - {totalKs2}</p>
                            ) : (
                                <p className="k-less">Total Strikeouts - {totalKs2}</p>
                            )}
                            {totalWins2 >= totalWins ? (
                                <p className="w-more">Total Wins - {totalWins2}</p>
                            ) : (
                                <p className="w-less">Total Wins - {totalWins2}</p>
                            )}
                            {totalLosses2 <= totalLosses ? (
                                <p className="l-more">Total Losses - {totalLosses2}</p>
                            ) : (
                                <p className="l-less">Total Losses - {totalLosses2}</p>
                            )}
                            {totalSaves2 >= totalSaves ? (
                                <p className="s-more">Total Saves - {totalSaves2}</p>
                            ) : (
                                <p className="s-less">Total Saves - {totalSaves2}</p>
                            )}
                        </>
                    ) : (<h1>Select Lineup 2</h1>)}
                </Card.Body>
            </Card>
            </div>
            </>
    )

}