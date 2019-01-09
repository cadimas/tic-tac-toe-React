import React, { Component } from "react";
import "./App.css";
import Board from "./components/board";
import Controls from "./components/controls";
import * as TicTac from "./lib/ticTac.js";

class App extends Component {
  state = {
    board: [
      { id: 0, value: "empty" },
      { id: 1, value: "empty" },
      { id: 2, value: "empty" },
      { id: 3, value: "empty" },
      { id: 4, value: "empty" },
      { id: 5, value: "empty" },
      { id: 6, value: "empty" },
      { id: 7, value: "empty" },
      { id: 8, value: "empty" }
    ],
    players: "sth",
    turn: "x",
    gameState: "startPhase",
    whoWon:""
  };

  //receives state as an argument("x" or "o") and returns an inverted "o" or "x"
  invertState = state => {
    return state === "x" ? "o" : "x";
  };

  handleClick = state => {
    if (state.value === "empty") {
      //because we can't manipulate directly app state
      let cloneState = this.state;

      //updates x or o in state clone board
      cloneState.board[state.id].value = cloneState.turn;

      //updates turn for next player
      cloneState.turn = this.invertState(cloneState.turn);

      //updates state
      this.setState({ cloneState }, () => {
        //if some player won
        if (
          TicTac.checkWin(this.state.board, this.invertState(this.state.turn))
        ) {
          this.handleGameEnd(this.invertState(this.state.turn));
        }
      });
    }
  };

  handleBeggining = () => {
    let cloneState = this.state;
    cloneState.gameState = "playerPhase";
    this.setState({ cloneState });
  };

  handlePlayerChoice = players => {
    let cloneState = this.state;
    cloneState.players = players;
    cloneState.gameState = "onGoing";
    this.setState({ cloneState });
  };

  handleReset = () => {
    let cloneState = this.state;
    cloneState.board.map(el => {
      el.value = "empty";
      return el;
    });
    cloneState.turn = "x";
    this.setState({ cloneState });
  };

  handleGoBack = () => {
    console.log("tryed to go back");
  };

  handleGameEnd = player => {
    let whoWon = (player === "x" || player ==="o") ? "player " + player + " won": "It's a draw!";
    let cloneState = this.state;
    cloneState.whoWon = whoWon;
    cloneState.gameState = "finished";
    this.setState({ cloneState });
  };

  render() {
    let boardCssClass = "";
    switch(this.state.gameState){
      case "finished":  boardCssClass = "opaque"; break;
      case "onGoing": boardCssClass = "show";break;
      default: boardCssClass ="hide";
    } 
    return (
      <div className="container">
        <div id="title">Tic Tac Toe</div>
        <Controls
          whoWon={this.state.whoWon}
          onRedoPress={this.handleReset}
          onArrowLeftPress={this.handleGoback}
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
