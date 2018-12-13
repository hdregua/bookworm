
var socket = io();
socket.on('message', writeEvent);
socket.on('letter_basket_init', showLetterBasket);
socket.on('new_letter_basket', showLetterBasket);

var emptyCell = [];

$(document).on('click','.basket-letter-btn',function(){
	var clonedBtn = $(this).clone().removeClass('basket-letter-btn').addClass('rack-letter-btn').attr('parent', $(this).parent().attr('id'));
	$("#rack").append(clonedBtn);
	$(this).remove();
});

$(document).on('click','.rack-letter-btn',function(){
	var clonedBtn = $(this).clone().removeClass('rack-letter-btn').addClass('basket-letter-btn').removeAttr('parent');
	$('#'+$(this).attr('parent')).append(clonedBtn);
	$(this).remove();
});

function writeEvent(text){
  $('#message-container').html(text);
	setTimeout(function(){
		$("#message-container").empty();
	},3000);
};

function tryEvent(text){
	$("#try").empty();
	$('#try').html(text);
}

function showLetterBasket(data) {
	var clonedTable = $("#table-to-clone").clone().attr('id', 'letter-basket');
	$("#init-basket").empty().append(clonedTable);
	$( "#letter-basket" ).find('td').each(function( index ) {
		var clonedBtn = $("#button-to-clone").clone().attr('id', 'btn'+index).addClass('basket-letter-btn').attr('data-points', data.basket[index].points);
		clonedBtn.text(data.basket[index].character);
		$( this ).append(clonedBtn);
	});

	if (!data.turn) {
		$("#submit-btn > button").attr('disabled', true);
		$('.basket-letter-btn').attr('disabled', true);
		$("#refresh-basket-btn > button").attr('disabled', true);
		writeEvent("Opponent's Turn");
	}
}

function submitLetters(){
	var word = ""
	if ($('.rack-letter-btn').length) {
		emptyCell = [];
		$('#rack').find('.rack-letter-btn').each(function( index ) {
			word += $(this).text();
			emptyCell.push($(this).attr('parent'));
		});
		socket.emit('submit_word', word);
	}

	
}

function refreshBasket() {
	socket.emit('refresh_basket');
	$("#rack").empty();
	var element = document.getElementById("lifeUpdate")
	var para = document.createElement("p")
	var node = document.createTextNode("This is new.")
	para.appendChild(node);
	element.appendChild(para)
	tryEvent("HELLO WORLD")

}

socket.on('generated_letters', function(data){
	data.forEach((letter, index) => {
		var clonedBtn = $("#button-to-clone").clone().addClass('basket-letter-btn').removeAttr('id').text(letter.character).attr('disabled', true).attr('data-points', letter.points);
		$('#'+emptyCell[index]).append(clonedBtn);
	})
});

socket.on('opponent_word', function(word) {
	$("#rack").empty();
	for (var i = 0; i < word.length; i++) {
		var clonedBtn = $("#button-to-clone").clone().removeAttr('id');
		clonedBtn.text(word.charAt(i));
		$("#rack").append(clonedBtn);
	}

	writeEvent("Opponent's word:");

	setTimeout(function(){
		$("#rack").empty();
		writeEvent("Your turn");
	}, 3000);
});

socket.on('word_accepted', function(message) {
	socket.emit('generate_letters', $('.rack-letter-btn').length);
	$("#rack").empty();
});

socket.on('your_turn', function(message) {
	$("#submit-btn > button").attr('disabled', false);
	$('.basket-letter-btn').attr('disabled', false);
	$('#refresh-basket-btn > button').attr('disabled', false);
	// writeEvent("Your turn!");
});

socket.on('change_turn', function(message) {
	$("#submit-btn > button").attr('disabled', true);
	$('.basket-letter-btn').attr('disabled', true);
	$('#refresh-basket-btn > button').attr('disabled', true);
	writeEvent("Opponent's Turn")
});

socket.on('update_life', function({l1,l2}) {
	// i += 1
	// $('#life'+i).html(l);
	// console.log(l,i)
	// $('#life1').html(l1);
	// $('#life2').html(l2);
	document.getElementById('life1').style.width = l1+'%';
	// document.getElementById('life1').style.color =  'red';
	document.getElementById('life2').style.width = l2+'%'
	// $('#life2').style.width = temp2;
});

socket.on('display_field', function(response) {
	if(response){
		document.getElementById('gameField').style.visibility = 'hidden'
	} else{
		document.getElementById('gameField').style.visibility = 'visible'
		document.getElementById('loadField').style.visibility = 'hidden'
	}
});

socket.on('character_field',function({name,pic,life,char}){
	var playerPic = document.getElementById('currentPlayerPic')
	var playerId = document.getElementById('currentPlayerId')
	var playerChar = document.getElementById('currentPlayerChar')
	var playerName = document.getElementById('currentPlayerName')

	$('#currentPlayerName').html(name);
	playerPic.src = "../client/img/chars/"+pic;
	playerId.childNodes[1].id = life;
	playerChar.src = "../client/img/chars/"+char;

});

socket.on('opponent_field',function({name,pic,life,char}){
	var playerPic = document.getElementById('opponentPic')
	var playerId = document.getElementById('opponentId')
	var playerChar = document.getElementById('opponentChar')
	var playerName = document.getElementById('opponentName')

	$('#opponentName').html(name);
	playerPic.src = "../client/img/chars/"+pic;
	playerId.childNodes[1].id = life;
	playerChar.src = "../client/img/chars/"+char;

});

