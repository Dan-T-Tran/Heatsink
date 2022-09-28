import { createStore } from 'redux';

const reducerFn = (state = {
  score: 0,
  health: 100,
  cooldown: 100
}, action) => {

  if (action.type === 'SCORE') {
    return ({...state, score: state.score + 10});
  }

  if (action.type === 'HURT') {
    return ({...state, health: state.health - 10 > 0 ? state.health - 10 : 0});
  }

  return state;

}

const store = createStore(reducerFn);

export default store;