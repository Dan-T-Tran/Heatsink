import Phaser from 'phaser';
import Bomb from './Bomb.js';

class BigBullet extends Bomb {
  constructor(config) {
    super(config);
    this.heat = config.heat;
    this.damage = 50 * (this.heat ** 1.25);
    this.scale = 4 * (1.05 * ((this.heat ** 2) / this.heat));
    this.setTexture('bullet');
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.direction = config.direction;
    this.body.sourceWidth = 9;
    this.body.sourceHeight = 15;
  };

  preUpdate(time, delta) {
    this.accelerationY -= 5;
    if (this.direction === 'left') {
      this.accelerationX += 10 * (this.heat ** 1.5 / this.heat);
    }

    if (this.direction === 'right') {
      this.accelerationX -= 10 * (this.heat ** 1.5 / this.heat);
    }

    this.setAcceleration(this.accelerationX, this.accelerationY);
    this.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, this.x + this.body.velocity.x, this.y + this.body.velocity.y)) + 90;
  };
};

export default BigBullet;