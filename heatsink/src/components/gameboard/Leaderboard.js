import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Leaderboard = (props) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.titleBgm.paused) {
      props.titleBgm.play();
    }

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
    for (let i = page * 10; i < page * 10 + 10; i++) {
      console.log(i);
      if (!leaderboard[i] || !leaderboard[i].name) {
        // topPlayers = null;
        break;
      }
      topPlayers.push(<h3 key = {i + leaderboard[i].score}>{i + 1} | {leaderboard[i].name} - {leaderboard[i].score}</h3>)
    }
    return topPlayers;
  }

  const handleButton = () => {
    dispatch({type: 'screen', payload: 'title'});
  }

  const handlePage = (e) => {
    if (e.target.name === 'forward') {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  }

  return (
    <div className='leaderboard'>
      <div className='leaderboard-details'>
        <h1><u>Top {(page + 1) * 10} players</u></h1>
        {renderLeaderboard()}
      </div>
      <div className='leaderboard-buttons'>
        {page > 0 && <button className='leaderboard-button' name='back' onClick={handlePage}>Previous 10</button>}
        {page <= 0 && <button className='leaderboard-button'>At first page</button>}
        <button className='leaderboard-button' onClick={handleButton}>Back to Title</button>
        {(page + 1) * 10 < leaderboard.length && <button className='leaderboard-button' name='forward' onClick={handlePage}>Next 10</button>}
        {(page + 1) * 10 > leaderboard.length && <button className='leaderboard-button'>At last page</button>}
      </div>
    </div>
  )
};

export default Leaderboard;
