import Phaser from 'phaser';

class Bullet extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.group);
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.key = config.key;
    this.group = config.group;
    this.dy = -100;
    this.bullet = config.group.create(config.x, config.y, config.key);
    this.bullet.setVelocityY(this.dy);
    // this.dy = -100;
    // this.bullet = config.scene.physics.add.sprite(config.x, config.y + 300, config.key);
    // this.bullet.setVelocityY(this.dy);
    // config.scene.physics.add.sprite(config.x, config.y + 300, config.key);
  };

  // create() {
  //   // this.bullet = this.group.create(this.x, this.y, this.key);
  // }

  // move() {
  //   // this.bullet.setVelocityY(this.dy);
  // }

  // shoot() {

  // }

  update() {

  }
};

export default Bullet;

