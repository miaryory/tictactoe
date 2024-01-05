
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

//The function onSelectSquare is defined in App.jsx
export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard;

    //If turn is an empty, the loop won't do anything
    for (const turn of turns) {
        //Deconstruct props
        const { square, player } = turn;
        const { row, col } = square;

        //Update the element in the array with the player's symbol
        gameBoard[row][col] = player;
    }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((previousGameBoard) => {
    //         //Make a copy of the initialGameBoard array before updating the wanted button
    //         const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     });

    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    );
}