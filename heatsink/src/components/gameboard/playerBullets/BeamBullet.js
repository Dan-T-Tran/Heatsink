import Bullet from './Bullet.js';

class BeamBullet extends Bullet {
  constructor(config) {
    super(config);
    this.setTexture('beam');
    this.damage = config.keyDown ? 2 * (config.heat ** 1.2) : 0.75;
    this.scaleX = config.keyDown ? config.heat ** 1.05 : 0.5;
    this.alpha = 0.4;
    this.body.sourceWidth = 21;
    this.body.sourceHeight = 75;
  }
}

export default BeamBullet;