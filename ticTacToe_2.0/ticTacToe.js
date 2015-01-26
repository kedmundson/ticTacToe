// This is a game of Tic Tac Toe for two human players to play
// in a browser. X begins each game.

(function () {

  var playerX = { gamePiece: 'X', score: [] }
    , playerO = { gamePiece: 'O', score: [] }
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

    , winningScores = [
        [1, 2, 4],
        [8, 16, 32],
        [64, 128, 256].
        [1, 8, 64],
        [2, 16, 128],
        [4, 32, 156],
        [1, 16, 256],
        [4, 16, 64]
      ]

    , recordMove = function () {
        if (this.textContent !== '') return;
        this.textContent = currentPlayer.gamePiece;
        currentPlayer.score = currentPlayer.score.push(this.boxScore);
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
            if (isSubsetOf(winningScores[i], player.score)) {
              alert(player.gamePiece + " won! Do you want to play again?");
              newGame();
              return true;
            }
          }
        }
      }

    , isSubsetOf = function (smaller, bigger) {
        for (var i = 0; i < smaller.length; i++) {
          if (bigger.indexOf(smaller[i]) == -1) {
             return false;
          }
        }
        return true;
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
