import Phaser from 'phaser';

const RenderGame = () => {
  const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 720,
    height: 960,
    scene: {
      preload: preload,
      create: create
    }
  };
  const game = new Phaser.Game(config);
  function preload() {
    // this.load.image("logo", logoImg);
  }
  function create() {
    const logo = this.add.image(400, 150, "logo");
  this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }
}

export default RenderGame;