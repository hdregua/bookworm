class BookwormGame {

  constructor(players) {
    this._players = players;

    this._sendToPlayers('Let the battle begin!');

    this._players.forEach((player, index) => {
      player.socket.emit('letter_basket_init', {basket: player.letterBasket, turn: index});
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

  _changeTurn(opponentIndex){
    this._players[(opponentIndex)].socket.emit('your_turn', 'Your turn!');
    this._players[(opponentIndex+1)%2].socket.emit('change_turn', 'Opponent\'s turn!');
  }

  _refreshBasket(playerIndex) {
    this._players[playerIndex]._refreshBasket();
  }

  _generateNewLetters(count, playerIndex) {
    this._players[playerIndex]._generateNewLetters(count);
  }

  _sendToOpponent(opponentIndex, word) {
    this._players[opponentIndex].socket.emit('opponent_word', word);
  }

  _sendSuccessMessage(playerIndex) {
    this._players[playerIndex].socket.emit('word_accepted', "10 points");
  }
}

module.exports = BookwormGame;