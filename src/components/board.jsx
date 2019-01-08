import React, { Component } from "react";

class Board extends Component {
  render() {
    return this.props.board.map(square => {
      let state = "square " + square.value;
      return (
        <div
          onClick={() => this.props.onSquarePress(square)}
          className={state}
          key={square.id}
        />
      );
    });
  }
}

export default Board;
