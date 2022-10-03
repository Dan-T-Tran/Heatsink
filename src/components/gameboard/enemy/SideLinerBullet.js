import EnemyBullet from './EnemyBullet';

class SideLinerBullet extends EnemyBullet {
  constructor(config) {
    super(config);
    this.damage =  3;
    this.weight = 1.5;
    this.speed = 70;
    this.setVelocity(this.speed * config.direction * (config.multiplier ** 1.2), 0);
    this.setTintFill(0xcfcb3e);
  }

}

export default SideLinerBullet;