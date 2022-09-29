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
    let score = state.score;
    if (state.score + action.payload > 999999999999999) {
      score = 999999999999999;
    } else {
      score = state.score + action.payload;
    }
    return ({...state, score: score});
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
    let cooldown = state.cooldown - (0.3 - ((0.2 * ((state.heat - 1) / 2)) ** 1.1));
    if (cooldown < 0) {
      cooldown = 0;
    }
    return ({...state, cooldown: cooldown});
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

  if (action.type === 'bomb') {
    return ({...state, heat: 1});
  }

  if (action.type === 'difficulty') {
    return ({...state, difficulty: state.difficulty + 1 > 99 ? 99 : state.difficulty + 1});
  }

  return state;

}

const store = createStore(reducerFn);

export default store;