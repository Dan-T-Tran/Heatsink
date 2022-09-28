import Phaser from 'phaser';

class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config, group) {
    super(config.scene, config.x, config.y, config.key);
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    group.add(this);
  }


};

export default EnemyBullet;