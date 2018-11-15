/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at olversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//fixme [ [1, 0, 0]
//        [0, 1, 0]
//        [0, 0, 1] ]

window.findNRooksSolution = function(n) {
  // var solution = [];

  var newBoard = new Board({ n: n });
  var playedRooks = 0;

  // var nextPlace = [0, 0]];

  // let countRooks = function(board) {
  //   let count = 0;
  //   for (const row of board) {
  //     for (const col of row) {
  //       if (col) {
  //         count++;
  //       }
  //     }
  //   }
  //   return count;
  // };

  // var incrementNextPlace = function(prevPlace) {
  //   if (prevPlace[0])
  //   prevPlace.[0]+=Math.floor(prevPlace.[1]/(n-1));

  // }

  var addRook = function(currentBoard) {
    // add rook to currentBoard

    //---------base case --------//
    if (playedRooks === n) {
      return currentBoard;
    }

    //--------recursive case--------//
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        currentPlace = currentBoard.rows()[row][col];

        if (currentPlace === 0) {
          currentBoard.togglePiece(row, col);
          if (currentBoard.hasAnyRooksConflicts()) {
            currentBoard.togglePiece(row, col);
          } else {
            playedRooks++;
            return addRook(currentBoard);
          }
        } else {
          continue;
        }
      }
    }
  };

  var solution = addRook(newBoard);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
