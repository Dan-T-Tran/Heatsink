import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.scene.bullet.add(this);
    this.dx = config.dx;
    this.dy = config.dy;
    this.setVelocity(config.dx, config.dy);
    this.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, this.x + this.dx, this.y + this.dy)) + 90;

    let particles = config.scene.add.particles('enemyBullet');
    let emitter = particles.createEmitter({
      speed: 5,
      lifespan: 500,
      scale: { start: 0, end: 0 },
      blendMode: 'ADD',
    })
    emitter.startFollow(this);
    this.on('destroy', () => {
      emitter.scaleX.start = 0.25;
      emitter.explode(150);
    });

    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = true;
    this.body.world.on('worldbounds', ((body) => {
      if (body.gameObject === this) {
        this.destroy();
      }
    }))
  };
};

export default Bullet;
