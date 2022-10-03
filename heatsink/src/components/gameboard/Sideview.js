import { useSelector } from 'react-redux';
import SideLeaderboard from './SideLeaderboard.js';

const Sideview = () => {
  const health = useSelector((state) => state.health);
  const score = useSelector((state) => state.score);
  const kills = useSelector((state) => state.kills);
  const heat = useSelector((state) => state.heat);
  const weapon = useSelector((state) => state.weapon);
  const damageUp = useSelector((state) => state.damageUp);
  const difficulty = useSelector((state) => state.difficulty);

  const renderScore = () => {
    let scoreStr = Math.floor(score).toString();
    let result = `${'0'.repeat(15 - scoreStr.length)}${scoreStr}`
    return result;
  }

  const renderHealthBar = () => {
    let gradient = `linear-gradient(to right, teal, teal ${health}%, gray ${health}%)`;
    let background = { background: gradient };

    return <div style = {background} className = 'healthBar' ></div>
  }

  return (
    <div id='sideview'>
      <h2 style={{marginBottom: 0}}><u>Score</u></h2>
      <h2 style={{marginTop: 0}}>{renderScore()}</h2>
      <h2>Kills: {kills}</h2>
      <h2 style={{marginBottom: '2px'}}>Health: {health}</h2>
      {renderHealthBar()}
      <h2>Heat: {Math.floor(heat * 100)}%</h2>
      <h2>Difficulty: {difficulty}</h2>
      <h2>Weapon: {weapon}</h2>
      <h2>Boosters: {damageUp}</h2>
      <SideLeaderboard />
    </div>
  );
};

export default Sideview;
