import { createStore } from 'redux';

const reducerFn = (state = {
  score: 0,
  health: 100,
  heat: 0,
  cooldown: 100,
  difficulty: 1
}, action) => {
  if (action.type === 'initialize') {
    return ({...state,
      score: 0,
      health: 100,
      heat: 0,
      cooldown: 100,
      difficulty: 1,
    });
  }

  if (action.type === 'SCORE') {
    return ({...state, score: state.score + 10});
  }

  if (action.type === 'HURT') {
    return ({...state, health: state.health - 10 > 0 ? state.health - 10 : 0});
  }

  if (action.type === 'cooldown') {
    return ({...state, cooldown: state.cooldown - 0.1 > 0 ? state.cooldown - 0.1 : 0});
  }

  return state;

}

const store = createStore(reducerFn);

export default store;