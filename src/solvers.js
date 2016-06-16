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

window.findNRooksSolution = function(n, solution, pieces) {
  solution = solution || new Board({'n': n}); //fixme
  pieces = pieces || 0;
  //check to see if current board has no conflicts
  if ( !solution.hasAnyRowConflicts() && !solution.hasAnyColConflicts() ) {
    //&& check if current has n pieces
    if ( pieces === n && pieces !== 1 ) {
      //return solution
      var matrix = [];
      for ( var i = 0; i < n; i++ ) {
        matrix.push(solution.get(i));
      }
      return matrix;
    } else {
      for ( var i = 0; i < n; i++ ) {
        for ( var j = 0; j < n; j++) {
          var row = solution.get(i);
          if (row[j] === 0 ) {
            row[j] = 1; 
            solution.set(i, row);
            pieces++;
            return findNRooksSolution(n, solution, pieces);
          } 
        }
      }
    }
  } 
  //otherwise
    //recurse over remaining possibilites



  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
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

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
