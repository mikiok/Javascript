var Warrior = function(min, max){
	this.health = this._randomNumber(80, 100);
	this.strength = this._randomNumber(min, max);
};

Warrior.prototype._randomNumber = function(min, max){
	return (Math.floor(Math.random() * (max - min)) + min);
};

Warrior.prototype.makeDamage = function() {
	return this.strength;
};

Warrior.prototype.recieveDamage = function(damage) {
	this.health -= damage;
};



var Viking = function(name) {
	Warrior.call(this, 20, 30);
	this.name = name;
};

Viking.prototype = Object.create(Warrior.prototype);

Viking.prototype.constructor = Viking;



var Saxon = function() {
	Warrior.call(this, 5, 15);
};

Saxon.prototype = Object.create(Warrior.prototype);

Saxon.prototype.constructor = Saxon;



var vikingsVillage = function() {
	this.citizens = 0;
	this.warriors = [];
}

vikingsVillage.prototype.addViking = function(viking) {
	this.warriors.push(viking);
	this.citizens++;
};

vikingsVillage.prototype.chooseViking = function() {
	return this.warriors[Math.floor(Math.random() * (this.citizens)) + 0];
};

vikingsVillage.prototype.pitFight = function() {
	var viking1 = this.chooseViking();
	var viking2;
	if((viking2 = this.chooseViking()) === viking1){
		while (viking1 === viking2){
			viking2 = this.chooseViking();
		}
	}
	var turns = 5;
	var winner = -1;
	while ((winner == -1) && (turns > 0)){
		if((winner = this.winner(viking1, viking2)) == -1){
			viking1.recieveDamage(viking2.makeDamage());
			viking2.recieveDamage(viking1.makeDamage());
		}
		turns--;
	}
	if (winner === 0){
		console.log("Nobody lost his honor")
	}
	else if(turns == 0){
		console.log("The battle didn't finish");
	}
	else{
		console.log("the viking " + winner + " won the training. The other lost his honor");
	}
};

vikingsVillage.prototype.winner = function(warrior1, warrior2) {
	var winner;
	if((warrior1.health <= warrior2.strength) && (warrior2.health <= warrior1.strength)){
		winner = 0;
	}
	else if(warrior2.health <= warrior1.strength){
		winner = 1;
	}
	else if(warrior1.health <= warrior2.strength){
		winner = 2;
	}
	else{
		winner = -1;
	}
	return winner;
};



var saxonsVillage = function() {
	this.citizens = 0;
	this.warriors = [];
};

saxonsVillage.prototype.addSaxon = function(saxon) {
	this.warriors.push(saxon);
	this.citizens++;
};

saxonsVillage.prototype.chooseSaxon = function() {
	return this.warriors[Math.floor(Math.random() * (this.citizens)) + 0];
};



var War = function(village1, village2) {
	this.village1 = village1;
	console.log(this.village1);
	this.village2 = village2;
	console.log(this.village2);
}

War.prototype.battle = function() {
	while((this.village1.citizens > 0) && (this.village2.citizens > 0)){
		var warrior1 = this.chooseWarrior(this.village1.citizens);
		var warrior2 = this.chooseWarrior(this.village2.citizens);
		var turns = 5;
		var winner = -1;
		while ((winner == -1) && (turns > 0)){
			if((winner = this.winner(this.village1.warriors[warrior1], this.village2.warriors[warrior2])) == -1){
				this.village1.warriors[warrior1].recieveDamage(this.village2.warriors[warrior2].makeDamage());
				this.village2.warriors[warrior2].recieveDamage(this.village1.warriors[warrior1].makeDamage());
			}
			turns--;
		}
		winner = this.winner(this.village1.warriors[warrior1], this.village2.warriors[warrior2]);
		if (winner === -1){
			console.log("Nobody Died");
		}
		else{
			this.dead(warrior1, warrior2);
		}
		console.log(this.village1);
		console.log(this.village2);
	}
};

War.prototype.chooseWarrior = function(citizens) {
	return Math.floor(Math.random() * (citizens)) + 0;
};


War.prototype.winner = function(warrior1, warrior2) {
	var winner;

	if(warrior1.health <= 0 || warrior2.health <= 0){
		winner = 1;
	}
	else{
		winner = -1;
	}
	return winner;
};

War.prototype.dead = function(warrior1, warrior2) {
	if(this.village1.warriors[warrior1].health <= 0){
		this.village1.warriors.splice(warrior1, 1);
		this.village1.citizens--;
		console.log("A viking died");
	}

	if(this.village2.warriors[warrior2].health <= 0){
		this.village2.warriors.splice(warrior2, 1);
		this.village2.citizens--;
		console.log("A saxon died");
	}
};


var vikingsVillage = new vikingsVillage();

var viking1 = new Viking("Juán");
vikingsVillage.addViking(viking1);
var viking2 = new Viking("Vinicio");
vikingsVillage.addViking(viking2);
var viking3 = new Viking("Vidri");
vikingsVillage.addViking(viking3);
var viking4 = new Viking("Miguel");
vikingsVillage.addViking(viking4);
var viking5 = new Viking("Guli");
vikingsVillage.addViking(viking5);

var saxonsVillage = new saxonsVillage();

for (var i = 0; i < 12; i++){
	var saxon = new Saxon();
	saxonsVillage.addSaxon(saxon);
}

var worldWar = new War(vikingsVillage, saxonsVillage);
worldWar.battle();