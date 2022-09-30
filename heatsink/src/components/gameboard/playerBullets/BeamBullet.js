import Bullet from './Bullet.js';

class BeamBullet extends Bullet {
  constructor(config) {
    super(config);
    this.setTexture('beam');
    this.damage = config.keyDown ? 2 * (config.heat ** 1.2) : 2;
    this.scaleX = config.keyDown ? 0.5 : config.heat ** 1.05;
  }
}

export default BeamBullet;