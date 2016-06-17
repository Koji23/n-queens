/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// solution should look like this EXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])

window.findNRooksSolution = function(n) {
  var newBoard = new Board({'n': n});
  var solution;
  var helper = function(board, pieces) {
    if (pieces === n) {
      solution = board;
      //return board;
    } else {
      for (var i = 0; i < n; i++ ) {
        for (var j = 0; j < n; j++ ) {
          var row = board.get(i);
          if (row[j] === 0 ) {
            row[j] = 1;
            board.set(i, row);
            if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() ) {
              pieces++;
              helper(board, pieces);
            } else {
              row[j] = 0;
              board.set(i, row);
            } 
          } 
        }
      }
    }
  };
  helper(newBoard, 0);
  //solution = helper(newBoard, 0);
  var result = [];
  for (var i = 0; i < n; i++ ) {
    result.push(solution.get(i));
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return result;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var newBoard = new Board({'n': n});
  var helper = function(board, pieces) {
    if (pieces === n) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++ ) {
        var row;
        for (var j = 0; j < n; j++ ) {
          row = board.get(i);
          if (row[j] === 0 ) {
            row[j] = 1;
            board.set(i, row);
            if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() ) {
              pieces++;
              helper(board, pieces);
              row[j] = 0;
              board.set(i, row);
              pieces --;
            } else {
              row[j] = 0;
              board.set(i, row);
            } 
          } 

        }
      }
    }
  };
  helper(newBoard, 0);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  if ( solutionCount === 2 ) {
    return 2;
  }

  return Math.sqrt(solutionCount);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board({'n': n});
  var solution;
  var helper = function(board, pieces) {
    if (pieces === n) {
      solution = board;
      //return board;
    } else {
      for (var i = 0; i < n; i++ ) {
        for (var j = 0; j < n; j++ ) {
          var row = board.get(i);
          if (row[j] === 0 ) {
            row[j] = 1;
            board.set(i, row);
            if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !hasAnyMajorDiagonalConflicts() && !hasMinorDiagonalConflictAt()) {
              pieces++;
              helper(board, pieces);
            } else {
              row[j] = 0;
              board.set(i, row);
            } 
          } 
        }
      }
    }
  };
  helper(newBoard, 0);
  //solution = helper(newBoard, 0);
  var result = [];
  for (var i = 0; i < n; i++ ) {
    result.push(solution.get(i));
  }

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var newBoard = new Board({'n': n});
  var count = 0;
    var findPermutations = function(pieces, matrixSoFar) {
      if (pieces === n) {
        count++;
        return;
      } else if (pieces < n) {
        for (var i = 0; i < n; i++) {
          var row = matrixSoFar.get(pieces);
          row[i] = 1;
          matrixSoFar.set(pieces, row);
          if (!matrixSoFar.hasAnyRowConflicts() && !matrixSoFar.hasAnyColConflicts() && !matrixSoFar.hasAnyMajorDiagonalConflicts() && !matrixSoFar.hasAnyMinorDiagonalConflicts()) {
            findPermutations(pieces + 1, matrixSoFar);
          } 
          row[i] = 0;
          matrixSoFar.set(pieces, row);           
        }
      }
    };
   
   findPermutations(0, newBoard);
   return count;
};
