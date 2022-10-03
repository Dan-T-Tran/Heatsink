import Phaser from 'phaser';

class DamageUp extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.scene.damageUp.add(this);
    this.setTexture('damageUp');
    this.body.sourceWidth = 15;
    this.body.sourceHeight = 16;
    this.scale = 1.5;
    this.setVelocity(0, -100);
    this.setAcceleration(0, 60);

    const timer = config.scene.time.addEvent({
      delay: 10000,
      callback: (() => this.destroy()),
    });
    this.on('destroy', () => {
      timer.remove();
    });
  }
}

export default DamageUp;