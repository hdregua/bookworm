class Player{
	
	constructor(socket) {
		this.life = 100;
		this.socket = socket;
	}

	_initializeBasket(){
		this.letterBasket = this._generateLetters(12);
	}

	_generateLetters(count){
		const vowels = 'AEIOU';
		const letters = 'AABBBCCCDDEEFFGGHHIIJJKKLLMMNNNOOPPQRRSSSTTUUVVWXYYYZ';
		var lettersGen = [];

		var vowels_count = Math.ceil(count*0.2);

		for (var i = 0; i < vowels_count; i++) {
			var idx = Math.floor(Math.random() * 5);
			let lett = this._characterizeLetter(vowels.charAt(idx));
			lettersGen.push(lett);
		}
		for (var i = 0; i < count-vowels_count; i++) {
			var idx = Math.floor(Math.random() * letters.length);
			let lett = this._characterizeLetter(letters.charAt(idx));
			lettersGen.push(lett);
		}
		return lettersGen;
	}

	_generateNewLetters(count) {
		var lettersGen = this._generateLetters(count)
		this.socket.emit('generated_letters', lettersGen);
	}

	_characterizeLetter(letter){
		const point1 = 1;
		const point2 = 2;
		const point3 = 3;
		const point4 = 4;
		const point5 = 5;
		const point6 = 8;
		const point7 = 10;

		var potion=null;

		const points = {
			A:point1,B:point3,C:point3,D:point2,E:point1,F:point4,G:point2,
			H:point4,I:point1,J:point6,K:point5,L:point1,M:point3,
			N:point1,O:point1,P:point3,Q:point7,R:point1,S:point1,T:point1,
			U:point1,V:point4,W:point4,X:point6,Y:point4,Z:point7
		}
		return {character: letter, points: points[letter], potion: potion};
	}

}

module.exports = Player;