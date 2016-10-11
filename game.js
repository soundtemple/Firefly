console.log('Lets go!');

// Global variables
var board = [];
var players = ['Player1', 'Player2']
var player1Pos = 0;
var player2Pos = 0;
var boardRows = 10; // potentiallly not required in new format
var boardCols = 10; //
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
  calcJumps();
  console.log(board);
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
  console.log('total jumps = ' + totalJumps);
  for (var i=0; i<totalJumps; i++) {
      console.log(jumpPositions[i] + ' amt = ' + jumpAmts[i] );
      board[jumpPositions[i]] = jumpAmts[i];
    }
  console.log('Number of black Holes = ' + numBlackHoles);
  console.log('Number of Time corridors = ' + numTimeCorridors);
  console.log('Jump Positions located at = ' + jumpPositions);
  console.log('Jump Amounts are = ' + jumpAmts);
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
  console.log(jumpPos);
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


//functions to run...
createBoard();




//button event to generate dice roll
document.getElementById('dice').addEventListener("click", playerMove);
