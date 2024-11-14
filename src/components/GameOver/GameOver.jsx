export default function GameOver({ winner, restart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>E' un pareggio</p>}
      <p>
        <button onClick={restart}>Restart!</button>
      </p>
    </div>
  );
}
