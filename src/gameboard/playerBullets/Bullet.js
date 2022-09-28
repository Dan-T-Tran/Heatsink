import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config, group) {
    super(config.scene, config.x, config.y, config.key);
    // this.scene = config.scene;
    // this.x = config.x;
    // this.y = config.y;
    // this.key = config.key;
    // this.group = config.group;
    // this.dy = -100;
    // this.bullet = config.group.create(config.x, config.y, config.key);
    // this.bullet.setVelocityY(this.dy);
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    group.add(this);
  };

  move() {
    this.setVelocityY(-100);
  }

  update() {

  }
};

export default Bullet;

//Phaser.GameObjects.Sprite