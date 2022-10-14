import Enemy from './Enemy.js';
import ConvergeBossBullet from './ConvergeBossBullet.js';

class ConvergeBoss extends Enemy {
  constructor(config) {
    super(config);
    this.x = (Math.random() * 100 + 300);
    this.y = -300;
    this.setPosition(this.x, this.y);
    this.setTexture('smallShip');
    this.isBoss = true;
    this.health = this.health = 300 + (config.difficulty ** 1.35);
    this.score = 4500;
    this.weight = 5;
    this.body.sourceWidth = 47;
    this.body.sourceHeight = 48;
    this.scale = 1.5;
    this.defaultReload = 50;
    this.reload = this.defaultReload;
    this.setVelocity(0, 400);
    this.setAcceleration(0, -150);
    this.prep = 300;
    this.accelerator = 0;
    this.flip = 1;

  }

  shoot() {
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: 500, dy: 50, direction: -1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: 430, dy: 120, direction: -1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: 360, dy: 190, direction: -1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: 290, dy: 260, direction: -1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: 220, dy: 350, direction: -1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: 150, dy: 420, direction: -1 });

    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: -500, dy: 50, direction: 1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: -430, dy: 120, direction: 1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: -360, dy: 190, direction: 1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: -290, dy: 260, direction: 1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: -220, dy: 350, direction: 1 });
    new ConvergeBossBullet({ scene: this.scene, x: this.x, y: this.y, dx: -150, dy: 420, direction: 1 });
  }

  preUpdate(time, delta) {
    if (this.body.velocity.y > 5) {
      return;
    }
    if (this.prep >= 0) {
      this.prep--;
      this.setVelocity(0, 0);
      this.setAcceleration(0, 0);
      return;
    }

    this.reload--;
    if (this.reload <= 0) {
      this.reload = this.defaultReload;
      this.shoot();
    }
  };
}

export default ConvergeBoss;