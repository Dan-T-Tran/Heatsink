import Phaser from 'phaser';

class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.setTexture('enemyBullet');
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.scene.enemyBullet.add(this);
    this.body.sourceWidth = 10;
    this.body.sourceHeight = 9;

    const timer = config.scene.time.addEvent({
      delay: 12000,
      callback: (() => this.destroy()),
    });
    this.on('destroy', () => {
      timer.remove();
    });
  }

};

export default EnemyBullet;