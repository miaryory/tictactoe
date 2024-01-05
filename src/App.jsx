
import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

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
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} turns={gameTurns} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
