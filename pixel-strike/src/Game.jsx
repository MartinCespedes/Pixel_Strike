import React from 'react';
import './Game.css';

class Game extends React.Component {
  render() {
    return (
      <div id="game-container">
        <canvas id="game-canvas" width="800" height="600"></canvas>
        <div id="game-ui">
          <h1>Pixel Strike</h1>
          <div id="score-board">
            <h2>Score: <span id="score">0</span></h2>
            <h2>Lives: <span id="lives">3</span></h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;