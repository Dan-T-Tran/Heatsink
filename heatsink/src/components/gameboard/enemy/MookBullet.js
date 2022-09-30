import EnemyBullet from './EnemyBullet.js';

class MookBullet extends EnemyBullet {
  constructor(config) {
    super(config);
    this.damage = 5;
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