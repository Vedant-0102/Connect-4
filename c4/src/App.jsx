import React, { useState } from "react";
import "./App.css";

const MAX_WIDTH = 6;
const MAX_HEIGHT = 6;

const createEmptyGrid = () =>
  Array(MAX_HEIGHT)
    .fill(null)
    .map(() => Array(MAX_WIDTH).fill(null));

const App = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [activePlayer, setActivePlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState("");

  const checkDraw = (grid) => {
    return grid.every(row => row.every(cell => cell !== null));
  };

  const handleDrop = (col) => {
    if (winner || isDraw) return;

    for (let row = MAX_HEIGHT - 1; row >= 0; row--) {
      if (!grid[row][col]) {
        const newGrid = grid.map((r) => [...r]);
        newGrid[row][col] = activePlayer;
        setGrid(newGrid);

        if (checkVictory(newGrid, activePlayer)) {
          setWinner(activePlayer);
        } else if (checkDraw(newGrid)) {
          setIsDraw(true);
        } else {
          setActivePlayer(activePlayer === "X" ? "O" : "X");
        }
        return;
      }
    }
  };

  const checkVictory = (grid, marker) => {
    for (let r = 0; r < MAX_HEIGHT; r++) {
      for (let c = 0; c < MAX_WIDTH; c++) {
        if (
          c + 3 < MAX_WIDTH &&
          grid[r][c] === marker &&
          grid[r][c + 1] === marker &&
          grid[r][c + 2] === marker &&
          grid[r][c + 3] === marker
        )
          return true;

        if (
          r + 3 < MAX_HEIGHT &&
          grid[r][c] === marker &&
          grid[r + 1][c] === marker &&
          grid[r + 2][c] === marker &&
          grid[r + 3][c] === marker
        )
          return true;

        if (
          r + 3 < MAX_HEIGHT &&
          c + 3 < MAX_WIDTH &&
          grid[r][c] === marker &&
          grid[r + 1][c + 1] === marker &&
          grid[r + 2][c + 2] === marker &&
          grid[r + 3][c + 3] === marker
        )
          return true;

        if (
          r + 3 < MAX_HEIGHT &&
          c - 3 >= 0 &&
          grid[r][c] === marker &&
          grid[r + 1][c - 1] === marker &&
          grid[r + 2][c - 2] === marker &&
          grid[r + 3][c - 3] === marker
        )
          return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setWinner(null);
    setIsDraw(false);
    setActivePlayer("X");
    setGameStarted(false);
    setPlayerOne("");
    setPlayerTwo("");
  };

  const closePopup = () => {
    setGrid(createEmptyGrid());
    setWinner(null);
    setIsDraw(false);
    setGameStarted(false);
    setActivePlayer("X");
  };

  const startGame = () => {
    if (!playerOne || !playerTwo) {
      setError("Both player names are required to start the game.");
      return;
    }
    setError("");
    setGameStarted(true);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <div>
          <input
            type="text"
            placeholder="Player One Name"
            value={playerOne}
            onChange={(e) => setPlayerOne(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player Two Name"
            value={playerTwo}
            onChange={(e) => setPlayerTwo(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div>
          <h2>
            {winner
              ? `${winner === "X" ? playerOne : playerTwo} Wins!`
              : isDraw
              ? "Game Draw!"
              : `${activePlayer === "X" ? playerOne : playerTwo}'s Turn`}
          </h2>
          <div className="grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className="cell"
                    onClick={() => handleDrop(colIndex)}
                  >
                    {cell && <span className={`disc ${cell}`}></span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {(winner || isDraw) && (
            <div className="popup">
              <div className="popup-content">
                <h3>
                  {winner
                    ? `${winner === "X" ? playerOne : playerTwo} Wins!`
                    : "Game Draw!"}
                </h3>
                <button onClick={closePopup}>Play Again</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;