import Phaser from 'phaser';
import store from '../store';

const RenderGame = (callback) => {

  const config = {
    type: Phaser.AUTO,
    parent: "board",
    width: 720,
    height: 960,
    // transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  const game = new Phaser.Game(config);

  let player;
  let buttons;
  let speed = 80;

  function preload() {
    //"this" refers to the scene in config
    this.load.image('space', './assets/space.jpg');
    this.load.image('forest', './assets/forest.jpg');
    this.load.spritesheet('gundam', './assets/gundam-sprites.png',
    { frameWidth: 34, frameHeight: 37});

  }
  function create() {
    buttons = this.input.keyboard;
    buttons.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); //37
    buttons.addKey(Phaser.Input.Keyboard.KeyCodes.UP); //38
    buttons.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); //39
    buttons.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); //40
    buttons.addKey(Phaser.Input.Keyboard.KeyCodes.X); //88
    buttons.addKey(Phaser.Input.Keyboard.KeyCodes.Z); //90

    player = this.physics.add.sprite(200, 400, 'gundam');
    player.setCollideWorldBounds(true);

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
    // this.add.image(0, 0, 'forest').setOrigin(0, 0);

  }

  function update() {
    // console.log(buttons);

    player.setVelocity(0);
    player.anims.play('front');
    for (let i = 37; i <= 40; i++) {
      if (buttons.keys[i].isDown) {
        switch (i) {
          case 37:
            player.setVelocityX(-speed);
            player.anims.play('left');
            break;
          case 39:
            player.setVelocityX(speed);
            player.anims.play('right');
            break;
          case 38:
            player.setVelocityY(-speed);
            break;
          case 40:
            player.setVelocityY(speed);
            break;
          default:
            break;
        }
      }
    }


  }
}

export default RenderGame;

/*
KEY CODES:
https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js
  LEFT: 37
  UP: 38
  RIGHT: 39
  DOWN: 40
  Z: 90
  X: 88
*/

/*
BASICALLY: TO INTEGRATE PHASER STATES INTO REACT STATES TO PROVIDE REAL-TIME INFO ON THE SIDE:

import state from
*/









/*


  const config = {
    type: Phaser.AUTO,
    parent: "board",
    // width: 720,
    // height: 960,
    height: 600,
    width: 800,
    // transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 30 },
        debug: false,
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  const game = new Phaser.Game(config);

  let platforms;
  let player;
  let cursors;
  let stars;
  let score = 0;
  let scoreText;
  let bombs;
  let gameOver = false;

  function preload() {
    //"this" refers to the scene in config
    // this.load.image('space', './assets/space.jpg');
    // this.load.image('forest', './assets/forest.jpg');
    // this.load.spritesheet('gundam', './assets/gundam.png',
    // { frameWidth: 23, frameHeight: 31});

    this.load.image('sky', './testAssets/sky.png');
    this.load.image('ground', './testAssets/platform.png');
    this.load.image('star', './testAssets/star.png');
    this.load.image('bomb', './testAssets/bomb.png');
    this.load.spritesheet('dude',
        './testAssets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
  }
  function create() {
    // this.controls = store.getState();
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    // player.body.setGravityY(500);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.physics.add.collider(player, platforms, (()=>store.dispatch({type:'INC'})), (()=>store.dispatch({type:'INC'})), (()=>store.dispatch({type:'INC'})));

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.physics.add.collider(stars, platforms);
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    function hitBomb (player, bomb ){
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
    }

    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    this.physics.add.overlap(player, stars, collectStar, null, this);

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // this.add.image(0, 0, 'forest').setOrigin(0, 0);
  }

  function update() {
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
  }

*/