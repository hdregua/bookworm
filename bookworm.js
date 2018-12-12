class BookwormGame {

  constructor(players) {
    this._players = players;

    this._sendToPlayers('Let the battle begin!');

    this._players.forEach((player) => {
      player.socket.emit('letter_basket_init', player.letterBasket);
    });
  }

  _sendToPlayer(playerIndex, msg) {
    this._players[playerIndex].socket.emit('message', msg);
  }

  _sendToPlayers(msg) {
    this._players.forEach((player) => {
      player.socket.emit('message', msg);
    });
  }

  _generateNewLetters(count, playerIndex) {
    this._players[playerIndex]._generateNewLetters(count);
  }

  _sendToOpponent(opponentIndex, word) {
    this._players[opponentIndex].socket.emit('opponent_word', word);
  }
}

module.exports = BookwormGame;