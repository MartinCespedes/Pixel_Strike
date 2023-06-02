import React from 'react';
import './Game.css';
// import spaceship from './assets/spaceship_svg.svg'; 

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5,
    }));

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star, i) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        star.size += Math.random() > 0.5 ? 0.2 : -0.2;
        if (star.size < 0) star.size = 0;
        if (star.size > 5) star.size = 5;
      });

      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }


  
  
  state = {
    selectedShipIndex: 0,
    shipNames: [
      { name: "Red Destroyer", color: "red" },
      { name: "Lighting Speed", color: "blue" },
      { name: "Galaxy Gladiator", color: "purple" },
      { name: "Stellar Streak", color: "yellow" },
    ],
  }

  handleShipChange = (direction) => {
    const { selectedShipIndex, shipNames } = this.state;
    let newIndex = selectedShipIndex + direction;

    // Wrap around if the index goes out of bounds
    if (newIndex < 0) newIndex = shipNames.length - 1;
    else if (newIndex >= shipNames.length) newIndex = 0;

    this.setState({ selectedShipIndex: newIndex });
  }

  render() {
    const { selectedShipIndex, shipNames } = this.state;
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
            <button className="arrow-btn" onMouseDown={() => this.setState({leftPressed: true})} onMouseUp={() => this.setState({leftPressed: false})} onClick={() => this.handleShipChange(-1)}>&#9664;</button>
            <div className="ship-display">
          <img src="placeholder.png" alt="ship"/> {/* Replace "placeholder.png" with the path to your image */}
          <span className={`ship-name ${shipNames[selectedShipIndex].color}`}>{shipNames[selectedShipIndex].name}</span>
        </div>
            <button className="arrow-btn" onMouseDown={() => this.setState({rightPressed: true})} onMouseUp={() => this.setState({rightPressed: false})} onClick={() => this.handleShipChange(1)}>&#9654;</button>
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