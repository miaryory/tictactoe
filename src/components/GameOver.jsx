export default function GameOver({ winner, onRestart }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {/* If there is a winner > display which player won */}
            {/* Display a different error message when it's a draw */}
            {winner ? <p>{winner} won!</p> : <p>It's a draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch</button>
            </p>
        </div>
    );
}