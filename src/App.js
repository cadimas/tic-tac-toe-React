import React, { Component } from "react";
import "./App.css";
import Board from "./components/board";
import Controls from "./components/controls";
import * as TicTac from "./lib/ticTac.js";

class App extends Component {
  state = {
    board: [
      { id: 0, value: "o" },
      { id: 1, value: "o" },
      { id: 2, value: "" },
      { id: 3, value: "x" },
      { id: 4, value: "x" },
      { id: 5, value: "" },
      { id: 6, value: "" },
      { id: 7, value: "" },
      { id: 8, value: "" }
    ],
    players: "",
    turn: "x",
    gameState: "startPhase",
    whoWon: ""
  };

  //receives state as an argument("x" or "o") and returns an inverted "o" or "x"
  invertState = state => {
    return state === "x" ? "o" : "x";
  };

  handleClick = state => {
    //if square clicked is empty
    if (state.value === "" && this.state.gameState === "onGoing") {
      //because we can't manipulate directly app state
      let cloneState = this.state;

      //updates x or o in state clone board
      cloneState.board[state.id].value = cloneState.turn;

      //if on 1 player mode and there is available squares
      if (
        this.state.players === "1player" &&
        TicTac.makeAvailSpots(cloneState.board).length !== 0
      ) {
        let computerMove = TicTac.minimax(cloneState.board, "o").index;
        cloneState.board[computerMove].value = "o";
      } else {
        //if on 2 player mode inverts symbol for next player
        cloneState.turn = this.invertState(cloneState.turn);
      }

      //updates state
      this.setState({ cloneState }, () => {
        //if any player won
        if (
          TicTac.checkWin(this.state.board, this.invertState(this.state.turn))
        ) {
          this.handleGameEnd(this.invertState(this.state.turn));
        }
        //if there are no available squares meaning it's a draw
        else if (TicTac.makeAvailSpots(cloneState.board).length === 0) {
          this.handleGameEnd("draw");
        }
      });
    }
  };

  //updates gameState to playerPhase
  handleBeggining = () => {
    let cloneState = this.state;
    cloneState.gameState = "playerPhase";
    this.setState({ cloneState });
  };

  //updates gameState to onGoing
  handlePlayerChoice = players => {
    let cloneState = this.state;
    cloneState.players = players;
    cloneState.gameState = "onGoing";
    this.setState({ cloneState });
  };

  //empties the board and sets starting player to "x" then updates states
  handleReset = phase => {
    let cloneState = this.state;
    cloneState.gameState = phase;
    cloneState.turn = "x";
    cloneState.board.map(el => {
      el.value = "";
      return el;
    });

    this.setState({ cloneState });
  };

  //Contructes phrase to be passed to the controls component depending of win or draw
  handleGameEnd = player => {
    let whoWon =
      player === "x" || player === "o"
        ? "player " + player + " won"
        : "It's a draw!";
    let cloneState = this.state;
    cloneState.whoWon = whoWon;
    cloneState.gameState = "finished";
    this.setState({ cloneState });
  };

  render() {
    let boardCssClass = "";
    switch (this.state.gameState) {
      case "finished":
        boardCssClass = "show rubberBand animated";
        break;
      case "onGoing":
        boardCssClass = "show animated fadeIn";
        break;
      default:
        boardCssClass = "hide";
    }

    return (
      <div className="container">
        <div id="title">Tic Tac Toe</div>
        <Controls
          whoWon={this.state.whoWon}
          onRedoPress={this.handleReset}
          onStartPress={this.handleBeggining}
          onPlayerChoice={this.handlePlayerChoice}
          gameState={this.state.gameState}
        />
        <div id="board" className={boardCssClass}>
          <Board onSquarePress={this.handleClick} board={this.state.board} />
        </div>
      </div>
    );
  }
}

export default App;
