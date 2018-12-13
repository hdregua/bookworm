class BookwormGame {

  constructor(players) {
    this._players = players;

    this._sendToPlayers('Let the battle begin!');

    this._players.forEach((player, index) => {
      player.socket.emit('letter_basket_init', {basket: player.letterBasket, turn: index});
    });

    this._players.forEach((player) => {
      player.socket.emit('character_field', {
          name: player.interfaceName,
          pic: player.interfacePic,
          life: player.interfaceLife,
          char: player.interfaceChar
      });
    });

    this._players.forEach((player) => {
      player.socket.emit('opponent_field', {
          name: player.opponentName,
          pic: player.opponentPic,
          life: player.opponentLife,
          char: player.opponentChar
      });
    });
  }

  // _updateLifeStatus()

<<<<<<< HEAD
   _sendToPlayer(playerIndex, msg) {
=======
  _sendToPlayer(playerIndex, msg) {
>>>>>>> 65003168bedf435f72136a2f1de7509db5b82fab
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

  _generateNewLetters(data, playerIndex) {
    this._players[playerIndex]._generateNewLetters(data);
  }

  _sendWordToOpponent(opponentIndex, data) {
    this._players[opponentIndex].socket.emit('opponent_word', data);
  }

  _sendSuccessMessage(playerIndex, points) {
    this._players[playerIndex].socket.emit('word_accepted', points);
  }

<<<<<<< HEAD
=======
  // _updateLifeStatus(){
  //   this._players.forEach((player, index) => {
  //     player.socket.emit('update_life', {l: player.life, i:index});
  //   });
  // }
>>>>>>> 65003168bedf435f72136a2f1de7509db5b82fab
}

module.exports = BookwormGame;