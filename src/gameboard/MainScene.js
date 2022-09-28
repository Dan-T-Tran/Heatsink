import Phaser from 'phaser';
import store from '../store';
import Bullet from './playerBullets/Bullet.js';
import Enemy from './enemy/Enemy.js';

/*
TODO:
Add blocking mechanic
  Add appropriate heat mechanic and scaling

Add game over screen
Implement score submission in game over screen
Implement back-end for score submission

Add leaderboard somewhere
  With time: on a title screen
  With no time: on the sidebar

Implement back-end for leaderboard GET
  If title screen: when title screen loads
  If sidebar: when sidebar loads

EXTRAS:

Credit screen (can delegate to the README)
Extra enemy types
Extra bullet types
Difficulty scaling
Maybe a boss somewhere in there
Graphic indicator for blocking cooldown instead of text indicator (partial circle?)
Find more sprites?
*/

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene'); // Doesn't do anything, but it's needed to prevent breaking due to "extends"
    this.speedMultiplier = 1;
    this.speed = 200;
    this.player = null;
    this.blocker = null;
    this.invulnerable = 0;
    this.buttons = null;
    this.bullet = null;
    this.bullets = [];
    this.enemies = [];
    this.enemybullets = [];
    this.reload = 0;
    this.enemyInterval = 0;
    this.sounds = {};
    this.circle = null;

    this.enemyHit = this.enemyHit.bind(this);
    this.despawn = this.despawn.bind(this);
    this.playerHit = this.playerHit.bind(this);
    this.cooldownCircle = this.cooldownCircle.bind(this);
  }

  preload() {
    // "this" refers to the scene
    this.load.image('space', './assets/space.jpg');
    this.load.image('forest', './assets/forest.jpg');
    this.load.spritesheet('gundam', './assets/gundam-sprites.png',
    { frameWidth: 26, frameHeight: 31});
    this.load.image('zaku', './assets/zaku.png');
    this.load.image('bullet', './assets/bullet.png');
    this.load.image('enemyBullet', './assets/enemyBullet.png');
    this.load.image('shield', './assets/shield.png');

    this.load.audio('bgm', './assets/music/bgm.mp3');
    this.load.audio('damage', './assets/sound/se_tan00.wav');
    this.load.audio('invulnerability', './assets/sound/se_plst00.wav');
    this.load.audio('death', './assets/sound/se_pldead00.wav');
    this.load.audio('enemyDamage', './assets/sound/se_damage00.wav');
    this.load.audio('enemyDeath', './assets/sound/se_enep00.wav');
  }

  create() {
    // Set up the usable keys
    this.buttons = this.input.keyboard;
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT); //16
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //32
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); //37
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.UP); //38
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); //39
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); //40
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.C); //67
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.X); //88
    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.Z); //90

    this.sounds.bgm = this.sound.add('bgm');
    this.sounds.damage = this.sound.add('damage');
    this.sounds.invulnerability = this.sound.add('invulnerability');
    this.sounds.death = this.sound.add('death');
    this.sounds.enemyDamage = this.sound.add('enemyDamage');
    this.sounds.enemyDeath = this.sound.add('enemyDeath');

    // this.sounds.bgm.play.loop = true;
    // this.sounds.bgm.play();

    // this.sounds.enemyDeath.loop = true;
    // this.sounds.enemyDeath.play();

    // setTimeout(() => this.sounds.enemyDeath.loop = false, 10000);


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

    this.blocker = this.physics.add.sprite(this.player.x, this.player.y - 30, 'shield');
    this.blocker.scale = 0.4;
    this.blocker.disableBody(true, true);

    this.bullet = this.physics.add.group();
    this.enemy = this.physics.add.group();
    this.enemyBullet = this.physics.add.group();

    this.physics.add.overlap(this.enemy, this.bullet, this.enemyHit);
    this.physics.add.overlap(this.player, this.enemyBullet, this.playerHit);
    this.physics.add.overlap(this.blocker, this.enemyBullet, this.blockHit);

    let particles = this.add.particles('enemyBullet');

    let emitter = particles.createEmitter({
      speed: 20,
      scale: { start: 0.3, end: 0 },
      blendMode: 'add',
    })

    emitter.startFollow(this.player);
    this.player.on('destroy', () => {
      emitter.explode(600);
      this.sounds.death.play();
      emitter.gravityY = 300;
      emitter.speedX.propertyValue = 200;
      emitter.scaleX.start = 3;
      emitter.explode(800);
    });

    this.circle = this.add.graphics();
  }

  enemyHit(enemy, bullet) {
    enemy.health -= bullet.damage * (store.getState().heat ** 1.25);
    if (enemy.health > 0) {
      this.sounds.enemyDamage.play();
      bullet.destroy();
    }

    if (enemy.health <= 0) {
      enemy.destroy();
      let removed = Phaser.Utils.Array.Remove(this.enemies, enemy);

      if (removed) {
        this.sounds.enemyDeath.play();
        bullet.destroy();
        store.dispatch({type: 'score'});
      }
    }
  }

  playerHit(player, enemyBullet) {
    enemyBullet.disableBody(true, true);
    enemyBullet.destroy();

    if (this.invulnerable > 0) {
      return;
    }

    let state = store.getState();
    //hardcoded damage right now, change to dynamic
    if (state.health - (enemyBullet.damage * (state.heat ** 1.5)) > 0) {
      this.sounds.damage.play();
      this.invulnerable = 200;
      this.player.alpha = 0.5;
    }

    store.dispatch({type: 'hurt', payload: enemyBullet.damage * (state.heat ** 1.5)});
    //figure out how to do dynamic bullet damage to player health
    if (store.getState().health <= 0) {
      player.destroy();
    }
  }

  shoot() {
    if (this.reload > 0) {
      return;
    }
    this.reload = 30;

    let bullet;

    if (this.buttons.keys[16].isDown) {
      bullet = new Bullet({ scene: this, x: this.player.x - 10, y: this.player.y - 5, key: 'bullet', group: this.bullet });
      bullet.move(0, -400);
      bullet = new Bullet({ scene: this, x: this.player.x + 10, y: this.player.y - 5, key: 'bullet', group: this.bullet });
      bullet.move(0, -400);
    } else {
      bullet = new Bullet({ scene: this, x: this.player.x, y: this.player.y - 5, key: 'bullet', group: this.bullet });
      bullet.move(-250, -400);
      bullet = new Bullet({ scene: this, x: this.player.x, y: this.player.y - 5, key: 'bullet', group: this.bullet });
      bullet.move(250, -400);
    }
  }

  despawn(entity, array) {
    if (
      entity.x < -1000 ||
      entity.x > this.sys.game.scale.gameSize._width + 1000 ||
      entity.y < -1000 ||
      entity.y > this.sys.game.scale.gameSize._height + 1000
      )
    {
      entity.destroy();
      if (array) {
        Phaser.Utils.Array.Remove(array, entity);
      }
    }
    // despawn enemies and bullets once they're out of bounds far enough
    // if low on time, just despawn once they hit the canvas edges or something
  }

  block() {
    this.blocker.enableBody(false, null, null, true, true);

    const disable = () => {
      this.blocker.disableBody(true, true);
      store.dispatch({type: 'resetCooldown'});
    }

    this.time.addEvent({
      delay: 1000,
      callback: disable
    });
  }

  blockMove() {
    this.blocker.y = this.player.y - 20;
    this.blocker.x = this.player.x;
  }

  blockHit(blocker, enemyBullet) {
    store.dispatch({type: 'block', payload: enemyBullet.damage / 100});
    enemyBullet.destroy();
  }

  cooldownCircle() {
    let cooldown = store.getState().cooldown;
    let startAngle = Phaser.Math.DegToRad(-90);
    let finalAngle = Phaser.Math.DegToRad(359.9 * (1 - cooldown / 100) - 90);
    this.circle.lineStyle(cooldown <= 0 ? 4 : 2, cooldown <= 0 ? 0xffffff : 0xc0c0c0, 1);
    this.circle.beginPath();
    this.circle.arc(this.player.x, this.player.y, 50, startAngle, finalAngle, false);
    this.circle.strokePath();
  }

  update() {
    this.circle.clear();

    if (store.getState().health <= 0) {
      return;
    }

    if (store.getState().cooldown > 0) {
      store.dispatch({type: 'cooldown'})
      if (store.getState().cooldown <= 0) {
        this.sounds.invulnerability.play();
        //change this sound later
      }
    }

    this.blockMove();
    this.cooldownCircle();

    if (this.buttons.keys[88].isDown && store.getState().cooldown <= 0) {
      this.block();
    }

    if (this.invulnerable > 0) {
      this.invulnerable--;
      if (this.invulnerable <= 0) {
        this.sounds.invulnerability.play();
        this.invulnerable = false;
        this.player.alpha = 1;
      }
    }
    // if (store.getState().health > 0) {
    //   let emitter = new Emitter(this, this.player.x, this.player.y);
    // }
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
      if (this.enemies.length === 0 && this.enemyInterval > 30) {
        this.enemyInterval = 10
      }
    } else {
      this.enemyInterval = Math.floor(Math.random() * 200 + 200);
      for (let i = 0; i < Math.floor(Math.random() * 30 + 5); i++) {
        let enemy = Phaser.Utils.Array.Add(this.enemies, new Enemy({scene: this, x: Math.random() * 680 + 20, y: 50 + Math.random() * 30, health: 20, key: 'zaku', group: this.enemy }));
        let particles = this.add.particles('enemyBullet');
        let emitter = particles.createEmitter({
          speed: 20,
          scale: { start: 0.3, end: 0 },
          blendMode: 'ADD',
        })
        emitter.startFollow(enemy);
        enemy.on('destroy', () => emitter.explode(150));
      }
    }

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].move();
      let bullet = this.enemies[i].shoot({scene: this, key: 'enemyBullet', group: this.enemyBullet });
      // console.log(bullet);
      this.despawn(this.enemies[i], this.enemies);
      if (bullet) {
        let particles = this.add.particles('enemyBullet');
        let emitter = particles.createEmitter({
          speed: 5,
          lifespan: 500,
          scale: { start: 0, end: 0 },
          blendMode: 'ADD',
        })
        emitter.startFollow(bullet);
        bullet.on('destroy', () => {
          emitter.scaleX.start = 0.25;
          emitter.explode(150);
        });
      }
    }

  }


}


export default MainScene;

// this.bg_sound = this.sound.add('KEY')
// this.bg_sound.play()