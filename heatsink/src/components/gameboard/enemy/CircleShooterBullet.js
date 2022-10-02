import EnemyBullet from './EnemyBullet';

class CircleShooterBullet extends EnemyBullet {
  constructor(config) {
    super(config);
    this.damage =  3;
    this.weight = 1.5;
    this.speed = 100;
    this.scene.physics.velocityFromRotation(config.angle, this.speed * config.multiplier, this.body.velocity);
    this.setTintFill(0x50add3);
  }

}

export default CircleShooterBullet;