import Phaser from 'phaser';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.x = config.x || (Math.random() * 680 + 20);
    this.y = config.y || (-50 - Math.random() * 80);
    config.scene.add.existing(this);
    config.scene.enemy.add(this);

    let emitter = this.scene.particles.createEmitter({
      speed: 20,
      scale: { start: 0, end: 0 },
      blendMode: 'ADD',
    })
    emitter.startFollow(this);
    this.on('destroy', () => {
      emitter.scaleX.start = 0.25;
      emitter.explode(150);
      this.scene.time.addEvent({
        delay: 500,
        callback: (() => emitter.manager.emitters.remove(emitter)),
      });
    });
  }
}

export default Enemy;