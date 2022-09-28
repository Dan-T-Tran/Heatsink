import Phaser from 'phaser';

class BigBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    // this.scene = config.scene;
    // this.x = config.x;
    // this.y = config.y;
    // this.key = config.key;
    // this.group = config.group;
    // this.dy = -100;
    // this.bullet = config.group.create(config.x, config.y, config.key);
    // this.bullet.setVelocityY(this.dy);
    this.damage = 50;
    this.scale = 3;
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.group.add(this);
  };

  move(velocityX, velocityY) {
    let deg = Math.tan(velocityY / velocityX) || 0;

    this.setVelocityX(velocityX);
    this.setVelocityY(velocityY);
    this.angle = deg;
  }

  update() {

  }
};

export default BigBullet;

//Phaser.GameObjects.Sprite