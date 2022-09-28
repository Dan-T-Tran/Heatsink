import { createStore } from 'redux';

const reducerFn = (state = {
  counter: 0,
  score: 0,
  health: 100,
  cooldown: 100
}, action) => {

  if (action.type === 'INC') {
    return ({...state, counter: state.counter + 1});
  }

  if (action.type === 'SCORE') {
    return ({...state, score: state.score + 10});
  }

  if (action.type === 'HURT') {
    return ({...state, health: state.health - 10});
  }

  return state;

}

const store = createStore(reducerFn);

export default store;