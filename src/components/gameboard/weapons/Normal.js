import NormalBullet from '../playerBullets/NormalBullet.js';

const Normal = (scene, x, y, heat, keyDown) => {
  if (!scene) {
    return 'Normal';
  }
  if (keyDown) {
    new NormalBullet({ scene: scene, x: x - 10, y: y - 5, dx: 0, dy: -400, keyDown: keyDown });
    new NormalBullet({ scene: scene, x: x + 10, y: y - 5, dx: 0, dy: -400, keyDown: keyDown });
    if (heat >= 2) {
      new NormalBullet({ scene: scene, x: x - 20, y: y - 5, dx: 0, dy: -400, keyDown: keyDown });
      new NormalBullet({ scene: scene, x: x + 20, y: y - 5, dx: 0, dy: -400, keyDown: keyDown });
    }
    if (heat >= 3) {
      new NormalBullet({ scene: scene, x: x - 30, y: y - 5, dx: 0, dy: -400, keyDown: keyDown });
      new NormalBullet({ scene: scene, x: x + 30, y: y - 5, dx: 0, dy: -400, keyDown: keyDown });
    }
  } else {
    new NormalBullet({ scene: scene, x: x, y: y - 5, dx: -250, dy: -400, keyDown: keyDown });
    new NormalBullet({ scene: scene, x: x, y: y - 5, dx: 250, dy: -400, keyDown: keyDown });
    if (heat >= 2) {
      new NormalBullet({ scene: scene, x: x - 15, y: y - 5, dx: -250, dy: -400, keyDown: keyDown });
      new NormalBullet({ scene: scene, x: x + 15, y: y - 5, dx: 250, dy: -400, keyDown: keyDown });
    }
    if (heat >= 3) {
      new NormalBullet({ scene: scene, x: x - 25, y: y - 5, dx: -250, dy: -400, keyDown: keyDown });
      new NormalBullet({ scene: scene, x: x + 25, y: y - 5, dx: 250, dy: -400, keyDown: keyDown });
    }
  }

  return 300;
}

export default Normal;