import { createStore } from 'redux';

const reducerFn = (state = {
  score: 0,
  health: 100,
  heat: 1,
  cooldown: 0,
  difficulty: 1
}, action) => {
  if (action.type === 'initialize') {
    return ({...state,
      score: 0,
      health: 100,
      heat: 1,
      cooldown: 0,
      difficulty: 1,
      viewScreen: 'game',
    });
  }

  if (action.type === 'score') {
    return ({...state, score: state.score + 10});
  }

  if (action.type === 'hurt') {
    let health = state.health;
    let damage = action.payload;
    if (health - damage > 0) {
      health = Math.floor(health - damage);
    } else {
      health = 0;
    }
    return ({...state, health: health});
  }

  if (action.type === 'cooldown') {
    return ({...state, cooldown: state.cooldown - 0.1 > 0 ? state.cooldown - 0.1 : 0});
  }

  if (action.type === 'resetCooldown') {
    return ({...state, cooldown: 100});
  }

  if (action.type === 'block') {
    let heat = state.heat;
    if (heat + action.payload >= 3) {
      heat = 3;
    } else {
      heat = heat + action.payload;
    }
    return ({...state, heat: heat});
  }

  return state;

}

const store = createStore(reducerFn);

export default store;