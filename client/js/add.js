
var socket = io();
socket.on('message', writeEvent);
socket.on('letter_basket_init', showLetterBasket);
socket.on('new_letter_basket', showLetterBasket);

var emptyCell = [];

<<<<<<< HEAD
$(document).on('click','.basket-letter',function(){
		var clonedBtn = $(this).clone().removeClass('basket-letter').addClass('rack-letter').attr('parent', $(this).parent().attr('id'));
		$("#rack").append(clonedBtn);
		$(this).remove();
	});

	$(document).on('click','.rack-letter',function(){
		var clonedBtn = $(this).clone().removeClass('rack-letter').addClass('basket-letter').removeAttr('parent');
		$('#'+$(this).attr('parent')).append(clonedBtn);
		$(this).remove();
	});

	function writeEvent(text){
	  $('#message-container').html(text);
		setTimeout(function(){
			$("#message-container").empty();
		},3000);
	};

	function showLetterBasket(data) {
		$(".controls").css('visibility', 'visible');
		$("#legends").show();
		var clonedTable = $("#table-to-clone").clone().attr('id', 'letter-basket');
		$("#init-basket").empty().append(clonedTable);
		$( "#letter-basket" ).find('td').each(function( index ) {
			var clonedBtn = $("#button-to-clone").clone().attr('id', 'btn'+index).addClass('basket-letter letter-btn').attr({'data-points': data.basket[index].points, 'data-potion':data.basket[index].potion});
			if (data.basket[index].potion){
				clonedBtn.addClass(data.basket[index].potion+"-btn")
			}
			clonedBtn.text(data.basket[index].character);
			$( this ).append(clonedBtn);
		});

		if (!data.turn) {
			$('.basket-letter').attr('disabled', true);
			$(".controls").css('visibility', 'hidden');
			writeEvent("Opponent's Turn");
		}
	}

	function submitLetters(){
		letters = []
		var word = ""
		if ($('.rack-letter').length >= 3) {
			emptyCell = [];
			$('#rack').find('.rack-letter').each(function( index ) {
				word += $(this).text();
				emptyCell.push($(this).attr('parent'));
				letters.push({points: $(this).attr('data-points'), potion: $(this).attr('data-potion')})
			});
			socket.emit('submit_word', {word:word, letters: letters});
		} else {
			writeEvent("Should be atleast 3 letters.");
		}
	}

	function refreshBasket() {
		socket.emit('refresh_basket');
		$("#rack").empty();
	}

	socket.on('generated_letters', function(data){
		data.letters.forEach((letter, index) => {
			var clonedBtn = $("#button-to-clone").clone().addClass('basket-letter letter-btn').removeAttr('id').text(letter.character).attr({'data-points': letter.points, 'data-potion':letter.potion});
			if (letter.potion){
				clonedBtn.addClass(letter.potion+"-btn")
			}
			if (data.changeTurn) {
				clonedBtn.attr('disabled', true)
			}
			$('#'+emptyCell[index]).append(clonedBtn);
		});
	});

	socket.on('opponent_word', function(data) {
		console.log(data);
		$("#rack").empty();
		for (var i = 0; i < data.word.length; i++) {
			var clonedBtn = $("#button-to-clone").clone().removeAttr('id').addClass('letter-btn').attr({'data-points': data.letters[i].points, 'data-potion':data.letters[i].potion}).text(data.word.charAt(i));
			clonedBtn.text(data.word.charAt(i));
			if (data.letters[i].potion){
				clonedBtn.addClass(data.letters[i].potion+"-btn")
			}
			console.log(clonedBtn[0].outerHTML)
			$("#rack").append(clonedBtn);
		}

		writeEvent("Opponent's word:");

		setTimeout(function(){
			$("#rack").empty();
			showPoints(data.points);
			if (data.changeTurn) {
				writeEvent("Your turn");
			}
			
		}, 3000);
	});

	socket.on('word_accepted', function(data) {
		// writeEvent(points+" points");
		socket.emit('generate_letters', {count: $('.rack-letter').length, changeTurn: data.changeTurn});
		$("#rack").empty();
		showPoints(data.points);
	});

	socket.on('your_turn', function(message) {
		$('.basket-letter').attr('disabled', false);
		$('.controls').css('visibility', 'visible');
		// writeEvent("Your turn!");
	});

	socket.on('change_turn', function(message) {
		$('.basket-letter').attr('disabled', true);
		$('.controls').css('visibility', 'hidden');
		writeEvent("Opponent's Turn")
	});


	function showPoints(points){
		$("#score").text(points+" pts");
		$("#burst-12").show();
		
		setTimeout(function(){
			$("#score").text("");
			$("#burst-12").hide();
		}, 3000);
	}
=======
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
>>>>>>> 65003168bedf435f72136a2f1de7509db5b82fab

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

