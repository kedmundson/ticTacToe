(function () {

  var playerX = { gamePiece: 'X', score: 0 }
    , playerO = { gamePiece: 'O', score: 0 }
    , currentPlayer
    , moves
    , movesLimit = 9
    , boxScore
    , boxes = []

    , createBoard = function () {
        newGame();
        var board = document.createElement('table')
          , row
          , box
          , boxScore = 1
          ;

        for (var i = 0; i < 3; i++) {
          row = document.createElement('tr');
          board.appendChild(row);
          for (var k = 0; k < 3; k++) {
            box = document.createElement('td');
            box.textContent = '';
            box.onclick = recordMove;
            //
            // Assign a unique score to each box, starting in the top left box
            // with boxScore = 1 and ascending in multiples of 2. This way we
            // can represent the boxes a player has marked with a bit string
            // and its corresponding numeral score, then check it against a
            // list of winning scores that we defined by adding the boxScores of
            // all the three-across, three-down, and three-diagonal combinations.
            // Credit to this jsFiddle poster for the bit string idea:
            // http://jsfiddle.net/5wKfF/
            //
            box.boxScore = boxScore;
            boxScore = (boxScore * 2);
            boxes.push(box);
            row.appendChild(box);
          }
        }
        document.getElementById('ticTacToeBoard').appendChild(board);
      }

    , winningScores = [ 7, 15, 56, 84, 146, 273, 292, 448 ]

    , recordMove = function () {
        if (this.textContent !== '') return;
        this.textContent = currentPlayer.gamePiece;
        currentPlayer.score += this.boxScore;
        moves += 1;
        if ( checkForWins(currentPlayer) || checkForTie() ) {
          return;
        } else {
          switchPlayer(currentPlayer);
        }
      }

    , checkForWins = function (player) {
        if (moves >= 5) {
          for (var i = 0; i < winningScores.length; i++) {
            //
            // Convert player.score and winningScores[i] to bit representations
            // and binary AND them using the '&' bitwise operator. If the two
            // operands match, the result will be the same as either operand
            // and therefore equal to winningScores[i]
            //
            // Using bits to represent an X or O in each box of the game board means that
            // this operation will work even if a player has marked more than three boxes
            // before getting a win.
            //
            if ((player.score & winningScores[i]) === winningScores[i]) {
              alert(player.gamePiece + " won! Do you want to play again?");
              newGame();
              return true;
            }
          }
        }
      }

    // End game in a tie if no one wins before movesLimit is reached
    , checkForTie = function () {
        if (moves === movesLimit) {
          alert("It's a tie. Play again?");
          newGame();
          return true;
        }
      }

    , switchPlayer = function (player) {
        currentPlayer = (player === playerX) ? playerO : playerX;
      }

    // Reset the game board
    , newGame = function () {
        playerX.score = 0,
        playerO.score = 0,
        currentPlayer = playerX;
        moves = 0;
        for (var i = 0; i < boxes.length; i++) {
          document.getElementsByTagName('TD')[i].textContent = '';
        }
      }

    ;

  window.onload = function () {
    createBoard();
  }

})();
