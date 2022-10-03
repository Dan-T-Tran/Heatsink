import EnemyBullet from './EnemyBullet';

class SpiralBossBullet extends EnemyBullet {
  constructor(config) {
    super(config);
    this.damage = 10;
    this.weight = 2.5;
    this.speed = 70;
    this.scene.physics.velocityFromRotation(config.angle, this.speed, this.body.velocity);
    this.scale = 1.5;
    this.setTintFill(config.color);
    this.alpha = 0.7;
  }

}

export default SpiralBossBullet;