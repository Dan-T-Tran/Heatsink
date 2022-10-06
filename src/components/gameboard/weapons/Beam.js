import BeamBullet from '../playerBullets/BeamBullet.js';

const Beam = (scene, x, y, heat, keyDown) => {
  if (!scene) {
    return 'Beam';
  }

  if (keyDown) {
    new BeamBullet( {scene: scene, x: x, y: y - 20, dx: 0, dy: -600, heat: heat, keyDown: keyDown } )
    if (heat >= 2) {
      new BeamBullet( {scene: scene, x: x + 5, y: y - 20, dx: 0, dy: -600, heat: heat, keyDown: false } )
      new BeamBullet( {scene: scene, x: x - 5, y: y - 20, dx: 0, dy: -600, heat: heat, keyDown: false } )
    }
    if (heat >= 3) {
      new BeamBullet( {scene: scene, x: x + 10, y: y - 20, dx: 0, dy: -600, heat: heat, keyDown: false } )
      new BeamBullet( {scene: scene, x: x - 10, y: y - 20, dx: 0, dy: -600, heat: heat, keyDown: false } )
    }
  } else {
    new BeamBullet( {scene: scene, x: x - 20, y: y - 20, dx: -300, dy: -450, heat: heat, keyDown: keyDown } )
    new BeamBullet( {scene: scene, x: x + 20, y: y - 20, dx: 300, dy: -450, heat: heat, keyDown: keyDown } )
    if (heat >= 2) {
      new BeamBullet( {scene: scene, x: x - 20, y: y - 20, dx: -400, dy: -300, heat: heat, keyDown: keyDown } )
      new BeamBullet( {scene: scene, x: x + 20, y: y - 20, dx: 400, dy: -300, heat: heat, keyDown: keyDown } )
    }
    if (heat >= 3) {
      new BeamBullet( {scene: scene, x: x - 20, y: y - 20, dx: -500, dy: -150, heat: heat, keyDown: keyDown } )
      new BeamBullet( {scene: scene, x: x + 20, y: y - 20, dx: 500, dy: -150, heat: heat, keyDown: keyDown } )
    }
  }

  return 65;
};

export default Beam;