import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import flex from '../../assets/flex.png';

const StartScreen = () => {
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch({ type: 'screen', payload: 'title' });
  }

  return(
    <div className='start-screen'>
      <img className='start-screen-image' src={flex} alt='flexing gundam'/>
      <button className='start-screen-button' onClick={handleStart}>START</button>
    </div>
  )
};

export default StartScreen;