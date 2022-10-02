import EnemyBullet from './EnemyBullet';

class ConvergeBossBullet extends EnemyBullet {
  constructor(config) {
    super(config);
    this.damage = 7;
    this.weight = 2;
    this.setVelocity(config.dx, config.dy);
    this.setAcceleration(200 * config.direction, 0);
    this.setTintFill(0x2fe1a9);
  }

}

export default ConvergeBossBullet;