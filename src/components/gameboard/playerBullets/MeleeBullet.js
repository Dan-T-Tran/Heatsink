import Phaser from 'phaser';

class MeleeBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.setPosition(config.x, config.y);
    this.setTexture('melee');
    config.scene.add.existing(this);
    config.scene.pierceBullet.add(this);
    this.dx = config.dx;
    this.dy = config.dy;
    this.setVelocity(config.dx, config.dy);
    this.body.sourceWidth = 75;
    this.body.sourceHeight = 41;
    this.scaleX = config.keyDown ? 1.5 * (config.heat ** 1.2 / config.heat) : 1;
    this.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, this.x + this.dx, this.y + this.dy)) + 90;

    this.melee = true;
    this.damage = config.keyDown ? 18 : 12;

    const timer = config.scene.time.addEvent({
      delay: 350,
      callback: (() => this.destroy()),
    });
    this.on('destroy', () => {
      timer.remove();
    });
  }
}

export default MeleeBullet;