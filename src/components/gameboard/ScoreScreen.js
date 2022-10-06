import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import audio from '../../assets/gameOver.mp3'

const ScoreScreen = () => {
  const [name, setName] = useState('');
  const score = useSelector((state) => state.score);
  const kills = useSelector((state) => state.kills);
  const difficulty = useSelector((state) => state.difficulty);
  const dispatch = useDispatch();
  const [pointer, setPointer] = useState([0, 0]);
  const [gameOver] = useState(new Audio(audio));
  const [tip, setTip] = useState(0);
  const [fail, setFail] = useState(false);

  const tips = [
    `Your blocking cooldown increases as you gain heat.`,
    `You only need to make small movements to dodge.`,
    `Some weapons are better for certain situations than others.`,
    `Your bombs destroy any bullets they contact.`,
    `Your shield doesn't protect your back. Be careful about backing up into bullets!`,
    `You need at least 120% heat to shoot a bomb.`,
    `Bigger enemies take extra damage from bombs.`,
    `Boosters also reduce the damage you take.`
  ];

  useEffect(() => {
    gameOver.play();
    gameOver.addEventListener('ended', () => {
      gameOver.currentTime = 0;
      gameOver.play();
    }, false);
    let randomizer = Math.floor(Math.random() * tips.length);
    setTip(randomizer);

    return function cleanUp() {
      gameOver.currentTime = 0;
      gameOver.pause();
    }
  }, [])

  const handleChange = (e) => {
    setName(e.target.value.toString());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.name === 'back') {
      dispatch({type: 'screen', payload: 'title'});
      return;
    }

    const data = {
      name: name,
      score: score,
      kills: kills,
      date: new Date(),
      difficulty: difficulty
    }

    await axios.post(`http://54.215.58.97:5000/heatsink`, data)
    .then((response) => dispatch({ type: 'screen', payload: 'leaderboard' }))
    .catch((err) => {
      setFail(true);
      // console.log(err)
    });
  };

  // Maybe try to set up a keyboard score submit eventually?
  const renderKeyboard = () => {
    const keyboard = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'enter'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
  }

  return (
    <>
    <div className='score-overlay'></div>
    <div className='score-screen'>
      <div className='score-submit-details'>
        <h1>GAME OVER</h1>
        <h2>Your score: {score}</h2>
        <input type='text' className='score-screen-input' onChange={handleChange} maxLength={15} placeholder='Enter name'></input>
        <h3 style={{marginTop: '20px'}}><u>Tip</u></h3>
        <p>{tips[tip]}</p>
        {fail && <h4 style={{color: 'red'}}>Failed to submit score</h4>}
      </div>
      <div className='score-submit-buttons'>
        <button type='submit' className='score-submit-button' name='forward' onClick={handleSubmit}>Submit</button>
        <button type='submit' className='score-submit-button' name='back' onClick={handleSubmit}>Back to Title</button>
      </div>
    </div>
    </>
  )
};

export default ScoreScreen;
