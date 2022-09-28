import Phaser from 'phaser';
import EnemyBullet from './EnemyBullet.js';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(config, group) {
    super(config.scene, config.x, config.y, config.key);
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    group.add(this);

    this.timer = 100;
  }

  shoot(config, group) {
    if (this.timer > 0) {
      this.timer--;
    } else {
      this.timer = 500;
      let bullet = new EnemyBullet({ scene: config.scene, x: this.x, y: this.y, key: config.key }, group);
      bullet.setVelocityY(10);
      return bullet;
    }
  }
};

export default Enemy;