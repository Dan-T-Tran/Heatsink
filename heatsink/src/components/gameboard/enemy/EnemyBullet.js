import Phaser from 'phaser';

class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.setTexture('enemyBullet');
    this.setPosition(config.x, config.y);
    this.damage = 5;
    config.scene.add.existing(this);
    config.scene.enemyBullet.add(this);

    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = true;
    this.body.world.on('worldbounds', ((body) => {
      if (body.gameObject === this) {
        this.destroy();
      }
    }))
  }

};

export default EnemyBullet;