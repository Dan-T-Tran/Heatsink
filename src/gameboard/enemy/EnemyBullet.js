import Phaser from 'phaser';

class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    this.damage = 5;
    config.scene.add.existing(this);
    config.group.add(this);


  }

};

export default EnemyBullet;