import Phaser from 'phaser';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.setTexture('zaku');
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.scene.enemy.add(this);

    let particles = config.scene.add.particles('enemyBullet');
    let emitter = particles.createEmitter({
      speed: 20,
      scale: { start: 0.3, end: 0 },
      blendMode: 'ADD',
    })
    emitter.startFollow(this);
    this.on('destroy', () => {
      emitter.explode(150);
    });
  }
}

export default Enemy;