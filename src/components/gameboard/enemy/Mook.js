import Enemy from './Enemy.js';
import MookBullet from './MookBullet.js';

class Mook extends Enemy {
  constructor(config) {
    super(config);
    this.setPosition(this.x, this.y);
    this.setTexture('zaku');
    this.health = 20 + ((config.difficulty * 2) ** 1.2);
    this.score = 200;
    this.weight = 0;
    this.defaultReload = 80;
    this.reload = this.defaultReload;
    this.setVelocityY(300);
    this.setAcceleration(0, -200);
    this.aim = true;
    this.direction = config.x < this.scene.sys.game.scale.gameSize._width / 2 ? 1 : -1
    this.bounce = 50;
    this.leave = 400;
    config.scene.time.addEvent({
      delay: 2500,
      callback: (() => this.aim = false)
    })
  }

  shoot() {
    if (
      this.x < -100 ||
      this.x > this.scene.sys.game.scale.gameSize._width + 100
      )
    {
      this.destroy();
      return;
    }
    new MookBullet({ scene: this.scene, x: this.x, y: this.y, aim: this.aim });
  }

  preUpdate(time, delta) {
    if (this.body.velocity.y < 0 && this.body.acceleration.y < 0) {
      this.setAcceleration(0, -30);
      this.bounce--;
    }
    if (this.body.velocity.y < 0 && this.bounce <= 0) {
      this.defaultReload = 200;
      this.setAcceleration(0, 0);
    }
    if (this.body.acceleration.y === 0 && this.leave > 0) {
      this.leave--;
    }
    if (this.leave <= 0 && this.body.acceleration.x === 0) {
      this.defaultReload = 80;
      this.setAcceleration(20 * this.direction, 0);
    }

    this.reload--;
    if (this.reload <= 0) {
      this.reload = this.defaultReload;
      this.shoot();
    }
  }

};

export default Mook;