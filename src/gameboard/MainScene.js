import Phaser from 'phaser';
import store from '../store';
import Bullet from './playerBullets/Bullet.js';
import Enemy from './enemy/Enemy.js';

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene'); // Doesn't do anything, but it's needed to prevent breaking due to "extends"
    this.speedMultiplier = 1;
    this.speed = 200;
    this.player = null;
    this.buttons = null;
    this.bullets = null;
    this.bulletStorage = [];
    this.enemies = [];
    this.reload = 0;
    this.enemyInterval = 0;

    this.enemyHit = this.enemyHit.bind(this);
  }

  preload() {
    // "this" refers to the scene
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

    // for (let i = 0; i <= 5; i++) {
    //   this.bullets.push(new Bullet({scene: this, x: i * 100, y: 300, key:'bullet'}))
    // }
    // this.bullet = new Bullet({scene: this, x: this.player.x, y: this.player.y, key:'bullet'});

    this.bullets = this.physics.add.group();
    // this.bullet = new Bullet({scene: this, x: this.player.x, y: this.player.y + 300, key:'bullet', group: this.bullets});
    // this.bullet.create();
    // this.bullet.move();

    // this.bullets.create(this.player.x, this.player.y, 'bullet');
    // console.log(this.bullet);

    // zaku = this.physics.add.sprite(200, 0, 'zaku');
    this.enemy = this.physics.add.group();
    this.enemyBullet = this.physics.add.group();
    // this.zaku.create(100, 0, 'zaku');
    // this.zaku.create(200, 0, 'zaku');
    // this.zaku.create(300, 0, 'zaku');
    // this.zaku.create(400, 0, 'zaku');
    // this.physics.add.overlap(this.player, this.zaku, this.collision);
    // this.zaku.setVelocityY(50);

    this.physics.add.overlap(this.enemy, this.bullets, this.enemyHit);
    this.physics.add.overlap(this.player, this.enemyBullet, this.playerHit);
  }

  enemyHit(enemy, bullet) {
    enemy.destroy();
    Phaser.Utils.Array.Remove(this.enemies, enemy);
    bullet.destroy();
    store.dispatch({type: 'SCORE'});
  }

  playerHit(player, enemyBullet) {
    enemyBullet.disableBody(true, true);
    store.dispatch({type: 'HURT'});
    if (store.getState().health <= 0) {
      console.log('yer done');
    }
  }

  shoot() {
    if (this.reload > 0) {
      return;
    }
    this.reload = 50;

    let bullet;
    bullet = new Bullet({scene: this, x: this.player.x - 10, y: this.player.y - 5, key: 'bullet'}, this.bullets);
    this.bullets.add(bullet);
    bullet.move();
    bullet = new Bullet({scene: this, x: this.player.x + 10, y: this.player.y - 5, key: 'bullet'}, this.bullets);
    this.bullets.add(bullet);
    bullet.move();
  }

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

    if (this.reload > 0) {
      this.reload--;
    }

    if (this.buttons.keys[90].isDown) {
      this.shoot();
    }

    if (this.enemyInterval > 0) {
      this.enemyInterval--;
    } else {
      this.enemyInterval = Math.floor(Math.random() * 200 + 200);
      Phaser.Utils.Array.Add(this.enemies, new Enemy({scene: this, x: Math.random() * 680 + 20, y: 50 + Math.random() * 30, key: 'zaku', group: this.enemy}, this.enemy));
    }

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].move();
      this.enemies[i].shoot({scene: this, key: 'enemyBullet'}, this.enemyBullet);
    }

  }


}


export default MainScene;

// this.bg_sound = this.sound.add('KEY')
// this.bg_sound.play()