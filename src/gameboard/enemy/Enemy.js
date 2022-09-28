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
    this.setVelocityY(300);
    this.setAcceleration(0, -200);
    console.log(this)

    this.reload = 80;
  }

  shoot(config, group) {
    if (this.reload > 0) {
      this.reload--;
    } else {
      this.reload = 500;
      let bullet = new EnemyBullet({ scene: config.scene, x: this.x, y: this.y, key: config.key }, group);
      bullet.setVelocityY(30);
      return bullet;
    }
  }

  move() {
    let direction;
    if (this.x < this.scene.sys.game.scale.gameSize._width / 2) {
      direction = -1;
    } else {
      direction = 1;
    }
    // console.log(this.scene.sys.game.scale.gameSize._width);
    if (this.body.velocity.y < 0) {
      this.setAcceleration(20 * direction, 0);
    }
  }

};

export default Enemy;