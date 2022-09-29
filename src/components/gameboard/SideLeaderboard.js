import { useState, useEffect } from 'react';
import axios from 'axios';

const SideLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await axios.get('/heatsink')
      console.log(results);
      setLeaderboard(results.results);
    }
    fetchData();

  }, [])

  return (
    <>

    </>
  )
};

export default SideLeaderboard;
