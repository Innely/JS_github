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
     * Fill cells collection method
     * @public
     */
    fillCellsCollection: function() {
        // Magic code where we define have mine, etc.
        //this.collection.add(new AppFieldModel({ }));

        this.field.add([
            {x: 0, y: 0, isMine: false, minesAround: 0},
            {x: 1, y: 0, isMine: false, minesAround: 1},
            {x: 2, y: 0, isMine: true, minesAround: 0},
            {x: 3, y: 0, isMine: true, minesAround: 0},
            {x: 4, y: 0, isMine: false, minesAround: 1},

            {x: 0, y: 1, isMine: false, minesAround: 2},
            {x: 1, y: 1, isMine: false, minesAround: 3},
            {x: 2, y: 1, isMine: false, minesAround: 4},
            {x: 3, y: 1, isMine: false, minesAround: 4},
            {x: 4, y: 1, isMine: false, minesAround: 3},

            {x: 0, y: 2, isMine: true, minesAround: 0},
            {x: 1, y: 2, isMine: true, minesAround: 0},
            {x: 2, y: 2, isMine: false, minesAround: 2},
            {x: 3, y: 2, isMine: true, minesAround: 0},
            {x: 4, y: 2, isMine: true, minesAround: 0},

            {x: 0, y: 3, isMine: false, minesAround: 3},
            {x: 1, y: 3, isMine: false, minesAround: 3},
            {x: 2, y: 3, isMine: false, minesAround: 2},
            {x: 3, y: 3, isMine: false, minesAround: 3},
            {x: 4, y: 3, isMine: true, minesAround: 0},

            {x: 0, y: 4, isMine: true, minesAround: 0},
            {x: 1, y: 4, isMine: false, minesAround: 1},
            {x: 2, y: 4, isMine: false, minesAround: 0},
            {x: 3, y: 4, isMine: false, minesAround: 1},
            {x: 4, y: 4, isMine: false, minesAround: 1}
        ]);

    }

});
