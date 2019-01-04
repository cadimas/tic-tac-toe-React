import React, { Component } from "react";

class Board extends Component {
  render() {
    console.log(this.props);

    return this.props.board.map(square => {
      let state = "square " + square.value;
      return (
        <div
          onClick={() => this.props.onSquarePress(square.value)}
          className={state}
          key={square.id}
        />
      );
    });
  }
}

export default Board;
