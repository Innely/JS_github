/**
 * @class CellsCollection
 * @see BaseCollection
 */

var CellsCollection = Backbone.Collection.extend({

    model: CellModel,


    initialize: function(models, options) {
        this.height = options && options.height;
        this.width = options && options.width;
        this.app = options && options.app;

        this.on('change:isOpen', this.checkOpenCells);
        this.on('add', this.onAdd);
    },

    /**
     * Need to attach parent model to each child model
     * @param {Object} model
     */
    onAdd: function (model) {
        model.app = this.app;
    },

    /**
     * Check all opening cells
     * @protected
     */
    checkOpenCells: function() {
        var a, b;
        this.forEach(function(model){
            if (model.get('isEmpty') && model.get('isOpen')) {
                a =  model.get('x');
                b =  model.get('y');
                this.openSibling(a, b);
            }
        }.bind(this));
    },

    /**
     * Open sibling cells
     * @param x, y - coordinates of the empty clicked cell
     */
    openSibling: function(x, y) {
        var width = this.width;
        var height = this.height;

        // Check, Are we on the border?
        var start = {
            x: (x - 1 > -1) ? x - 1 : x,
            y: (y - 1 > -1) ? y - 1 : y
        };
        var end = {
            x: (x + 1 >= width) ? x : x + 1,
            y: (y + 1 >= height) ? y : y + 1
        };

        for (var i = start.x; i <= end.x; i++) {
            for (var j = start.y; j <= end.y; j++) {
                this.at(i*width + j).set('isOpen', true);
            }
        }
    }

});
