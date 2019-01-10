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
    let whoWonClass =
      this.props.gameState === "finished" ? "show whoWon" : "hide whoWon";

    return (
      <div id="controls">
        <div className={whoWonClass}>{this.props.whoWon}!Play again?</div>
        <span
          onClick={() => this.props.onRedoPress("onGoing")}
          className={whoWonClass}
        >
          Yes
        </span>
        <span
          onClick={() => this.props.onRedoPress("startPhase")}
          className={whoWonClass}
        >
          No
        </span>
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
          onClick={() => this.props.onRedoPress("onGoing")}
          id="redo"
        />
      </div>
    );
  }
}

export default Controls;
