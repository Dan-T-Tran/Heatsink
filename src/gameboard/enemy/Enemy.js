import Phaser from 'phaser';
import EnemyBullet from './EnemyBullet.js';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(config, group) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    group.add(this);
    this.setVelocityY(40);
    this.setAcceleration(0, -10);
    console.log(this)

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

  move() {
    // console.log(this.scene.sys.game.scale.gameSize._width);
    if (this.body.velocity.y < 0) {
      if (this.x < this.scene.sys.game.scale.gameSize._width / 2) {
        this.setAcceleration(-20, 0);
      } else {
        this.setAcceleration(20, 0);
      }
    }
  }
};

export default Enemy;