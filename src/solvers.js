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
  var newBoard = new Board({ n: n });
  var playedRooks = 0;

  var addRook = function(currentBoard) {
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

  console.log("Single solution for " + n + " rooks:", JSON.stringify(solution));

  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let newBoard = new Board({ n: n });
  let solutionCount = 0;

  let addRook = function(currentBoard, row) {
  
    //--------base case--------//
    if (row === n) {
      solutionCount++;
      // console.log(currentBoard.rows());
      return;
    }

    
    //-------recursive case--------//
    for (var col = 0; col < n; col++) {
      currentBoard.togglePiece(row, col);
      if (currentBoard.hasAnyRooksConflicts()) {
        currentBoard.togglePiece(row, col);
        continue;
      } else {
        addRook(currentBoard, ++row);
        currentBoard.togglePiece(--row, col)
      }
    }
  };

  addRook(newBoard, 0);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var addQueen = function(currentBoard) {
    //---------base case --------//
    if (playedQueens === n) {
      return currentBoard;
    }

    //--------recursive case--------//
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        currentPlace = currentBoard.rows()[row][col];

        if (currentPlace === 0) {
          currentBoard.togglePiece(row, col);
          if (currentBoard.hasAnyQueensConflicts()) {
            currentBoard.togglePiece(row, col);
          } else {
            playedQueens++;
            return addQueen(currentBoard);
          }
        } else {
          continue;
        }
      }
    }
  };
  //-----if 0 case-----//
  if (n === 0) {
    var newBoard = new Board({ n: 0 });
    return newBoard.rows();
  }

  //--------initialize------//
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      var newBoard = new Board({ n: n });
      var playedQueens = 0;

      newBoard.togglePiece([row], [col]);
      playedQueens++;

      let solution = addQueen(newBoard);

      if (solution) {
        console.log(
          "Single solution for " + n + " queens:",
          JSON.stringify(solution)
        );
        return solution.rows();
      }
    }
  }


  return new Board({ n: n }).rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let newBoard = new Board({ n: n });
  let solutionCount = 0;

  let addQueen = function(currentBoard, row) {
  
    //--------base case--------//
    if (row === n) {
      solutionCount++;
      console.log(currentBoard.rows());
      return;
    }

    
    //-------recursive case--------//
    for (var col = 0; col < n; col++) {
      currentBoard.togglePiece(row, col);
      if (currentBoard.hasAnyQueensConflicts()) {
        currentBoard.togglePiece(row, col);
        continue;
      } else {
        addQueen(currentBoard, ++row);
        currentBoard.togglePiece(--row, col)
      }
    }
  };

  addQueen(newBoard, 0);

  return solutionCount;
}