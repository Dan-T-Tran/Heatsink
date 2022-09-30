import Phaser from 'phaser';
import store from '../../../store';

class BigBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    let state = store.getState();
    this.bigBullet = true;
    this.damage = 50 * (state.heat ** 1.25);
    this.scale = 4 * (1.05 * ((state.heat ** 2) / state.heat));
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.group.add(this);
    this.setVelocityY(-500);
    config.scene.time.addEvent({
      delay: 5000,
      callback: (() => this.destroy())
    });
  };
};

export default BigBullet;

//Phaser.GameObjects.Sprite