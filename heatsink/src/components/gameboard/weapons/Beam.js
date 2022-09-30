import BeamBullet from '../playerBullets/BeamBullet.js';

const Beam = (scene, x, y, heat, keyDown) => {
  if (!scene) {
    return 'Beam';
  }

  if (keyDown) {
    new BeamBullet( {scene: scene, x: x - 20, y: y - 20, dx: -450, dy: -450, heat: heat, keyDown: keyDown } )
    new BeamBullet( {scene: scene, x: x + 20, y: y - 20, dx: 450, dy: -450, heat: heat, keyDown: keyDown } )
  } else {
    new BeamBullet( {scene: scene, x: x, y: y - 20, dx: 0, dy: -600, heat: heat, keyDown: keyDown } )
  }

  return 5;
};

export default Beam;