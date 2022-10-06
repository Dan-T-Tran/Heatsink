import { useState, useEffect } from 'react';
import axios from 'axios';

const SideLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await axios.get(process.env.REACT_APP_AWS_URI)
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
      topPlayers.push(<h4 key = {i + leaderboard[i].score}>{i + 1} | {leaderboard[i].name} - {leaderboard[i].score}</h4>)
    }
    return topPlayers;
  }

  return (
    <>
      <h2><u>Leaderboard</u></h2>
      {renderLeaderboard()}
    </>
  )
};

export default SideLeaderboard;
