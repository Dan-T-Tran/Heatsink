import HomingBullet from '../playerBullets/HomingBullet.js';

const Homing = (scene, x, y, heat, keyDown) => {
  if (!scene) {
    return 'Homing';
  }

  if (keyDown) {
    new HomingBullet( {scene: scene, x: x, y: y , dx: -10, dy: -190, heat: heat, keyDown: keyDown } )
    new HomingBullet( {scene: scene, x: x, y: y , dx: 10, dy: -190, heat: heat, keyDown: keyDown } )
    if (heat >= 2) {
      new HomingBullet( {scene: scene, x: x, y: y , dx: -30, dy: -160, heat: heat, keyDown: keyDown } )
      new HomingBullet( {scene: scene, x: x, y: y , dx: 30, dy: -160, heat: heat, keyDown: keyDown } )
    }
    if (heat >= 3) {
      new HomingBullet( {scene: scene, x: x, y: y , dx: -60, dy: -120, heat: heat, keyDown: keyDown } )
      new HomingBullet( {scene: scene, x: x, y: y , dx: 60, dy: -120, heat: heat, keyDown: keyDown } )
    }
  } else {
    new HomingBullet( {scene: scene, x: x, y: y , dx: 200, dy: 0, heat: heat, keyDown: keyDown } )
    new HomingBullet( {scene: scene, x: x, y: y , dx: -200, dy: 0, heat: heat, keyDown: keyDown } )
    if (heat >= 2) {
      new HomingBullet( {scene: scene, x: x, y: y , dx: 140, dy: -140, heat: heat, keyDown: keyDown } )
      new HomingBullet( {scene: scene, x: x, y: y , dx: -140, dy: -140, heat: heat, keyDown: keyDown } )
    }
    if (heat >= 3) {
      new HomingBullet( {scene: scene, x: x, y: y , dx: 140, dy: 140, heat: heat, keyDown: keyDown } )
      new HomingBullet( {scene: scene, x: x, y: y , dx: -140, dy: 140, heat: heat, keyDown: keyDown } )
    }
  }


  return 90;
}

export default Homing;