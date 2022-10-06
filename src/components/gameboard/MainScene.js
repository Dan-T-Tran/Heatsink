import Phaser from 'phaser';
import store from '../../store';
import Mook from './enemy/Mook.js';
import SideLiner from './enemy/SideLiner.js';
import CircleShooter from './enemy/CircleShooter.js';
import ConvergeBoss from './enemy/ConvergeBoss.js';
import SpiralBoss from './enemy/SpiralBoss.js';
import DamageUp from './weapons/DamageUp.js';
import Normal from './weapons/Normal.js';
import Beam from './weapons/Beam.js';
import Melee from './weapons/Melee.js';
import Homing from './weapons/Homing.js';
import BigBullet from './bombs/BigBullet.js';
import BeamSpark from './bombs/BeamSpark.js';
import MeleeSwirl from './bombs/MeleeSwirl.js';
import HomingBall from './bombs/HomingBall.js';

/*
TO DO BEFORE ATTEMPT DEPLOYMENT:

Fix up side bar design
Add a volume slider?

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
    this.pierceBullet = null;
    this.bomb = null;
    this.reload = 0;
    this.cooldown = 0;
    this.enemies = [];
    this.enemyInterval = 0;
    this.sounds = {};
    this.circle = null;
    this.healthCircle = null;
    this.blocking = false;
    this.weapons = [];
    this.weaponsPointer = 0;
    this.weaponSwitch = 0;
    this.difficultyTimer = null;
    this.damageUpCounter = 60;
    this.bgmRepeat = -1;

    this.enemyHit = this.enemyHit.bind(this);
    this.enemyHitPierce = this.enemyHitPierce.bind(this);
    this.playerHit = this.playerHit.bind(this);
    this.cooldownCircle = this.cooldownCircle.bind(this);
    this.healthCircleGenerator = this.healthCircleGenerator.bind(this);
    this.blockHit = this.blockHit.bind(this);
    this.shoot = this.shoot.bind(this);
    this.shootBomb = this.shootBomb.bind(this);
    this.bombHit = this.bombHit.bind(this);
    this.getDamageUp = this.getDamageUp.bind(this);
    this.checkDamageUp = this.checkDamageUp.bind(this);
    // this.randomizeBgm = this.randomizeBgm.bind(this);
  }

  preload() {
    // "this" refers to the scene
    this.load.spritesheet('gundam', './assets/sprites/gundam-sprites.png',
    { frameWidth: 26, frameHeight: 31});
    this.load.image('zaku', './assets/sprites/zaku.png');
    this.load.image('zakuLeft', './assets/sprites/zakuYellowLeft.png');
    this.load.image('zakuRight', './assets/sprites/zakuYellowRight.png');
    this.load.image('blueZaku', './assets/sprites/sortaBlueZaku.png');
    this.load.image('smallShip', './assets/sprites/elmeth.png');
    this.load.image('bigShip', './assets/sprites/ship.png');
    this.load.image('bullet', './assets/sprites/bullet.png');
    this.load.image('beam', './assets/sprites/beam.png');
    this.load.image('melee', './assets/sprites/wave.png');
    this.load.image('missile', './assets/sprites/missile.png');
    this.load.image('bigBall', './assets/sprites/bigBall.png');
    this.load.image('enemyBullet', './assets/sprites/enemyBullet.png');
    this.load.image('shield', './assets/sprites/shield.png');
    this.load.image('damageUp', './assets/sprites/damageUp.png');

    this.load.audio('bgm0', './assets/music/bgm0.mp3');
    // this.load.audio('bgm1', './assets/music/bgm1.mp3');
    // this.load.audio('bgm2', './assets/music/bgm2.mp3');
    // this.load.audio('bgm3', './assets/music/bgm3.mp3');
    // this.load.audio('bgm4', './assets/music/bgm4.mp3');
    // this.load.audio('bgm5', './assets/music/bgm5.mp3');
    // this.load.audio('bgm6', './assets/music/bgm6.mp3');
    // this.load.audio('bgm7', './assets/music/bgm7.mp3');

    this.load.audio('damage', './assets/sound/se_tan00.wav');
    this.load.audio('shoot', './assets/sound/se_plst00.wav');
    this.load.audio('shootBeam', './assets/sound/se_lazer01.wav');
    this.load.audio('shootMelee', './assets/sound/se_slash.wav');
    this.load.audio('shootMissile', './assets/sound/se_tan02.wav');
    this.load.audio('switchWeapon', './assets/sound/se_shutter.wav');
    this.load.audio('bigBullet', './assets/sound/se_gun00.wav');
    this.load.audio('beamSpark', './assets/sound/se_nep00.wav');
    this.load.audio('homingBomb', './assets/sound/se_power0.wav');
    this.load.audio('block', './assets/sound/se_powerup.wav');
    this.load.audio('powerup', './assets/sound/se_power1.wav');
    this.load.audio('damageUpSpawn', './assets/sound/se_bonus.wav');
    this.load.audio('damageUpGet', './assets/sound/se_extend.wav');
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
    this.sounds.bgm0 = this.sound.add('bgm0');
    // this.sounds.bgm1 = this.sound.add('bgm1');
    // this.sounds.bgm2 = this.sound.add('bgm2');
    // this.sounds.bgm3 = this.sound.add('bgm3');
    // this.sounds.bgm4 = this.sound.add('bgm4');
    // this.sounds.bgm5 = this.sound.add('bgm5');
    // this.sounds.bgm6 = this.sound.add('bgm6');
    // this.sounds.bgm7 = this.sound.add('bgm7');

    this.sounds.damage = this.sound.add('damage');
    this.sounds.shoot = this.sound.add('shoot');
    this.sounds.shootBeam = this.sound.add('shootBeam');
    this.sounds.shootMelee = this.sound.add('shootMelee');
    this.sounds.shootMissile = this.sound.add('shootMissile');
    this.sounds.switchWeapon = this.sound.add('switchWeapon');
    this.sounds.bigBullet = this.sound.add('bigBullet');
    this.sounds.beamSpark = this.sound.add('beamSpark');
    this.sounds.homingBomb = this.sound.add('homingBomb');
    this.sounds.block = this.sound.add('block');
    this.sounds.powerup = this.sound.add('powerup');
    this.sounds.damageUpSpawn = this.sound.add('damageUpSpawn');
    this.sounds.damageUpGet = this.sound.add('damageUpGet');
    this.sounds.cooldown = this.sound.add('cooldown');
    this.sounds.invulnerability = this.sound.add('invulnerability');
    this.sounds.death = this.sound.add('death');
    this.sounds.enemyDamage = this.sound.add('enemyDamage');
    this.sounds.enemyDeath = this.sound.add('enemyDeath');

    this.sounds.bgm0.play();
    this.sounds.bgm0.loop = true;
    // for (let i = 0; i <= 7; i++) {
    //   this.sounds[`bgm${i}`].on('complete', this.randomizeBgm)
    // }
    // this.randomizeBgm();

    this.weapons.push(Normal);
    this.weapons.push(Beam);
    this.weapons.push(Melee);
    this.weapons.push(Homing);

    this.enemies.push(Mook);
    this.enemies.push(SideLiner);
    this.enemies.push(CircleShooter);
    this.enemies.push(ConvergeBoss);
    this.enemies.push(SpiralBoss);

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

    // Set up health circle properties
    this.healthCircle = this.add.graphics();

    // Add groups for components
    this.bullet = this.physics.add.group();
    this.pierceBullet = this.physics.add.group();
    this.bomb = this.physics.add.group();
    this.enemy = this.physics.add.group();
    this.enemyBullet = this.physics.add.group();
    this.damageUp = this.physics.add.group();

    // Add collision logic
    this.physics.add.overlap(this.enemy, this.bullet, this.enemyHit);
    this.physics.add.overlap(this.enemy, this.pierceBullet, this.enemyHitPierce);
    this.physics.add.overlap(this.player, this.enemyBullet, this.playerHit);
    this.physics.add.overlap(this.blocker, this.enemyBullet, this.blockHit);
    this.physics.add.overlap(this.bomb, this.enemyBullet, this.bombBlock);
    this.physics.add.overlap(this.enemy, this.bomb, this.bombHit);
    this.physics.add.overlap(this.player, this.damageUp, this.getDamageUp);

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
    this.difficultyTimer = this.time.addEvent({
      delay: 15000,
      callback: (() => store.dispatch({type: 'difficulty'})),
      repeat: 98
    });
  }

  // randomizeBgm() {
  //   let randomizer = Math.floor(Math.random() * 8);
  //   if (randomizer === this.bgmRepeat) {
  //     this.randomizeBgm();
  //   } else {
  //     this.bgmRepeat = randomizer;
  //     this.sounds[`bgm${randomizer}`].play();
  //   }
  // };

  enemyHit(enemy, bullet) {
    let state = store.getState();
    let multiplier = bullet.isBeam ? 0.4 : 1;
    enemy.health -= (bullet.damage * (state.heat ** 1.05) + (state.damageUp * multiplier));
    if (enemy.health > 0) {
      this.sounds.enemyDamage.play();
      bullet.destroy();
    }

    if (enemy.health <= 0) {
      this.damageUpCounter--;
      this.checkDamageUp(enemy);
      bullet.destroy();
      enemy.destroy();
      this.sounds.enemyDeath.play();
      store.dispatch({type: 'score', payload: Math.floor(enemy.score * (state.heat ** 1.25) * ((state.difficulty ** 1.3) / state.difficulty))});
      store.dispatch({type: 'kill'});
    }
  }

  enemyHitPierce(enemy, bullet) {
    if (enemy.hitbyPierce) {
      return;
    }

    let state = store.getState();
    if (enemy.health > 0 && !enemy.hitByPierce) {
      enemy.health -= (bullet.damage * (state.heat ** 1.05) + state.damageUp);
      enemy.hitByPierce = true;
      this.sounds.enemyDamage.play();
      this.time.addEvent({
        delay: 600,
        callback: (() => enemy.hitByPierce = false)
      })
    }

    if (enemy.health <= 0) {
      this.damageUpCounter--;
      this.checkDamageUp(enemy);
      enemy.destroy();
      this.sounds.enemyDeath.play();
      store.dispatch({type: 'score', payload: Math.floor(enemy.score * (state.heat ** 1.25) * ((state.difficulty ** 1.3) / state.difficulty))});
      store.dispatch({type: 'kill'});
    }
  }

  bombHit(enemy, bomb) {
    if (enemy.hitByBomb) {
      return;
    }

    let multiplier = enemy.isBoss ? 2.5 : 1;

    enemy.hitByBomb = true;

    let state = store.getState();

    enemy.health -= (bomb.damage * multiplier);
    if (enemy.health > 0) {
      this.sounds.enemyDamage.play();
      this.time.addEvent({
        delay: 1000,
        callback: (() => enemy.hitByBomb = false)
      })
    }

    if (enemy.health <= 0) {
      this.damageUpCounter--;
      this.checkDamageUp(enemy);
      enemy.destroy();
      this.sounds.enemyDeath.play();
      store.dispatch({type: 'score', payload: Math.floor(enemy.score * (state.heat ** 1.25) * ((state.difficulty ** 1.3) / state.difficulty))});
      store.dispatch({type: 'kill'});
    }
  }

  getDamageUp(player, damageUp) {
    this.sounds.damageUpGet.play();
    store.dispatch({ type:'damageUp' });
    damageUp.destroy();
  };

  checkDamageUp(enemy) {
    if (this.damageUpCounter <= 0) {
      this.damageUpCounter = 60;
      let boundX = enemy.x;
      if (enemy.x <= 50) {
        boundX = 50;
      }
      if (enemy.x >= 670) {
        boundX = 670;
      }
      new DamageUp({ scene: this, x: boundX, y: enemy.y });
      this.sounds.damageUpSpawn.play()
    }
  };

  playerHit(player, enemyBullet) {
    enemyBullet.disableBody(true, true);
    enemyBullet.destroy();

    if (this.invulnerable > 0) {
      return;
    }

    let state = store.getState();
    let damage = ((enemyBullet.damage * (state.heat ** 1.15) * ((state.difficulty ** 1.15) / state.difficulty)) * ((state.damageUp + 1) / ((state.damageUp + 1) ** 1.2)))
    if (state.health - damage > 0) {
      this.sounds.damage.play();
      this.invulnerable = 200;
      this.player.alpha = 0.5;
    }

    store.dispatch({type: 'hurt', payload: damage });
    if (store.getState().health <= 0) {    this.buttons.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT); //16
      this.input.keyboard.removeCapture([32, 37, 38, 39, 40, 67, 88, 90]);
      player.destroy();
      this.difficultyTimer.remove();
      // set time for 1 second to trigger gameover screen
      this.time.addEvent({
        delay: 1000,
        callback: (() => {
          // for (let i = 0; i <= 7; i++) {
            // this.sounds[`bgm${i}`].stop();
          // }
          this.sounds.bgm0.stop();
          store.dispatch({type:'screen', payload: 'scoreScreen'})
        })
      });
    }
  }

  shoot(heat, damageUp) {
    if (this.reload > 0) {
      return;
    }

    this.reload = this.weapons[this.weaponsPointer](this, this.player.x, this.player.y, heat, this.buttons.keys[16].isDown);
    this.reload = (this.reload * (heat / (heat ** 1.35))) * ((damageUp + 1) / ((damageUp + 1) ** 1.1));

    switch(this.weapons[this.weaponsPointer]()) {
      case 'Normal':
        this.sounds.shoot.play();
        break;
      case 'Beam':
        this.sounds.shootBeam.play();
        break;
      case 'Melee':
        this.sounds.shootMelee.play();
        break;
      case 'Homing':
        this.sounds.shootMissile.play();
        break
      default:
        return;
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
    store.dispatch( {type:'weaponSwitch', payload:this.weapons[this.weaponsPointer]() })
  }

  shootBomb(heat) {
    if (heat <= 1.2) {
      return;
    }

    this.invulnerable = 200;

    switch(this.weapons[this.weaponsPointer]()) {
      case 'Normal':
        this.sounds.bigBullet.play();
        new BigBullet({ scene: this, x: this.player.x, y: this.player.y - 10, dx: 0, dy: -500, heat: heat });
        new BigBullet({ scene: this, x: this.player.x - (5 * heat), y: this.player.y - 10, dx: -300 * ((heat ** 1.2) / heat), dy: -400, heat: heat, direction: 'left' });
        new BigBullet({ scene: this, x: this.player.x + (5 * heat), y: this.player.y - 10, dx: 300 * ((heat ** 1.2) / heat), dy: -400, heat: heat, direction: 'right' });
        break;
      case 'Beam':
        this.sounds.beamSpark.play();
        this.time.addEvent({
          delay: 20,
          callback: (() => new BeamSpark({ scene: this, x: this.player.x, y: this.player.y - 20, dx: 0, dy: -600, heat: heat })),
          repeat: 160,
        })
        break;
      case 'Melee':
        this.sounds.shootMelee.play()
        new MeleeSwirl({ scene: this, x: this.player.x, y: this.player.y + 100, dx: 0, dy: -600, heat: heat, direction: 'left' });
        new MeleeSwirl({ scene: this, x: this.player.x, y: this.player.y - 100, dx: 0, dy: -600, heat: heat, direction: 'right' });
        new MeleeSwirl({ scene: this, x: this.player.x, y: this.player.y - 100, dx: 0, dy: -600, heat: heat, direction: 'left', half: true });
        new MeleeSwirl({ scene: this, x: this.player.x, y: this.player.y + 100, dx: 0, dy: -600, heat: heat, direction: 'right', half: true });
        this.weapons[this.weaponsPointer](this, this.player.x, this.player.y, heat, true);
        this.weapons[this.weaponsPointer](this, this.player.x, this.player.y, heat, false);
        break;
      case 'Homing':
        this.sounds.homingBomb.play();
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: -200, dy: 0, heat: heat });
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: 200, dy: 0, heat: heat });
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: 0, dy: -200, heat: heat });
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: 0, dy: 200, heat: heat });
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: -140, dy: -140, heat: heat });
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: 140, dy: -140, heat: heat });
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: -140, dy: 140, heat: heat });
        new HomingBall({ scene: this, x: this.player.x, y: this.player.y, dx: 140, dy: 140, heat: heat });
        break;
      default:
        return;
    }

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
      this.cooldown = 100;
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
    store.dispatch({type: 'block', payload: enemyBullet.weight / 100});
    let currentHeat = store.getState().heat;
    if ((previousHeat < 2 && currentHeat >= 2) || (previousHeat < 3 && currentHeat >= 3)) {
      this.sounds.powerup.play();
    }
    enemyBullet.destroy();
  }

  healthCircleGenerator(health) {
    let startAngle = Phaser.Math.DegToRad(-90);
    let finalAngle = Phaser.Math.DegToRad((359.9 * (health / 100) - 90));
    this.healthCircle.fillStyle(0x9ee6ff, 0.2)
    this.healthCircle.slice(this.player.x, this.player.y, 50, startAngle, finalAngle, false);
    this.healthCircle.fillPath();
  }

  cooldownCircle() {
    let cooldown = this.cooldown;
    let startAngle = Phaser.Math.DegToRad(-90);
    let finalAngle = Phaser.Math.DegToRad(359.9 * (1 - cooldown / 100) - 90);
    this.circle.lineStyle(cooldown <= 0 ? 4 : 2, this.invulnerable ? 0xab1919 : 0xffffff, cooldown <= 0 ? 1 : 0.5);
    this.circle.beginPath();
    this.circle.arc(this.player.x, this.player.y, 50, startAngle, finalAngle, false);
    this.circle.strokePath();
  }

  update() {
    let state = store.getState();
    // Update cooldown indicator and health circle around player
    this.circle.clear();
    this.healthCircle.clear();

    // Prevent game updates once player dies
    if (state.health <= 0) {
      return;
    }

    // Update cooldown
    if (this.cooldown > 0) {
      this.cooldown -= (0.5 - ((0.3 * ((state.heat - 1) / 2)) ** 1.2))
      if (this.cooldown <= 0) {
        this.sounds.cooldown.play();
      }
    }

    // Update health circle's position with the player
    this.healthCircleGenerator(state.health);

    // Update blocker's position with the player
    this.blockMove();
    this.cooldownCircle();

    // Trigger block on X as long as cooldown is done and is not currently running
    if (this.buttons.keys[88].isDown && this.cooldown <= 0 && !this.blocking) {
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
      this.shoot(state.heat, state.damageUp);
    }
    if (this.buttons.keys[32].isDown) {
      this.shootBomb(state.heat);
    }
    if (this.buttons.keys[67].isDown) {
      this.switchWeapon();
    }

    // Trigger enemies at some random interval
    if (this.enemyInterval > 0) {
      this.enemyInterval--;
    } else {
      let difficulty = state.difficulty;
      this.enemyInterval = Math.floor(Math.random() * 200 + 200 - (difficulty / 2));
      for (let i = 0; i < Math.floor(Math.random() * 15 + 5 + ((difficulty) / 4) ** 1.05); i++) {
        let randomizer = Math.floor(Math.random() * this.enemies.length);
        let enemy = new this.enemies[randomizer]({ scene: this, difficulty: difficulty });

        let randomChecker = (enemy.weight * (difficulty / (difficulty ** 1.2)) * Math.random());
        if (randomChecker < 0.08) {
          i += enemy.weight;
        } else {
          enemy.destroy();
          i--;
        }
      }
    }

    // Trigger enemies sooner if there's too few enemies on screen
    if (this.enemy.children.entries.length <= (5 + (state.difficulty / 3)) * (state.heat) && this.enemyInterval > 80) {
      this.enemyInterval = 30;
    }
  }
}

export default MainScene;
