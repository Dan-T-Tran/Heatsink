import Bullet from './Bullet.js';

class NormalBullet extends Bullet {
  constructor(config) {
    super(config);
    this.setTexture('bullet');
    this.damage = 5;
  }
}

export default NormalBullet;