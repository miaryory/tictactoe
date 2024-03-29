
import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from './components/winning-combinations';

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_GAME_BOARD = [
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

//This function defines the winner/draw
function deriveWinner(gameBoard, players) {
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
      //Retrieve the winner info from the players's array based on the symbol
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

//This function computes the moves played on the board
function deriveGameBoard(gameTurns) {
  //Compute the button that has been clicked by the player
  ///!\IMMUTABILITY/!\
  //Copy of initialGameBoard = [...initialGameBoard]
  //Deep copy of initialGameBoard = [...initialGameBoard.map(array => [...array])]
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  //If turn is an empty, the loop won't do anything
  for (const turn of gameTurns) {
    //Deconstruct props
    const { square, player } = turn;
    const { row, col } = square;

    //Update the element in the array with the player's symbol
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  //Get the active player without managing extra state
  const activePlayer = derivedActivePlayer(gameTurns);

  //Compute the moves and update the gameboard
  const gameBoard = deriveGameBoard(gameTurns);

  //Define the winner by calling a derived function
  const winner = deriveWinner(gameBoard, players);

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

  //Reset the gameTurns table to let the users play again
  function handleRestart() {
    setGameTurns([]);
  }

  //Get the player's name instead of the symbol only
  function handlePlayerNameChange(symbol, name) {
    //Set the new state as follow since it is based on the previous value of the state
    setPlayers(previousPlayers => {
      return {
        ...previousPlayers,
        //Dynamically set an object property by using the []
        [symbol]: name
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {/* Display a message when the game is over */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
