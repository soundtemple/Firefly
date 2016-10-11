console.log('Lets go!');

// Global variables
var board = [];
var players = ['Player1', 'Player2']
var player1Pos = 0;
var player2Pos = 0;
var boardRows = 10;
var boardCols = 10;
var currentPlayer = 0;
var diceSize = 6; // thrust potential

// player move
function playerMove(){
  playerPosition();
  nextPlayer();
};

// Dice Roll
function rollDice(){
  var roll = Math.floor((Math.random() * diceSize)+1);
  console.log('Player ' + currentPlayer + ' rolls a ' + roll);
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
function playerPosition() {
  var moveAmt = rollDice();
  if (currentPlayer === 0) {
    player1Pos+= moveAmt;
    // console.log('Player1 Position = ' + player1Pos);
  } else {
    player2Pos+= moveAmt;
    // console.log('Player2 Position = ' + player2Pos);
  }
  checkWinner(moveAmt);
  updatePlayerPostion();
}

// check if winner
function checkWinner(move) {
  winningValue = boardCols * boardRows
  if (player1Pos === winningValue) {
    winner(0);
    };
  if (player2Pos === winningValue)  {
    winner(1);
    };
  if (player1Pos > winningValue) {
    console.log('Player1 is OVER!');
    player1Pos-= move;
    };
  if (player2Pos > winningValue) {
    console.log('Player2 is OVER!');
    player2Pos-= move;
    };
};

// winner
function winner(player) {
  updatePlayerPostion();
  console.log(players[player] + ' is the winner!!!!!');
  resetGame();
};

// update player position
function updatePlayerPostion() {
  console.log('Player1 Position = ' + player1Pos + '  Player2 Position = ' + player2Pos);
};

// reset game parameters
function resetGame() {
  alert('Play again?')
  player1Pos = 0;
  player2Pos = 0;
  setComplexity();
  createBoard();
};

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
  // create array x * y values
  for (var i=0; i<boardSize; i++) {
    board.push('x');
  }
  console.log(board);
  return board
};

// create BlackHoles for board
function getNumBlackHoles() {
  var complexity = setComplexity();
  var boardSize = getBoardSize();
  numBlackHoles = parseInt(boardSize * complexity * (7/100));
  console.log('BlackHoles# ' + numBlackHoles);
  return numBlackHoles;
};

// create #TimeCorridors for board
function getNumTimeCorridors() {
  var complexity = setComplexity();
  var boardSize = getBoardSize();
  numTimeCorridors = parseInt(boardSize / complexity * (8/100));
  console.log('TimeCorridors# ' + numTimeCorridors);
  return numTimeCorridors;
};

// Add BlackHoles to board array
function blackHolesData() {
  var numBlackHoles = getNumBlackHoles();
  var bhPos = jumpPositions(getNumBlackHoles);
  var bhDrops = hyperJumps(getNumBlackHoles);
  for (var i=0; i<numBlackHoles; i++) {
    board[bhPos[i]] = bhDrop[i];
  }
};


// Add TimeCorridors to board array
function TimeCorridorsData() {
  var numTimeCorridors = getNumTimeCorridors();
  var tcPos = jumpPositions(getNumTimeCorridors);
  var tcDrops = hyperJumps(getNumTimeCorridors);
  for (var i=0; i<numTimeCorridors; i++) {
    board[tcPos[i]] = (tcDrop[i] * -1);
  }
};

// Create Jump Positions
function jumpPositions(number2Create) {
  var boardSize = getBoardSize();
  for (var i=0; i<number2Create; i++) {
    position = Math.floor((Math.random() * boardSize)+1);
    jumpPos[i] = position;
  }
};

// Create hyperJump values
function hyperJumps(number2Create) {
  for (var i=0; i<number2Create; i++) {

  }
};

// Get boardSize
function getBoardSize() {
  var board = boardRows * boardCols
  return board;
};


//functions to run...
createBoard();
getNumTimeCorridors();
getNumBlackHoles();



//button event to generate dice roll
document.getElementById('dice').addEventListener("click", playerMove);
