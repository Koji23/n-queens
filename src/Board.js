// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // if current row contains conflicts
      var pieces = 0;
      var row = this.get(rowIndex);
      
      for ( var i = 0; i < row.length; i++ ) {
        if (row[i] === 1) {
          pieces += 1;
        }
      }
      return pieces > 1 ? true : false;

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowLength = this.get(0).length;

      for ( var i = 0; i < rowLength; i++ ) {
        if ( this.hasRowConflictAt(i) ) {
          return true; 
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      var pieces = 0;
      var columnLength = this.get(0).length;

      for (var i = 0; i < columnLength; i++ ) {
        if (this.get(i)[colIndex] === 1 ) {
          pieces += 1;
        } 
      }
      return pieces > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var columnLength = this.get(0).length;

      for ( var i = 0; i < columnLength; i++ ) {
        if ( this.hasColConflictAt(i) ) {
          return true;
        }
      }
      return false;
    },


//THESE ARE SQUARES WITHIN SQUARES!
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // TOP LEFT TO BOTTOM RIGHT CONFLICTS
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var piecesCount = 0;

      for ( var i = 0; i < this.get('n'); i++) {
        var row = this.get(i);
        if ( row[majorDiagonalColumnIndexAtFirstRow + i ] === 1 ) {
          piecesCount += 1; 
        }
      }
      
      return piecesCount > 1 ? true : false;
      // var totalRows = this.get(0).length; // number or rows and number of columns 
      // var piecesInDiagonalField = 0;
      // var currentRow = 0;
      // var count = 0; 
      // var context = this;

      
      // var helper = function(row, columnIndex) {
      //   // if row or column are undefined
      //   if ( count === totalRows ) {
      //     // return
      //     return; 
      //   }
      //   // check to see if columnIndex at current row has piece
      //   if ( context.get(row)[columnIndex] === 1 ) {
      //     // if so add 1 to piecesInDiagonal Field
      //     piecesInDiagonalField += 1;
      //     console.log(piecesInDiagonalField);
      //     debugger;
      //   }
      //   // might have to do a check to see if row exists 
      //   // iterate over next row's columns starting at (column index + 1)
        
      //    // recursive helper function on (next row, next column)
      //   count ++; 
      //   helper( row + 1, columnIndex + 1 );

      //     // recursive helper funciton on (next row, column - 1)
      //     // helper( row + 1, columnIndex - 1);
        
      // };
      
      // helper( 0, majorDiagonalColumnIndexAtFirstRow );
      
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var last = this.get('n') - 1;
      var first = 0 - last;
      for (var i = first; i <= last; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // TOP RIGHT TO BOTTOM LEFT CONFLICTS 
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
