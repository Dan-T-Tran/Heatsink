import EnemyBullet from './EnemyBullet.js';

class MookBullet extends EnemyBullet {
  constructor(config) {
    super(config);
    this.damage = config.aim ? 3 : 5;
    this.weight = config.aim ? 0.65 : 1;
    this.speed = 400;
    this.aimReload = 12;
    if (config.aim) {
      this.setTintFill(0xdc864f, 0xdc864f, 0xdc864f, 0xdc864f);
      let direction = Math.atan( (config.scene.player.x-this.x) / (config.scene.player.y-this.y));
      this.setVelocityX(this.speed*Math.sin(direction))
      this.setVelocityY(this.speed*Math.cos(direction))
    } else {
      this.setVelocity(0, this.speed);
    }
  }
}

export default MookBullet;