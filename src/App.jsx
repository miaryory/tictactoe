
import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from './components/winning-combinations';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

//Create an helper function to trace the active player
//This function doesn't need to access the state of the component and shouldn't be recreated during rendering
function derivedActivePlayer(gameTurns) {
  //Use a derived state to store the current active player
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }

  return activePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  //Get the active player without managing extra state
  const activePlayer = derivedActivePlayer(gameTurns);

  //Compute the button that has been clicked by the player
  let gameBoard = initialGameBoard;

  //If turn is an empty, the loop won't do anything
  for (const turn of gameTurns) {
    //Deconstruct props
    const { square, player } = turn;
    const { row, col } = square;

    //Update the element in the array with the player's symbol
    gameBoard[row][col] = player;
  }

  //Check if there is a winner
  //Since this is part of the App component, it will be rendered after every turn
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    //Check in the gameBoard for all possible winning combinations (defined in the file)
    //We check each combination of 3 based on row and column
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    //Check if they are not null and equal
    //null means that it has not been selected by a player yet
    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      //Set it to the symbol of the player who won
      winner = firstSquareSymbol;
    }
  }

  //Handle the case where we have a draw
  //It is the case when all the turns have passed (9) and there is no winner
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(previousTurns => {
      let currentPlayer = derivedActivePlayer(previousTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...previousTurns
      ];

      //gameTurns is now equal to updatedTurns
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {/* Display a message when there is a winner */}
        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
