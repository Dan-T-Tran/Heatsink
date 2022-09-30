import Bullet from './Bullet.js';

class NormalBullet extends Bullet {
  constructor(config) {
    super(config);
    this.setTexture('bullet');
    this.damage = config.keyDown ? 7 : 4;
  }
}

export default NormalBullet;