import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.scene.bullet.add(this);
    this.dx = config.dx;
    this.dy = config.dy;
    this.setVelocity(config.dx, config.dy);
    this.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, this.x + this.dx, this.y + this.dy)) + 90;

    const timer = config.scene.time.addEvent({
      delay: 6000,
      callback: (() => this.destroy()),
    });

    let particles = config.scene.add.particles('enemyBullet');
    let emitter = particles.createEmitter({
      speed: 5,
      lifespan: 500,
      scale: { start: 0, end: 0 },
      blendMode: 'ADD',
    })
    emitter.startFollow(this);
    this.on('destroy', () => {
      timer.remove();
      emitter.scaleX.start = 0.25;
      emitter.explode(150);
    });
  };
};

export default Bullet;
