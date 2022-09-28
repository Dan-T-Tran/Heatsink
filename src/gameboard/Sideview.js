import { useSelector, useDispatch } from 'react-redux';

const Sideview = () => {
  const health = useSelector((state) => state.health);
  const score = useSelector((state) => state.score);

  const renderHealthBar = () => {
    let gradient = `linear-gradient(to right, teal, teal ${health}%, gray ${health}%)`;
    let background = { background: gradient };

    return <div style = {background} className = 'healthBar' ></div>
  }

  return (
    <div id='sideview'>
      <h1>Health: {health}</h1>
      {renderHealthBar()}
      <h1>Score: {score}</h1>
    </div>
  );
};

export default Sideview;

//transparent component
//should render at the right side of the parent game component