import Phaser from 'phaser';
import EnemyBullet from './EnemyBullet.js';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.bulletGroup = config.bulletGroup;
    this.setTexture(config.key);
    this.setPosition(config.x, config.y);
    config.scene.add.existing(this);
    config.group.add(this);
    this.setVelocityY(300);
    this.setAcceleration(0, -200);
    this.health = config.health;
    this.score = 200;
    this.bounce = 50;
    this.leave = 400;
    this.bullets = [];
    this.direction = config.x < this.scene.sys.game.scale.gameSize._width / 2 ? 1 : -1
    this.setCollideWorldBounds = true;
    this.shoot = this.shoot.bind(this);
    this.move = this.move.bind(this);

    // this.reload = 80;
    let timer = config.scene.time.addEvent({
      delay: 1000,
      callback: this.shoot,
      loop: true,
    })

    let timer2 = config.scene.time.addEvent({
      delay: 10,
      callback: this.move,
      loop: true,
    })

    let particles = config.scene.add.particles('enemyBullet');
    let emitter = particles.createEmitter({
      speed: 20,
      scale: { start: 0.3, end: 0 },
      blendMode: 'ADD',
    })
    emitter.startFollow(this);
    this.on('destroy', () => {
      emitter.explode(150);
      timer.remove();
      timer2.remove();
    });
  }

  shoot() {
    if (
      this.x < -100 ||
      this.x > this.scene.sys.game.scale.gameSize._width + 100 ||
      this.y < -300 ||
      this.y > this.scene.sys.game.scale.gameSize._height + 100
      )
    {
      this.destroy();
      return;
    }
    let bullet = new EnemyBullet({ scene: this.scene, x: this.x, y: this.y, group: this.bulletGroup });
    bullet.setVelocityY(400);
  }

  move() {
    // let direction;
    // if (this.x < this.scene.sys.game.scale.gameSize._width / 2) {
    //   direction = 1;
    // } else {
    //   direction = -1;
    // }
    // console.log(this.scene.sys.game.scale.gameSize._width);
    if (this.body.velocity.y < 0 && this.body.acceleration.y < 0) {
      this.setAcceleration(0, -30);
      this.bounce--;
    }
    if (this.body.velocity.y < 0 && this.bounce <= 0) {
      this.setAcceleration(0, 0);
    }
    if (this.body.acceleration.y === 0 && this.leave > 0) {
      this.leave--;
    }
    if (this.leave <= 0 && this.body.acceleration.x === 0) {
      this.setAcceleration(20 * this.direction, 0);
    }
  }

};

export default Enemy;