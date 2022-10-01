import { createStore } from 'redux';

const reducerFn = (state = {
  score: 0,
  health: 100,
  heat: 3,
  cooldown: 0,
  difficulty: 1,
  gameState: null,
}, action) => {
  if (action.type === 'initialize') {
    return ({...state,
      score: 0,
      health: 100,
      heat: 3,
      cooldown: 0,
      difficulty: 1,
      volume: 1,
      gameState: 'game',
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
    let cooldown = state.cooldown - (0.5 - ((0.3 * ((state.heat - 1) / 2)) ** 1.2));
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
    let heat = state.heat;
    let health = state.health;
    health = Math.floor(health + (40 * (heat - 1)));
    if (health > 100) {
      health = 100;
    }
    return ({...state, heat: 1, health: health});
  }

  if (action.type === 'difficulty') {
    return ({...state, difficulty: state.difficulty + 1 > 99 ? 99 : state.difficulty + 1});
  }

  if (action.type === 'screen') {
    return ({...state, gameState: action.payload});
  }

  if (action.type === 'exit') {
    return ({...state, gameState: null});
  }

  return state;
}

const store = createStore(reducerFn);

export default store;