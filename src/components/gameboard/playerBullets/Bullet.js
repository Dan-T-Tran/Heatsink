import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    // maybe make damage dynamic?
    this.damage = 5;
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.group.add(this);
  };

  move(velocityX, velocityY) {
    //fix angle math
    let deg = Math.tan(velocityY / velocityX) || 0;

    this.setVelocityX(velocityX);
    this.setVelocityY(velocityY);
    this.angle = deg;
  }

  update() {

  }
};

export default Bullet;
