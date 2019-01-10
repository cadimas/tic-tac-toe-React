import React, { Component } from "react";

class Board extends Component {
  render() {
    return this.props.board.map(square => {
      //prepares state("x", "o" , "") to take in value from board
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
