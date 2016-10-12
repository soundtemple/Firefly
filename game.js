console.log('Lets go!');

// Global variables
var board = [];
var players = ['Player1', 'Player2']
var playerPos = [0,0];
var boardRows = 5; // potentiallly not required in new format
var boardCols = 5; //
var currentPlayer = 0;
var diceSize = 6; // thrust potential
var planets = [];

// Set up board in DOM
function createGrid() {
  for (var r=boardRows; r>0; r--) {
    var rowId = 'divRow' + r; //create if for the div
    var $newDiv = $("<div>").attr('id', rowId).addClass("gridRow"); //create and empty div with iD
    var $divLoc = $('.board'); //locate div container;
    $divLoc.append($newDiv);
    for (var c=0; c<boardCols; c++) {
      var cellId = 'cell' + (boardCols * (r-1) + c);
      console.log(rowId + ' ' + (boardCols * (r-1)) + cellId);
      var $newCell = $("<div>").attr('id', cellId).addClass("gridCell");
      var $cellLoc = $('.gridRow').eq(boardRows - r);
      $cellLoc.append($newCell);
    }
  }
};


// Console for game information
function gameMessaging(msg2Console) {
  var newItem = $("<li>").text(msg2Console);       // Create a <li> node
  var list = $('#messaging-list');    // Get the <ul> element to insert a new node
  list.prepend(newItem);  // Insert <li> before the first child of <ul>
}

function updatePlayerInfo() {
  var player1Info = players[0] + ' @ ' + planets[playerPos[0]] + ' $' + playerPos[0];
  var player2Info = players[1] + ' @ ' + planets[playerPos[1]] + ' $' + playerPos[1];
  $('#player-one').text(player1Info);
  $('#player-two').text(player2Info);
}

// player move
function playerMove(){
  playerPosition(currentPlayer);
  nextPlayer();
};

// Dice Roll
function rollDice(){
  var roll = Math.floor((Math.random() * diceSize)+1);
  // console.log('Player ' + currentPlayer + ' rolls a ' + roll);
  return roll;
};

// update currentPlayer
function nextPlayer() {
  currentPlayer+=1;
  if (currentPlayer>1){
    currentPlayer=0;
  }
  return currentPlayer;
};

// player position
function playerPosition(currentPlayer) {
  var roll = rollDice();
  playerPos[currentPlayer]+= roll;
  checkWinner(roll, currentPlayer);
  var adj4holeCorridor = check4HolesCorridors(playerPos[currentPlayer]);
  playerPos[currentPlayer]+= adj4holeCorridor;
  updatePlayerPostion(playerPos[currentPlayer]);
  gameMessaging(players[currentPlayer] + ' rolls a ' + roll + ' & moves to ' + planets[playerPos[currentPlayer]]);
};

// check if winner
function checkWinner(move, currentPlayer) {
  winningValue = getBoardSize();
  if (playerPos[currentPlayer] === winningValue) {
    winner(currentPlayer);
    };
  if (playerPos[currentPlayer] > winningValue) {
    gameMessaging(players[currentPlayer] + ' is OVER!')
    playerPos[currentPlayer]-= move;
    };
};

// winner
function winner(currentPlayer) {
  updatePlayerPostion();
  var winnerMessage = '****** '+ players[currentPlayer] + ' is the winner!!!!! ******';
  if (currentPlayer === 0 ){
    $('#player-one').text(winnerMessage);
  }
  if (currentPlayer === 1 ){
    $('#player-two').text(winnerMessage);
  }
  gameMessaging(winnerMessage);
  resetGame();
};

// update player position
function updatePlayerPostion(currentPlayerPos) {
  // console.log(players[currentPlayer] + ' has arrived at ' + planets[currentPlayerPos]);
  // gameMessaging(players[currentPlayer] + ' has arrived at ' + planets[currentPlayerPos]);
  // console.log(players[0] + ' Position = ' + playerPos[0] + ' ' + players[1] + '  Position = ' + playerPos[1]);
  // gameMessaging(players[0] + ' Position = ' + playerPos[0] + ' ' + players[1] + '  Position = ' + playerPos[1]);
  updatePlayerInfo();
};

function check4HolesCorridors(currentPlayerPos) {
  var holeCorridorVal = 0;
  if (board[currentPlayerPos] != 'x') {
    holeCorridorVal = board[currentPlayerPos];
    if (holeCorridorVal < 0) {
      // console.log('Oh no ' + players[currentPlayer] + ' a black hole!!!! Go back to ' + planets[currentPlayerPos + holeCorridorVal]);
      gameMessaging('Oh no ' + players[currentPlayer] + ' a black hole!!!! Go back to ' + planets[currentPlayerPos + holeCorridorVal]);
    };
    if (holeCorridorVal > 0) {
      // console.log('Yes ' + players[currentPlayer] + ' a Time Corridor. Move forward to ' + planets[currentPlayerPos + holeCorridorVal]);
      gameMessaging('Yes ' + players[currentPlayer] + ' a Time Corridor. Move forward to ' + planets[currentPlayerPos + holeCorridorVal]);
    };
  }
  return holeCorridorVal;
};

// reset game parameters
function resetGame() {
  gameMessaging('******** GAME RESET ********');
  playerPos = [0,0];
  setComplexity();
  $('.board').empty();
  createBoard();
};

function startGame() {
  playerPos = [0,0];
  setComplexity();
  $('.board').empty();
  createBoard();
  $('.splash-screen').hide();
  $('.board').show();
}

// complexity settings
function setComplexity() {
  var level = 1 // get input from user (0.8 - 1 - 1.2)
  if (level < 1){
    complexity = 0.8;
  } else if (level > 1) {
    complexity = 1.2;
  } else {
    complexity = 1;
  }
  return complexity;
};

// creates board based on inputs for board size x rows and y columns
function createBoard(){
  var boardSize = getBoardSize();
  for (var i=0; i<boardSize; i++) {
    board.push('x');
  }
  calcJumps();
  console.log(board);
  createGrid();
  createPlanetNames();
  return board
};

// create arrays for BH & TC position & values
function calcJumps() {
  var jumps = calcJumpNums();
  var jumpPositions = createJumpPos(jumps.numBlackHoles + jumps.numTimeCorridors);
  var numBlackHoles = jumps.numBlackHoles;
  var numTimeCorridors = jumps.numTimeCorridors;
  var totalJumps = jumps.numBlackHoles + jumps.numTimeCorridors
  var jumpAmts = createJumpAmts(jumpPositions, numBlackHoles)
  // add jumps to the board
  for (var i=0; i<totalJumps; i++) {
      // console.log(jumpPositions[i] + ' amt = ' + jumpAmts[i] );
      board[jumpPositions[i]] = jumpAmts[i];
    }
  // console.log('total jumps = ' + totalJumps);
  // console.log('Number of black Holes = ' + numBlackHoles);
  // console.log('Number of Time corridors = ' + numTimeCorridors);
  // console.log('Jump Positions located at = ' + jumpPositions);
  // console.log('Jump Amounts are = ' + jumpAmts);
};


// create number of BlackHoles and time corridors for board
function calcJumpNums() {
  var complexity = setComplexity();
  var boardSize = getBoardSize();
  var numBlackHoles = parseInt(boardSize * complexity * (7/100));
  var numTimeCorridors = parseInt(boardSize / complexity * (8/100));
  return {
    numBlackHoles : numBlackHoles,
    numTimeCorridors : numTimeCorridors
  };
};


// Create Jump Positions
function createJumpPos(number2Create) {
  var jumpPos = [];
  var boardSize = getBoardSize();
  for (var i=0; i<number2Create; i++) {
    var position = Math.floor((Math.random() * boardSize * 0.95) + 1);
    jumpPos[i] = position;
  }
  // console.log(jumpPos);
  return jumpPos;
};

// Create jump values
function createJumpAmts(jumpPos, numBlackHoles) {
  var jumpAmts = [];
  var boardSize = getBoardSize();
  for (var i=0; i<jumpPos.length; i++) {
    var rndmAmt = Math.floor((Math.random() * boardSize * .15) + 5);
    if (i < numBlackHoles) {
      rndmAmt *= -1;
    }
      jumpAmts[i] = rndmAmt
  }
  return jumpAmts;
};


// Get boardSize
function getBoardSize() {
  var board = boardRows * boardCols
  return board;
};

// Create Planet names
function createPlanetNames() {
  // console.log(planets);
  for ( var i=0; i<board.length; i++) {
    planets[i] = 'P-' + i;
  }
  // console.log(planets);
  return planets;
}



//functions to run...
createBoard();



//button event to generate dice roll
// document.getElementById('dice-btn').addEventListener("click", playerMove);
$('#dice-btn').on("click", playerMove)
//button event to reset game
$('#start-game').on("click", startGame)
