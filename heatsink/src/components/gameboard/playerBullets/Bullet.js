import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    // maybe make damage dynamic?
    this.damage = 5;
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.group.add(this);

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

  move(velocityX, velocityY) {
    //fix angle math
    let deg = Math.tan(velocityY / velocityX) || 0;

    this.setVelocityX(velocityX);
    this.setVelocityY(velocityY);
    this.angle = deg;
  }

  update() {

  }
};

export default Bullet;
