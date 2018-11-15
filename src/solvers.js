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
  var solutionCount = undefined; //fixme

  console.log("Number of solutions for " + n + " rooks:", solutionCount);
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

  //------fail case---------//
  return new Board({ n: n }).rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var solutionCount = 0; //fixme
  var solutions = [];

  //---------base case---------//
  var addQueen = function(currentBoard) {
    let queenNum = 0;
    for (const arr of currentBoard.rows()) {
      queenNum += arr.reduce((acc, item) => acc + item);
    }
    if (queenNum === n) {
      // console.log(currentBoard.rows());
      solutions.push(JSON.stringify(currentBoard.rows()));
      // solutionCount++;
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
            // let newboard = new Board(currentBoard.rows())
            addQueen(currentBoard);
            // newboard.togglePiece(row, col);
            // if ((col + 1) < n) {
            //   newboard.togglePiece(row, col + 1);
            //   if (newboard.hasAnyQueensConflicts()) {
            //     newboard.togglePiece(row, col + 1);
            //   } else {
            //     addQueen(newboard);
            //   }
            // } else {
            //   if ((row + 1) < n) {
            //     newboard.togglePiece(row + 1, 0);
            //     if (newboard.hasAnyQueensConflicts()) {
            //       newboard.togglePiece(row + 1, 0);
            //     } else {
            //       addQueen(newboard);
            //     }
            //   }
            // }
          }
          // toggle ahead cell
        } else {
          continue;
        }
      }
    }
  };
  //-----if 0 case-----//
  if (n === 0 || n === 1) {
    return 1;
  }

  //--------initialize------//
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      var newBoard = new Board({ n: n });
      // var newBoard.playedQueens = 0;

      newBoard.togglePiece([row], [col]);
      // playedQueens++;

      addQueen(newBoard);
    }
  }

  let set = new Set(solutions);
  console.log("Number of solutions for " + n + " queens:", [...set].length);

  console.log(set);
  return [...set].length;
  // return Math.sqrt(solutionCount);
};
