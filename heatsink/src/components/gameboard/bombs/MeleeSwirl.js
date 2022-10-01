import Phaser from 'phaser';
import Bomb from './Bomb';

class MeleeSwirl extends Bomb {
  constructor(config) {
    super(config);
      this.heat = config.heat;
      this.damage = 35 * (this.heat ** 1.035);
      this.scaleX = config.keyDown ? 1.5 * (config.heat ** 2 / config.heat) : 1.5;
      this.setTexture('melee');
      this.body.sourceWidth = 75;
      this.body.sourceHeight = 41;
      this.increment = Math.PI / 36 * (config.direction === 'left' ? -1 : 1);
      this.degree = config.half ? Math.PI : 0;
  }

  preUpdate(time, delta) {
    // Bruh I dunno how to do trig
    this.degree += this.increment;
    this.setVelocityX(Math.cos(this.degree) * 1200);
    this.setVelocityY(Math.sin(this.degree) * 1200);
    this.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, this.x + this.body.velocity.x, this.y + this.body.velocity.y)) + 90;
  }
};

export default MeleeSwirl;