import React, { Component } from "react";
import "./App.css";
import Board from "./components/board";

class App extends Component {
  state = {
    board: [
      { id: 0, value: "x" },
      { id: 1, value: "empty" },
      { id: 2, value: "x" },
      { id: 3, value: "x" },
      { id: 4, value: "x" },
      { id: 5, value: "x" },
      { id: 6, value: "x" },
      { id: 7, value: "x" },
      { id: 8, value: "x" }
    ],
    players: undefined
  };

  handleReset = some => {
    console.log(some);
  };

  render() {
    console.log(this.state.players);
    return (
      <div className="container">
        <div id="title">
          Tic Tac Toe
          <span id="arrowLeft" />
          <span id="redo" />
        </div>
        <div className="board">
          <Board onSquarePress={this.handleReset} board={this.state.board} />
        </div>
      </div>
    );
  }
}

export default App;
