import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Logger from "./components/Loggin/Logger";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./assets/WinningCombo";
import GameOver from "./components/GameOver/GameOver";
let baseGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function changeTurn(array) {
  let player = "X";
  if (array.length > 0 && array[0].player == "X") {
    player = "O";
  }
  return player;
}

function App() {
  let gameBoard = [...baseGameBoard.map((a) => [...a])];
  let [logTurni, setLogTurni] = useState([]);
  let [players, setPlayer] = useState({ X: "Player 1", O: "Player 2" });
  let player = changeTurn(logTurni);
  let draw;
  let winner;

  if (logTurni.length == 9) {
    draw = logTurni.length;
  }

  function playerMove(rowIndex, colIndex) {
    setLogTurni((oldTurno) => {
      let player = changeTurn(oldTurno);
      let a = [
        { square: { row: rowIndex, col: colIndex }, player: player },
        ...oldTurno,
      ];
      return a;
    });
  }

  function changeName(symbol, name) {
    setPlayer((oldName) => {
      return {
        ...oldName,
        [symbol]: name,
      };
    });
  }

  function restart() {
    setLogTurni([]);
  }

  if (logTurni.length > 0) {
    logTurni.forEach((element) => {
      let { square, player } = element;
      let { row, col } = square;
      gameBoard[row][col] = player;
    });
  }

  WINNING_COMBINATIONS.forEach((element) => {
    let firstSquaresymbol = gameBoard[element[0].row][element[0].column];
    let secondSquaresymbol = gameBoard[element[1].row][element[1].column];
    let thirdSquaresymbol = gameBoard[element[2].row][element[2].column];
    if (
      firstSquaresymbol &&
      firstSquaresymbol === secondSquaresymbol &&
      firstSquaresymbol === thirdSquaresymbol
    ) {
      winner = players[firstSquaresymbol];
    }
  });

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            startName={"Player 1"}
            symbol={"X"}
            isActive={player == "X"}
            changeName={changeName}
          ></Player>
          <Player
            startName={"Player 2"}
            symbol={"O"}
            isActive={player == "O"}
            changeName={changeName}
          ></Player>
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} restart={restart}></GameOver>
        )}
        <GameBoard onPlayerMove={playerMove} board={gameBoard}></GameBoard>
      </div>
      <Logger logs={logTurni}></Logger>
    </main>
  );
}

export default App;
