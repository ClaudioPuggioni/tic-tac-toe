import Board from "./Board";
import { useState } from "react";
import { Howl } from "howler";
const Osound = new Howl({ src: "assets/Osound.mp3" });
const Xsound = new Howl({ src: "assets/Xsound.mp3" });

let startingBoard = new Array(3).fill(0).map((el) => new Array(3).fill(" "));
let boardHistory = [];

function Game() {
  let [addDisappear, setAddDisappear] = useState(false);
  let [addAppear, setAddAppear] = useState(false);
  let [pregameDisplay, setPregameDisplay] = useState("flex");

  let [currBoard, setCurrentBoard] = useState(startingBoard);
  let [isXPlaying, setIsXPlaying] = useState(true);
  let [gameStatus, setGameStatus] = useState("Starting...");
  let [history, setHistory] = useState(boardHistory);

  function ticTacToeGameStatus(board, player) {
    function hasPlayerWon(player) {
      if (board[0][0] === player && board[0][1] === player && board[0][2] === player) {
        return true;
      } else if (board[1][0] === player && board[1][1] === player && board[1][2] === player) {
        return true;
      } else if (board[2][0] === player && board[2][1] === player && board[2][2] === player) {
        return true;
      } else if (board[0][0] === player && board[1][0] === player && board[2][0] === player) {
        return true;
      } else if (board[0][1] === player && board[1][1] === player && board[2][1] === player) {
        return true;
      } else if (board[0][2] === player && board[1][2] === player && board[2][2] === player) {
        return true;
      } else if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true;
      } else if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
      }
      return false;
    }

    if (hasPlayerWon(player)) {
      return player === "X" ? "Player X has won" : "Player O has won";
    } else if (board[0].includes(" ") || board[1].includes(" ") || board[2].includes(" ")) {
      return "Game in Progress";
    } else {
      return "Draw";
    }
  }

  let handleClick = (row, col) => {
    if (gameStatus.slice(gameStatus.length - 3) !== "won" && gameStatus !== "Draw" && currBoard[row][col] === " ") {
      let copyBoard = JSON.parse(JSON.stringify(currBoard));

      copyBoard[row][col] = isXPlaying ? "X" : "O";
      isXPlaying ? Xsound.play() : Osound.play();

      let temp = history.slice();
      temp.push({ board: copyBoard, currentPlayer: isXPlaying });
      setHistory(temp);

      setCurrentBoard(copyBoard);
      setIsXPlaying(!isXPlaying);

      setGameStatus(ticTacToeGameStatus(copyBoard, isXPlaying ? "X" : "O"));

      if (gameStatus.slice(gameStatus.length - 3) === "won" || gameStatus === "Draw") setIsXPlaying("none");
    }
  };

  let somefunction = (index) => {
    setCurrentBoard(history[index].board);
    setIsXPlaying(!history[index].currentPlayer);
    history = history.slice(0, index + 1);
    setHistory(history);
    if (gameStatus.slice(gameStatus.length - 3) === "won" || gameStatus === "Draw") setGameStatus("Game in Progress");
  };

  function startUp() {
    setAddDisappear("disappearANI");
    setTimeout(() => {
      setPregameDisplay("none");
      setAddAppear("appearANI");
    }, 2000);
  }

  return (
    <div id="body">
      <div id="pregame" onClick={startUp} className={addDisappear} style={{ display: pregameDisplay }}>
        Click Screen to Begin...
      </div>
      <div id="container" className={addAppear}>
        <div id="gameName">
          <h1>Disrespectful</h1> <h1>TicTacToe</h1>
        </div>
        <div id="gameContainer">
          <div id="gameColumn">
            <div id="currentPlayerHeader">
              Current Player:<div id="currentPlayerXO">{isXPlaying ? "X" : "O"}</div>
            </div>
            <Board currentBoardPassed={currBoard} handleClick={handleClick} />
            <div id="progress">Status: {gameStatus}</div>
          </div>
        </div>
        <div id="historyColumn">
          <div id="historyHeader">History</div>
          {history.map((ele, idx) => {
            return (
              <button className="historyButtons" onClick={() => somefunction(idx)}>
                Move #{idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Game;
