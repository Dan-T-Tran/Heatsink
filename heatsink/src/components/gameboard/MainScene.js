import Phaser from 'phaser';
import store from '../../store';
import BigBullet from './playerBullets/BigBullet.js';
import Mook from './enemy/Mook.js';
import Normal from './weapons/Normal.js';
import Beam from './weapons/Beam.js';

/*
EXTRAS:

Credit screen (can delegate to the README)
Extra enemy types
Extra bullet types
Maybe a boss somewhere in there
Find more sprites?
*/

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene'); // Doesn't do anything, but it's needed to prevent breaking due to "extends"
    this.speedMultiplier = 1;
    this.speed = 300;
    this.player = null;
    this.blocker = null;
    this.invulnerable = 0;
    this.buttons = null;
    this.bullet = null;
    this.bomb = null;
    this.reload = 0;
    this.enemyInterval = 0;
    this.sounds = {};
    this.circle = null;
    this.blocking = false;
    this.weapons = [];
    this.weaponsPointer = 0;
    this.weaponSwitch = 0;

    this.enemyHit = this.enemyHit.bind(this);
    this.playerHit = this.playerHit.bind(this);
    this.cooldownCircle = this.cooldownCircle.bind(this);
    this.blockHit = this.blockHit.bind(this);
    this.shoot = this.shoot.bind(this);
    this.shootBomb = this.shootBomb.bind(this);
    this.bombHit = this.bombHit.bind(this);
  }

  preload() {
    // "this" refers to the scene
    this.load.image('space', './assets/space.jpg');
    this.load.image('forest', './assets/forest.jpg');
    this.load.spritesheet('gundam', './assets/gundam-sprites.png',
    { frameWidth: 26, frameHeight: 31});
    this.load.image('zaku', './assets/zaku.png');
    this.load.image('bullet', './assets/bullet.png');
    this.load.image('beam', './assets/beam.png');
    this.load.image('enemyBullet', './assets/enemyBullet.png');
    this.load.image('shield', './assets/shield.png');

    this.load.audio('bgm', './assets/music/bgm.mp3');
    this.load.audio('damage', './assets/sound/se_tan00.wav');
    this.load.audio('shoot', './assets/sound/se_plst00.wav');
    this.load.audio('shootBeam', './assets/sound/se_lazer01.wav');
    this.load.audio('switchWeapon', './assets/sound/se_shutter.wav');
    this.load.audio('bomb', './assets/sound/se_gun00.wav');
    this.load.audio('block', './assets/sound/se_powerup.wav');
    this.load.audio('powerup', './assets/sound/se_power1.wav');
    this.load.audio('cooldown', './assets/sound/se_kira02.wav');
    this.load.audio('invulnerability', './assets/sound/se_timeout.wav');
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

    // Add sounds
    this.sounds.bgm = this.sound.add('bgm');
    this.sounds.damage = this.sound.add('damage');
    this.sounds.shoot = this.sound.add('shoot');
    this.sounds.shootBeam = this.sound.add('shootBeam');
    this.sounds.switchWeapon = this.sound.add('switchWeapon');
    this.sounds.bomb = this.sound.add('bomb');
    this.sounds.block = this.sound.add('block');
    this.sounds.powerup = this.sound.add('powerup');
    this.sounds.cooldown = this.sound.add('cooldown');
    this.sounds.invulnerability = this.sound.add('invulnerability');
    this.sounds.death = this.sound.add('death');
    this.sounds.enemyDamage = this.sound.add('enemyDamage');
    this.sounds.enemyDeath = this.sound.add('enemyDeath');

    // this.sounds.bgm.volume = 0.2;
    this.sounds.bgm.play.loop = true;
    this.sounds.bgm.play();

    this.weapons.push(Normal);
    this.weapons.push(Beam);

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

    // Set up blocker properties
    this.circle = this.add.graphics();
    this.blocker = this.physics.add.sprite(this.player.x, this.player.y - 30, 'shield');
    this.blocker.scale = 0.4;
    this.blocker.disableBody(true, true);

    // Add groups for components
    this.bullet = this.physics.add.group();
    this.bomb = this.physics.add.group();
    this.enemy = this.physics.add.group();
    this.enemyBullet = this.physics.add.group();

    // Add collision logic
    this.physics.add.overlap(this.enemy, this.bullet, this.enemyHit);
    this.physics.add.overlap(this.player, this.enemyBullet, this.playerHit);
    this.physics.add.overlap(this.blocker, this.enemyBullet, this.blockHit);
    this.physics.add.overlap(this.bomb, this.enemyBullet, this.bombBlock);
    this.physics.add.overlap(this.enemy, this.bomb, this.bombHit);

    // Add emitter that follows player for style
    let particles = this.add.particles('enemyBullet');
    let emitter = particles.createEmitter({
      speed: 20,
      scale: { start: 0.3, end: 0 },
      blendMode: 'ADD',
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

    // Increment difficulty every 15 seconds
    this.time.addEvent({
      delay: 15000,
      callback: (() => store.dispatch({type: 'difficulty'})),
      repeat: 98
    });
  }

  enemyHit(enemy, bullet) {
    let state = store.getState();
    enemy.health -= bullet.damage * (state.heat ** 1.05);
    if (enemy.health > 0) {
      this.sounds.enemyDamage.play();
      bullet.destroy();
    }

    if (enemy.health <= 0) {
      enemy.destroy();
      bullet.destroy();
      store.dispatch({type: 'score', payload: Math.floor(enemy.score * (state.heat ** 1.25) * ((state.difficulty ** 1.3) / state.difficulty))});
      this.sounds.enemyDeath.play();
    }
  }

  bombHit(enemy, bomb) {
    if (enemy.hitByBomb) {
      return;
    }

    enemy.hitByBomb = true;

    let state = store.getState();

    enemy.health -= bomb.damage;
    if (enemy.health > 0) {
      this.sounds.enemyDamage.play();
      this.time.addEvent({
        delay: 1000,
        callback: (() => enemy.hitByBomb = false)
      })
    }

    if (enemy.health <= 0) {
      enemy.destroy();
      this.sounds.enemyDeath.play();
      store.dispatch({type: 'score', payload: Math.floor(enemy.score * (state.heat ** 1.25) * ((state.difficulty ** 1.3) / state.difficulty))});
    }
  }

  playerHit(player, enemyBullet) {
    enemyBullet.disableBody(true, true);
    enemyBullet.destroy();

    if (this.invulnerable > 0) {
      return;
    }

    let state = store.getState();
    if (state.health - (enemyBullet.damage * (state.heat ** 1.5) * ((state.difficulty ** 1.2) / state.difficulty)) > 0) {
      this.sounds.damage.play();
      this.invulnerable = 200;
      this.player.alpha = 0.5;
    }

    store.dispatch({type: 'hurt', payload: enemyBullet.damage * (state.heat ** 1.5) * ((state.difficulty ** 1.2) / state.difficulty)});
    if (store.getState().health <= 0) {    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT); //16
      this.input.keyboard.removeCapture([32, 37, 38, 39, 40, 67, 88, 90]);
      // this.input.keyboard.enabled = false;
      // this.input.keyboard.enableGlobalCapture();
      player.destroy();
      // set time for 1 second to trigger gameover screen
      this.time.addEvent({
        delay: 1000,
        callback: (() => {
          this.sounds.bgm.stop();
          store.dispatch({type:'screen', payload: 'scoreScreen'})
        })
      });
    }
  }

  shoot() {
    if (this.reload > 0) {
      return;
    }

    let heat = store.getState().heat;
    this.reload = this.weapons[this.weaponsPointer](this, this.player.x, this.player.y, heat, this.buttons.keys[16].isDown);

    if (this.weapons[this.weaponsPointer]() === 'Normal') {
      this.reload = this.reload * (heat / (heat ** 1.35))
      this.sounds.shoot.play();
    } else {
      this.sounds.shootBeam.play();
    }
  }

  switchWeapon() {
    if (this.weaponSwitch > 0) {
      return;
    }

    this.weaponsPointer++;
    if (this.weaponsPointer >= this.weapons.length) {
      this.weaponsPointer = 0;
    }

    this.sounds.switchWeapon.play();
    this.weaponSwitch = 100;
    this.reload = 15;
  }

  shootBomb() {
    if (store.getState().heat <= 1.2) {
      return;
    }

    this.sounds.bomb.play();
    new BigBullet({ scene: this, x: this.player.x, y: this.player.y - 10, key: 'bullet', group: this.bomb });
    store.dispatch({type: 'bomb'});
  }

  bombBlock(bomb, enemyBullet) {
    enemyBullet.destroy();
  }

  block() {
    this.sounds.block.play();
    this.blocking = true;
    this.blocker.enableBody(false, null, null, true, true);
    const disable = () => {
      this.blocking = false;
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
    let previousHeat = store.getState().heat;
    store.dispatch({type: 'block', payload: enemyBullet.damage / 400});
    let currentHeat = store.getState().heat;
    if ((previousHeat < 2 && currentHeat >= 2) || (previousHeat < 3 && currentHeat >= 3)) {
      this.sounds.powerup.play();
    }
    enemyBullet.destroy();
  }

  cooldownCircle() {
    let cooldown = store.getState().cooldown;
    let startAngle = Phaser.Math.DegToRad(-90);
    let finalAngle = Phaser.Math.DegToRad(359.9 * (1 - cooldown / 100) - 90);
    this.circle.lineStyle(cooldown <= 0 ? 4 : 2, this.invulnerable ? 0xab1919 : 0xffffff, cooldown <= 0 ? 1 : 0.5);
    this.circle.beginPath();
    this.circle.arc(this.player.x, this.player.y, 50, startAngle, finalAngle, false);
    this.circle.strokePath();
  }

  update() {
    // Update cooldown indicator around player
    this.circle.clear();

    // Prevent game updates once player dies
    if (store.getState().health <= 0) {
      return;
    }

    // Update cooldown
    if (store.getState().cooldown > 0) {
      store.dispatch({type: 'cooldown'})
      if (store.getState().cooldown <= 0) {
        this.sounds.cooldown.play();
      }
    }

    // Update blocker's position with the player
    this.blockMove();
    this.cooldownCircle();

    // Trigger block on X as long as cooldown is done and is not currently running
    if (this.buttons.keys[88].isDown && store.getState().cooldown <= 0 && !this.blocking) {
      this.block();
    }

    // Timer for invulnerability
    if (this.invulnerable > 0) {
      this.invulnerable--;
      if (this.invulnerable <= 0) {
        this.sounds.invulnerability.play();
        this.invulnerable = false;
        this.player.alpha = 1;
      }
    }

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
    if (this.weaponSwitch > 0) {
      this.weaponSwitch--;
    }

    // Perform appropriate shooting actions on Z and space
    if (this.buttons.keys[90].isDown) {
      this.shoot();
    }
    if (this.buttons.keys[32].isDown) {
      this.shootBomb();
    }
    if (this.buttons.keys[67].isDown) {
      this.switchWeapon();
    }

    // Trigger enemies at some random interval
    if (this.enemyInterval > 0) {
      this.enemyInterval--;
    } else {
      this.enemyInterval = Math.floor(Math.random() * 200 + 200 - (store.getState().difficulty / 2));
      for (let i = 0; i < Math.floor(Math.random() * 30 + 5 + ((store.getState().difficulty) / 4) ** 1.05); i++) {
        new Mook({scene: this, x: Math.random() * 680 + 20, y: -50 - Math.random() * 80, health: 20, key: 'zaku', group: this.enemy, bulletGroup: this.enemyBullet });
      }
    }

    // Trigger enemies sooner if there's too few enemies on screen
    if (this.enemy.children.entries.length <= (5 + (store.getState().difficulty / 3)) * (store.getState().heat) && this.enemyInterval > 80) {
      this.enemyInterval = 30;
    }
  }
}

export default MainScene;
