import { createStore } from 'redux';

const reducerFn = (state = {
  counter: 0,
  score: 0,
  health: 100,
  cooldown: 100
}, action) => {

  if (action.type === 'INC') {
    return {counter: state.counter + 1};
  }

  return state;

}

const store = createStore(reducerFn);

export default store;