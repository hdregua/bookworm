var express = require('express');
var app = express();
var server = require('http').Server(app);

const BookwormGame = require('./bookworm');
const Player = require('./player');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(2000);
console.log("Server Started");

var waitingPlayer = null;
var opponent = null;
var players = [];

var io = require('socket.io')(server, {});
var game = null;
io.sockets.on('connection', function(socket){
	players.push(new Player(socket));
	if (players.length == 2) {
		players.forEach((player)=>{player._initializeBasket()})
		game = new BookwormGame(players);
	} else {
		players[0].socket.emit('message', 'Waiting for an opponent');
	}

	socket.on('disconnect', function(){
		game = null;
		players[0].socket == socket ? players.splice(0, 1) : players.splice(1, 1);
	});

	socket.on('generate_letters', function(count){
		var playerIndex = players[0].socket == socket ? 0 : 1;
		game._generateNewLetters(count, playerIndex);
	});

	socket.on('message', function(text){
		io.emit('message', text)
	});

	socket.on('refresh_basket', function(){
		var playerIndex = players[0].socket == socket ? 0 : 1;
		game._refreshBasket(playerIndex);
		game._changeTurn((playerIndex+1)%2);
		game._sendToPlayer((playerIndex+1)%2, "Your turn!")
	});

	socket.on('submit_word', function(word) {
		var checkWord = require('check-word');
		var dictionary  = checkWord('en');
		var opponentIndex = players[0].socket == socket ? 1 : 0;

		if(dictionary.check(word.toLowerCase())){
			game._sendToOpponent(opponentIndex, word);
			game._changeTurn(opponentIndex);
			game._sendSuccessMessage((opponentIndex+1)%2);
		} else {
			game._sendToPlayer((opponentIndex+1)%2, "Invalid Word!");
		}
	});
})

// console.log(words.check('doggoss'));
