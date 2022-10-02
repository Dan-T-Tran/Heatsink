import Enemy from './Enemy.js';
import SpiralBossBullet from './SpiralBossBullet.js';

class SpiralBoss extends Enemy {
  constructor(config) {
    super(config);
    this.x = (Math.random() * 100 + 300);
    this.y = -300;
    this.setPosition(this.x, this.y);
    this.setTexture('bigShip');
    this.isBoss = true;
    this.health = this.health = 250 + ((config.difficulty * 2) ** 1.5);
    this.score = 10000;
    this.weight = 10;
    this.defaultReload = 15;
    this.rotater = 0;
    this.increment = Math.PI / 8;
    this.reload = this.defaultReload;
    this.body.width = 154;
    this.body.height = 149;
    this.setVelocity(0, 400);
    this.setAcceleration(0, -150);
    this.prep = 300;
  }

  shoot() {
    for (let i = 0; i <= 2; i++) {
      new SpiralBossBullet({ scene: this.scene, x: this.x, y: this.y, angle: this.rotater + (2 * Math.PI), color: 0x560010 })
      new SpiralBossBullet({ scene: this.scene, x: this.x, y: this.y, angle: this.rotater + ((2 * Math.PI) / 3), color: 0x5c363d })
      new SpiralBossBullet({ scene: this.scene, x: this.x, y: this.y, angle: this.rotater + ((4 * Math.PI) / 3), color: 0x000000 })
    }
    this.rotater += this.increment;
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

export default SpiralBoss;