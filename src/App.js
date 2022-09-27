import './App.css';
import Game from './gameboard/Game.js';
// import { useState, useEffect } from 'react';

function App() {

  return (
    <div className="App" >
      <Game />
    </div>
  );
}

export default App;



/*

import Phaser from 'phaser';

  const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
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

*/

/*

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

*/

/*
  import test from './test.mp3';
  const [audio] = useState(new Audio(test));

  import test from './test.png';
  <img src={test}></img>
*/