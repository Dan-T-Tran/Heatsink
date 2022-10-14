import { createStore } from 'redux';

const reducerFn = (state = {
  score: 0,
  health: 100,
  kills: 0,
  heat: 1,
  cooldown: 0,
  difficulty: 1,
  weapon: 'Normal',
  damageUp: 0,
  volume: 1,
  gameState: null,
}, action) => {
  if (action.type === 'initialize') {
    return ({...state,
      score: 0,
      health: 100,
      kills: 0,
      heat: 1,
      cooldown: 0,
      difficulty: 1,
      weapon: 'Normal',
      damageUp: 0,
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

  if (action.type === 'weaponSwitch') {
    return ({...state, weapon: action.payload});
  }

  if (action.type === 'damageUp') {
    return ({...state, damageUp : state.damageUp + 1 })
  }

  if (action.type === 'kill') {
    return ({...state, kills: state.kills + 1})
  }

  if (action.type === 'volume') {
    return ({...state, volume: action.payload});
  }

  return state;
}

const store = createStore(reducerFn);

export default store;