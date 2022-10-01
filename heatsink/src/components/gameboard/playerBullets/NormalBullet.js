import Phaser from 'phaser';
import Bullet from './Bullet.js';

class NormalBullet extends Bullet {
  constructor(config) {
    super(config);
    this.setTexture('bullet');
    this.acceleration = 0;
    this.damage = config.keyDown ? 7 : 4;
  }

  preUpdate(time, delta) {
    this.acceleration -= 25;
    this.setAcceleration(0, this.acceleration);
    this.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, this.x + this.body.velocity.x, this.y + this.body.velocity.y)) + 90;
  }
}

export default NormalBullet;