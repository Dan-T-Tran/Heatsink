import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const Leaderboard = (props) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.titleBgm.paused) {
      props.titleBgm.play();
    }

    async function fetchData() {
      const results = await axios.get(`http://ec2-54-215-58-97.us-west-1.compute.amazonaws.com:5000/heatsink`)
      if (!results) {
        setFailed(true);
      } else {
        setLeaderboard(results.data);
      }
      setLoading(false);
    }
    fetchData();
  }, [])

  const renderLeaderboard = () => {
    if (leaderboard.length === 0) {
      return null;
    }
    let topPlayers = [];
    for (let i = page * 10; i < page * 10 + 10; i++) {
      if (!leaderboard[i] || !leaderboard[i].name) {
        // topPlayers = null;
        break;
      }
      let date = leaderboard[i].date;
      topPlayers.push(
        <tbody key={i+leaderboard[i].score}>
          <tr>
            <td>{i + 1}</td>
            <td>{leaderboard[i].name}</td>
            <td>{leaderboard[i].score}</td>
            <td>{leaderboard[i].kills}</td>
            <td>{leaderboard[i].difficulty}</td>
            <td>{moment(date).format('MM[/]DD[/]YY')}</td>
          </tr>
        </tbody>
      )
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
        {loading && <h1>Loading top players. . .</h1>}
        {failed && <h1>Failed to retrieve top players.</h1>}
        {!loading && <h1><u>Top {(page + 1) * 10} players</u></h1>}
        {!loading &&
          <table className='leaderboard-table'>
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Score</th>
                <th>Kills</th>
                <th>Difficulty</th>
                <th>Date</th>
              </tr>
            </thead>
            {renderLeaderboard()}
          </table>
        }
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
