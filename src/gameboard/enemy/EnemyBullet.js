import Phaser from 'phaser';

class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.group.add(this);


  }

  destroy() {
    // const ding = this.destroy();
    // setTimeout(() => ding(), 1000)
    // setTimeout(() => console.log(this), 1000)
  }
};

export default EnemyBullet;