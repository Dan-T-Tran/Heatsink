import MeleeBullet from '../playerBullets/MeleeBullet.js';

const Melee = (scene, x, y, heat, keyDown) => {
  if (!scene) {
    return 'Melee';
  }

  if (keyDown) {
      new MeleeBullet( {scene: scene, x: x, y: y - 20, dx: 0, dy: -1100, heat: heat, keyDown: keyDown } )
    if (heat >= 2) {
      new MeleeBullet( {scene: scene, x: x - 75, y: y - 20, dx: 250, dy: -1100, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x + 75, y: y - 20, dx: -250, dy: -1100, heat: heat, keyDown: keyDown } )
    }
    if (heat >= 3) {
      new MeleeBullet( {scene: scene, x: x - 125, y: y - 20, dx: 350, dy: -1100, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x + 125, y: y - 20, dx: -350, dy: -1100, heat: heat, keyDown: keyDown } )
    }
  } else {
    new MeleeBullet( {scene: scene, x: x, y: y, dx: -300, dy: -700, heat: heat, keyDown: keyDown } )
    new MeleeBullet( {scene: scene, x: x, y: y, dx: 300, dy: -700, heat: heat, keyDown: keyDown } )
    new MeleeBullet( {scene: scene, x: x, y: y, dx: -700, dy: 0, heat: heat, keyDown: keyDown } )
    new MeleeBullet( {scene: scene, x: x, y: y, dx: 700, dy: 0, heat: heat, keyDown: keyDown } )
    if (heat >= 2) {
      new MeleeBullet( {scene: scene, x: x, y: y, dx: -500, dy: -500, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x, y: y, dx: 500, dy: -500, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x, y: y, dx: -300, dy: 700, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x, y: y, dx: 300, dy: 700, heat: heat, keyDown: keyDown } )
    }
    if (heat >= 3) {
      new MeleeBullet( {scene: scene, x: x, y: y, dx: -700, dy: -300, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x, y: y, dx: 700, dy: -300, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x, y: y, dx: -500, dy: 500, heat: heat, keyDown: keyDown } )
      new MeleeBullet( {scene: scene, x: x, y: y, dx: 500, dy: 500, heat: heat, keyDown: keyDown } )
    }
  }

  return 400;
};

export default Melee;