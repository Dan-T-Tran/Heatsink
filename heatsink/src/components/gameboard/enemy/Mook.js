import Enemy from './Enemy.js';
import MookBullet from './MookBullet.js';
import store from '../../../store';

class Mook extends Enemy {
  constructor(config) {
    super(config);
    this.setTexture('zaku');
    this.health = config.health + Math.floor(((store.getState().difficulty * 2) ** 1.2));
    this.score = 200;
    this.weight = 1;
    this.defaultReload = 80;
    this.reload = this.defaultReload;
    this.setVelocityY(300);
    this.setAcceleration(0, -200);
    this.aim = false;
    this.direction = config.x < this.scene.sys.game.scale.gameSize._width / 2 ? 1 : -1
    this.bounce = 50;
    this.leave = 400;
  }

  shoot() {
    if (
      this.x < -100 ||
      this.x > this.scene.sys.game.scale.gameSize._width + 100 ||
      this.y < -300 ||
      this.y > this.scene.sys.game.scale.gameSize._height + 100
      )
    {
      this.destroy();
      return;
    }
    if (this.body.velocity.x === 0 && this.bounce <= 0) {
      this.aim = true;
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