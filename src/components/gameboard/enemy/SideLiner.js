import Enemy from './Enemy.js';
import SideLinerBullet from './SideLinerBullet.js';

class SideLiner extends Enemy {
  constructor(config) {
    super(config);
    this.setPosition(this.x, this.y);
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.setTexture(this.direction === 1 ? 'zakuRight' : 'zakuLeft');
    this.score = 450;
    this.weight = 0.5;
    this.defaultReload = 220;
    this.reload = this.defaultReload;
    this.health = 15 + ((config.difficulty * 2) ** 1.2);
    this.x = this.direction === 1 ? Math.random() * 80 + 20 : Math.random() * 80 + 620;
    this.y = Math.random() * -40 - 60;
    this.setPosition(this.x, this.y);
    this.setAcceleration(0, 300);
    this.timer = 300;
    this.down = true;
    this.acceleration = 20;
  }

  shoot() {
    new SideLinerBullet({ scene: this.scene, x: this.x, y: this.y, direction: this.direction, multiplier: 1 })
    new SideLinerBullet({ scene: this.scene, x: this.x, y: this.y, direction: this.direction, multiplier: 2 })
    new SideLinerBullet({ scene: this.scene, x: this.x, y: this.y, direction: this.direction, multiplier: 3 })
  }

  despawn() {
    if (
      this.y < -200 ||
      this.y > this.scene.sys.game.scale.gameSize._height + 200
      )
    {
      this.destroy();
      return;
    }
  }

  preUpdate(time, delta) {
    this.reload--;
    if (this.reload <= 0) {
      this.reload = this.defaultReload;
      this.shoot();
    }
    if (this.timer < 0) {
      this.timer = 300;
      this.down = !this.down;
    } else {
      this.timer--;
      return;
    }
    this.acceleration += 30;
    let direction = this.down ? 1 : -1;
    this.setAcceleration(0, (600 + this.acceleration) * direction);
    this.despawn();
  };
}

export default SideLiner;