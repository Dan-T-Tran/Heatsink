import Phaser from 'phaser';

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.group);
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.key = config.key;
    this.group = config.group;
    this.enemy = config.group.create(config.x, config.y, config.key);
  }


};

export default Enemy;