import { useSelector } from 'react-redux';
import SideLeaderboard from './SideLeaderboard.js';

const Sideview = () => {
  const health = useSelector((state) => state.health);
  const score = useSelector((state) => state.score);
  const heat = useSelector((state) => state.heat);
  // const cooldown = useSelector((state) => state.cooldown);
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
      <h1>Score: {renderScore()}</h1>
      <h1>Health: {health}</h1>
      {renderHealthBar()}
      <h1>Heat: {Math.floor(heat * 100)}%</h1>
      {/* <h1>Cooldown: {Math.floor(cooldown)}</h1> */}
      <h1>Difficulty: {difficulty}</h1>
      <SideLeaderboard />
    </div>
  );
};

export default Sideview;

//transparent component
//should render at the right side of the parent game component