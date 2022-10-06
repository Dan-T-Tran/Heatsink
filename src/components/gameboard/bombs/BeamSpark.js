import Bomb from './Bomb.js';

class BeamSpark extends Bomb {
  constructor(config) {
    super(config);
      this.heat = config.heat;
      this.damage = 22 * (this.heat ** 1.035);
      this.scaleX = 1.4 * (this.heat ** 1.5 / this.heat);
      this.setTexture('beam');
      this.body.sourceWidth = 21;
      this.body.sourceHeight = 75;
  }
}

export default BeamSpark;