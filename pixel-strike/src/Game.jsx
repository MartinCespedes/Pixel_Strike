import React from 'react';
import './Game.css';
import RedDestroyer from './assets/Red_Destroyer.gif';
import YellowStreak from './assets/Yellow_Streak.gif';
import BlueLighting from './assets/Blue_Lighting.gif';
import PurpleDestroyer from './assets/Purple_Destroyer.gif';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      gameStarted: false,
      selectedShipIndex: 0,
      shipNames: [
        { name: "Red Destroyer", color: "red", image: RedDestroyer },
        { name: "Lighting Speed", color: "blue", image: BlueLighting },
        { name: "Galaxy Gladiator", color: "purple", image: PurpleDestroyer },
        { name: "Stellar Streak", color: "yellow", image: YellowStreak },
      ],
      shipPosition: {
        x: 375, 
        y: 500
      }
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext('2d');

    this.stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5,
    }));
    this.drawFrame();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  drawFrame = () => {
    const { gameStarted, shipPosition, selectedShipIndex, shipNames } = this.state;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, 800, 600);

      // Draw stars
      this.stars.forEach((star, i) => {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();

        star.size += Math.random() > 0.5 ? 0.2 : -0.2;
        if (star.size < 0) star.size = 0;
        if (star.size > 5) star.size = 5;
      });

      // Draw the ship if the game has started
      if (gameStarted) {
        const shipImage = new Image();
        shipImage.src = shipNames[selectedShipIndex].image;
        this.ctx.drawImage(shipImage, shipPosition.x, shipPosition.y, 50, 50);
      }

      requestAnimationFrame(this.drawFrame);
    }
  };

  handleKeyDown = (event) => {
    const { shipPosition } = this.state;
    switch(event.key) {
      case "ArrowUp":
        this.setState({ shipPosition: {...shipPosition, y: shipPosition.y - 50 }});
        break;
      case "ArrowDown":
        this.setState({ shipPosition: {...shipPosition, y: shipPosition.y + 50 }});
        break;
      case "ArrowRight":
        this.setState({ shipPosition: {...shipPosition, x: shipPosition.x + 50}});
        break;
      case "ArrowLeft":
        this.setState({ shipPosition: {...shipPosition, x: shipPosition.x - 50 }});
        break;
      default:
        break;
    }
  };

  handleKeyUp = (event) => {
    // If needed, you can handle key up events here
  };

  handleShipChange = (direction) => {
    const { selectedShipIndex, shipNames } = this.state;
    let newIndex = selectedShipIndex + direction;

    // Wrap around if the index goes out of bounds
    if (newIndex < 0) newIndex = shipNames.length - 1;
    else if (newIndex >= shipNames.length) newIndex = 0;

    this.setState({ selectedShipIndex: newIndex });
  };

  handleGameStart = () => {
    this.setState({ gameStarted: true });
  };

  render() {
    const { gameStarted, selectedShipIndex, shipNames } = this.state;
    return (
      <div id="layout-container">
        <div id="info-container">
          <div id="game-title">
            <h1>Pixel Strike</h1>
          </div>
          <div id="score-board">
            <h2>Score: <span id="score">0</span></h2>
            <h2>Lives: <span id="lives">3</span></h2>
          </div>
          <div id="ship-selector">
            <button className="arrow-btn" onClick={() => this.handleShipChange(-1)}>&#9664;</button>
            <div className="ship-display">
              <img src={shipNames[selectedShipIndex].image} alt="ship"/>
              <span className={`ship-name ${shipNames[selectedShipIndex].color}`}>{shipNames[selectedShipIndex].name}</span>
            </div>
            <button className="arrow-btn" onClick={() => this.handleShipChange(1)}>&#9654;</button>
            {!gameStarted && <button onClick={this.handleGameStart}>Start Game</button>}
          </div>
        </div>
        <div id="game-container">
          <canvas ref={this.canvasRef} id="game-canvas" width="800" height="600"></canvas>
        </div>
      </div>
    );
  }
}

export default Game;