/**
 * @class AppModel
 * @classdesc Base application model
 * @see Backbone.Model
 */

var AppModel = Backbone.Model.extend({

	defaults: {
        width: 5,
        height: 5,
        mines: 8,
        openedCount: 0
    },

    /**
     * @see Backbone.Model.initialize
     */
    initialize: function() {
        this.field = new CellsCollection();
        this.fillCellsCollection();
    },

    /**
     * Fill cells collection method, where we define have mine, etc.
     * @public
     */
    fillCellsCollection: function() {
        var randomNumber;
        var countMines;
        var currentCellModel;

        // Get value from App.js, if there define
        var width = this.get('width');
        var height = this.get('height');
        var mines = this.get('mines');

        // Set x, y
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                this.field.add([{x: i, y: j}]);
            }
        }

        // Set random mines
        for (var m = 0; m < mines; m++) {
            // return random[0 - 24]  => Math.random() * (max - min) + min
            randomNumber = Math.floor(Math.random() * (width * height - 1));

            if (this.field.at(randomNumber).get('isMine')){
                m--;
            }
            else {
                this.field.at(randomNumber).set({'isMine': true});
            }
        }

        // Set minesAround for cell without mine
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                // for cells without mines
                if (!this.field.at(i*width + j).get('isMine')) {
                    countMines = 0;

                    // Check if we are on the border
                    var start = {
                        a: (i - 1 > -1) ? -1 : 0,
                        b: (j - 1 > -1) ? -1 : 0
                    };
                    var end = {
                        a: (i + 1 >= width) ? 1 : 2,  // Check for more width or not
                        b: (j + 1 >= height) ? 1 : 2
                    };

                    for (var m = start.a; m < end.a; m++) {
                        for (var n = start.b; n < end.b; n++) {
                            currentCellModel = this.field.at((i + m) * width + j + n);

                            if (currentCellModel && currentCellModel.get('isMine')) {
                                countMines += currentCellModel.get('isMine');
                            }
                        }
                    }

                    this.field.at(i * width + j).set({'minesAround': countMines});
                }
            }
        }
    }

});