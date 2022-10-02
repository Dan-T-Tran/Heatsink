import Bomb from './Bomb.js';
import Phaser from 'phaser';

class HomingBall extends Bomb {
  constructor(config) {
    super(config);
    this.heat = config.heat;
    this.damage = 15 * (this.heat ** 1.035);
    this.setTexture('bigBall');
    this.body.isCircle = true;
    this.body.sourceWidth = 45;
    this.body.sourceHeight = 45;
    this.scale = 1.4 * ((this.heat ** 1.4) / this.heat);
    this.degree = 0;
    this.prep = 70;
    this.refresh = 20;
  }

  preUpdate(time, delta) {
    if (this.prep > 0) {
      this.prep--;
      return;
    }
    if (this.refresh > 0) {
      this.refresh--;
      return;
    }
    this.refresh = 20;
    this.degree += 5;
    let closestEnemy = this.scene.physics.closest(this, this.scene.enemy.children.entries);
    if (!closestEnemy) {
      return;
    }
    let angle = Phaser.Math.Angle.Between(this.x, this.y, closestEnemy.x, closestEnemy.y);
    this.scene.physics.velocityFromRotation(angle, 400, this.body.velocity);
    this.setVelocityX(this.body.velocity.x * 2);
    this.setVelocityY(this.body.velocity.y * 2);
    this.angle = this.degree;
  };
}

export default HomingBall;