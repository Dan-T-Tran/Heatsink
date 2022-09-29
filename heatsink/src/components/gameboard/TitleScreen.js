import { useDispatcher } from 'react-redux';

const TitleScreen = () => {

  const handleButton = (e) => {
    console.log(e.target.name);
  }

  return (
    <div className='title-buttons'>
      <button className='title-button' name='game'>Start</button>
      <button className='title-button' name='leaderboard'>Leaderboard</button>
      <button className='title-button' name='exit'>Exit</button>
    </div>
  )
};

export default TitleScreen;
