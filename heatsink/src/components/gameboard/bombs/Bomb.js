import Phaser from 'phaser';

class Bomb extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.bomb = true;
    this.setPosition(config.x, config.y);
    this.dx = config.dx;
    this.dy = config.dy;
    config.scene.add.existing(this);
    config.scene.bomb.add(this);
    this.setVelocity(this.dx, this.dy);
    this.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, this.x + this.dx, this.y + this.dy)) + 90;
    config.scene.time.addEvent({
      delay: 3500,
      callback: (() => this.destroy())
    });
  };
}

export default Bomb;