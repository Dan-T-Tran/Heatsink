import Phaser from 'phaser';
import EnemyBullet from './EnemyBullet.js';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.group.add(this);
    this.setVelocityY(300);
    this.setAcceleration(0, -200);
    this.health = config.health;
    this.bounce = 50;
    this.leave = 400;

    this.reload = 80;
  }

  shoot(config) {
    if (this.reload > 0) {
      this.reload--;
      return;
    }
    this.reload = 500;
    let bullet = new EnemyBullet({ ...config, x: this.x, y: this.y });
    bullet.setVelocityY(300);
    // bullet.destroy();
    return bullet;
  }

  move() {
    let direction;
    if (this.x < this.scene.sys.game.scale.gameSize._width / 2) {
      direction = -1;
    } else {
      direction = 1;
    }
    // console.log(this.scene.sys.game.scale.gameSize._width);
    if (this.body.velocity.y < 0 && this.body.acceleration.y < 0) {
      this.setAcceleration(0, -30);
      this.bounce--;
    }
    if (this.body.velocity.y < 0 && this.bounce <= 0) {
      this.setAcceleration(0, 0);
    }
    if (this.body.acceleration.y === 0 && this.leave > 0) {
      this.leave--;
    }
    if (this.leave <= 0) {
      this.setAcceleration(20 * direction, 0);
    }
  }

};

export default Enemy;