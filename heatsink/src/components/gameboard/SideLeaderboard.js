import { useState, useEffect } from 'react';
import axios from 'axios';

const SideLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await axios.get('/heatsink')
      setLeaderboard(results.data);
    }
    fetchData();

  }, [])

  const renderLeaderboard = () => {
    if (leaderboard.length === 0) {
      return null;
    }
    let topPlayers = [];
    for (let i = 0; i < 10; i++) {
      if (!leaderboard[i] || !leaderboard[i].name || !leaderboard[i].score) {
        // topPlayers = null;
        break;
      }
      topPlayers.push(<h3 key = {i + leaderboard[i].score}>{i + 1} | {leaderboard[i].name} - {leaderboard[i].score}</h3>)
    }
    return topPlayers;
  }

  return (
    <>
      <h1><u>Leaderboard</u></h1>
      {renderLeaderboard()}
    </>
  )
};

export default SideLeaderboard;
