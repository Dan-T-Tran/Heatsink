import Phaser from 'phaser';
import store from '../store';

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.speedMultiplier = 1;
    this.speed = 200;
  }

  preload() {
    //"this" refers to the scene in config
    this.load.image('space', './assets/space.jpg');
    this.load.image('forest', './assets/forest.jpg');
    this.load.spritesheet('gundam', './assets/gundam-sprites.png',
    { frameWidth: 34, frameHeight: 37});
    this.load.image('zaku', './assets/zaku.png');
    this.load.image('bullet', './assets/bullet.png');
    this.load.image('enemyBullet', './assets/enemyBullet.png');
  }

  create() {
    // Set up the usable keys
    this.buttons = this.input.keyboard;
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT); //32
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //32
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); //37
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.UP); //38
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); //39
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); //40
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.C); //67
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.X); //88
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.Z); //90

    // Set up the base player properties
    this.player = this.physics.add.sprite(200, 400, 'gundam');
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: [ {key: 'gundam', frame: 2}],
      frameRate: 20,
    })

    this.anims.create({
      key: 'front',
      frames: [ {key: 'gundam', frame: 0}],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: [ {key: 'gundam', frame: 1}],
      frameRate: 20,
    })

    // zaku = this.physics.add.sprite(200, 0, 'zaku');
    // this.zaku = this.physics.add.group();
    // this.zaku.create(100, 0, 'zaku');
    // this.zaku.create(200, 0, 'zaku');
    // this.zaku.create(300, 0, 'zaku');
    // this.zaku.create(400, 0, 'zaku');
    // this.physics.add.overlap(this.player, this.zaku, this.collision);
    // this.zaku.setVelocityY(50);
  }

  // collision(player, zaku) {
  //   zaku.disableBody(true, true);
  //   store.dispatch({type: 'INC'});
  // }

  update() {
    // Move the player. If no arrow keys pressed, stop movement.
    // While shift is held, slow movement
    this.player.setVelocity(0);
    this.player.anims.play('front');
    if (this.buttons.keys[16].isDown) {
      this.speedMultiplier = 0.5;
    } else {
      this.speedMultiplier = 1;
    }
    for (let i = 37; i <= 40; i++) {
      if (this.buttons.keys[i].isDown) {
        switch (i) {
          case 37:
            this.player.setVelocityX(-this.speed * this.speedMultiplier);
            this.player.anims.play('left');
            break;
          case 39:
            this.player.setVelocityX(this.speed * this.speedMultiplier);
            this.player.anims.play('right');
            break;
          case 38:
            this.player.setVelocityY(-this.speed * this.speedMultiplier);
            break;
          case 40:
            this.player.setVelocityY(this.speed * this.speedMultiplier);
            break;
          default:
            break;
        }
      }
    }
  }
}


export default MainScene;