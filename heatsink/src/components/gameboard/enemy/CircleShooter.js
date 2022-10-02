import Enemy from './Enemy.js';
import CircleShooterBullet from './CircleShooterBullet.js';

class CircleShooter extends Enemy {
  constructor(config) {
    super(config);
    this.setPosition(this.x, this.y);
    this.setTexture('blueZaku');
    this.score = 1000;
    this.weight = 2;
    this.defaultReload = 250;
    this.reload = this.defaultReload;
    this.health = 15 + ((config.difficulty * 2) ** 1.2);
    this.x = (Math.random() * 230 + 270);
    this.y = (Math.random() * -50 - 40);
    this.setVelocity(0, 250)
    this.setAcceleration(0, -100);
    this.setPosition(this.x, this.y);
    this.timer = 500;
  }

  shoot() {
    if (this.y < -200) {
      this.destroy();
      return;
    }
    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j <= 16; j++) {
        new CircleShooterBullet({ scene: this.scene, x: this.x, y: this.y, angle: (Math.PI / 8) * j, multiplier: i })
      }
    }
  }

  preUpdate(time, delta) {
    if (this.body.velocity.y <= 0 && this.timer > 0) {
      this.timer--;
      this.setVelocity(0, 0);
      this.setAcceleration(0, 0);
      return;
    } else {
      this.setAcceleration(0, -120);
    }

    this.reload--;
    if (this.reload <= 0) {
      this.reload = this.defaultReload;
      this.shoot();
    }
  };
}

export default CircleShooter;