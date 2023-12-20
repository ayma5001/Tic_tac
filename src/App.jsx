import React, { useState } from 'react';
import './App.scss';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(newBoard)) return;
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="app">
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div className="status">{status}</div>
    </div>
  );
}

// Helper function to calculate the winner
function calculateWinner(board) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical lines
    [0, 4, 8], [2, 4, 6]             // Diagonal lines
  ];

  // Iterate through each possible winning line
  for (const [a, b, c] of winningCombinations) {
    // Check if the three cells in the line have the same player's symbol (X or O)
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the symbol of the winner (X or O)
    }
  }

  return null; // If no winner is found, return null
}

export default App;