import React, { Component } from "react";

class Controls extends Component {
  render() {
    let startButtonClass =
      this.props.gameState === "startPhase" ? "show" : "hide";
    let buttonsClass = this.props.gameState !== "onGoing" ? "hide" : "show";
    let playerButtonClass =
      this.props.gameState === "playerPhase"
        ? "playerChoice show"
        : "playerChoice hide";

    return (
      <div id="controls">
        <span
          id="start"
          className={startButtonClass}
          onClick={() => this.props.onStartPress()}
        >
          Start Game
        </span>
        <span
          className={playerButtonClass}
          onClick={() => this.props.onPlayerChoice("1player")}
        >
          1 Player
        </span>
        <span
          className={playerButtonClass}
          onClick={() => this.props.onPlayerChoice("2player")}
        >
          2 Player
        </span>
        <span
          className={buttonsClass}
          onClick={() => this.props.onArrowLeftPress()}
          id="arrowLeft"
        />
        <span
          className={buttonsClass}
          onClick={() => this.props.onRedoPress()}
          id="redo"
        />
      </div>
    );
  }
}

export default Controls;
