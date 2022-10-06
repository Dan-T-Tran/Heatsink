import Bullet from './Bullet.js';
import Phaser from 'phaser';

class HomingBullet extends Bullet {
  constructor(config) {
    super(config);
    this.setTexture('missile');
    this.body.sourceWidth = 9;
    this.body.sourceHeight = 16;
    this.scale = config.keydown ? 1.75 : 1;
    this.damage = config.keyDown ? 9 : 6;
    this.acceleration = 0;
    this.prep = true;
    this.stop = false;
    config.scene.time.addEvent({
      delay: 450,
      callback: (() => this.prep = false)
    })
    config.scene.time.addEvent({
      delay: 1450,
      callback: (() => this.stop = true)
    })
  }

  preUpdate(time, delta) {
    if (this.prep || this.stop) {
      return;
    }

    this.acceleration++;
    let closestEnemy = this.scene.physics.closest(this, this.scene.enemy.children.entries);
    if (!closestEnemy) {
      return;
    }
    let angle = Phaser.Math.Angle.Between(this.x, this.y, closestEnemy.x, closestEnemy.y);
    this.scene.physics.velocityFromRotation(angle, 400, this.body.velocity);
    this.setVelocityX(this.body.velocity.x * ((this.acceleration ** 1.15) / this.acceleration))
    this.setVelocityY(this.body.velocity.y * ((this.acceleration ** 1.15) / this.acceleration))
    this.angle = Phaser.Math.RadToDeg(angle) + 90;
  };
};

export default HomingBullet;