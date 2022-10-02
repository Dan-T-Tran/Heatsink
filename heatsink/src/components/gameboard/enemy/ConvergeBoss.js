import Enemy from './Enemy.js';

class ConvergeBoss extends Enemy {
  constructor(config) {
    super(config);
    this.isBoss = true;
    this.health = this.health = 80 + ((config.difficulty * 2) ** 1.35);
    this.score = 4500;
    this.weight = 5;
    this.body.sourceWidth = 47;
    this.body.sourceHeight = 48;
    this.scale = 1.5;
  }

  shoot() {

  }

  preUpdate(time, delta) {

  };
}

export default ConvergeBoss;