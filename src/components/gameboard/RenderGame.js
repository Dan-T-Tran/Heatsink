import Phaser from 'phaser';
import MainScene from './MainScene.js';

const RenderGame = () => {

  const config = {
    type: Phaser.AUTO,
    parent: 'board',
    width: 720,
    height: 960,
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      }
    },
    scene: [MainScene],
  };
  const game = new Phaser.Game(config);
  return game;
}

export default RenderGame;

// KEY CODES
// https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js