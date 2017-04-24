/**
 * @class AppView
 * @classdesc Base application view
 * @see Backbone.View
 */

var AppView = Backbone.View.extend({

    events: {
        'click #field': 'checkOpenCells'
    },

    /**
     * @see Region
     */
    regions: {
        field: '#field',
        controls: '#controls'
    },

    /**
     * Initialize component
     * @see Backbone.View.initialize
     */
    initialize: function() {
        this.listenTo(this.model.field, 'change:isOpen', this.updateCounter);
        this.listenTo(this.model.field, 'change:isOpen', this.checkOpenCells);
    },

    /**
     * Render application
     * @return {AppView}
     */
    render: function() {
        this.$el.html(tpl.render('App'));

        this.regions.field.renderWidgets(
            this.model.field,
            CellView,
            function(model) {
                return {model: model};
            }
        );
        console.log(this.model.field);

        this.regions.controls.render(ControlsView, {
            openedCells: this.model.get('openedCount')
        });

        return this;
    },

    /**
     * Update count of open cell
     * @public
     */
    updateCounter: function() {
        var openedCells = 0;
        var minedCell = false;

        this.model.field.forEach(function(model){
            if (model.get('isOpen')) {
                openedCells += model.get('isOpen');
            }
        });
        this.model.set({'openedCount': openedCells});


        // TODO можно ли так делать? или нужно выносить отдельно?
        // Update Controls template
        this.regions.controls.render(ControlsView, {
            openedCells: this.model.get('openedCount')
        });

        // Check, has cliked cell the mine?
        this.model.field.forEach(function(model){
            if (model.get('isOpen') && model.get('isMine')) {
                minedCell = true;
            }
        });

        // Set 'isOpen' for all cell's with mine, stop the game
        this.model.field.forEach(function(model){
            if (minedCell && model.get('isMine')){
                model.set({'isOpen': true});
            }
            // Stop to click and stop update counter
            if (minedCell) {
                model.set({'notToClick': true});
            }
        });

        // Set 'isOpen' for all cell's models, Happy-end the game
        if (openedCells == this.model.get('width') * this.model.get('height') - this.model.get('mines') && !minedCell) {
            this.model.field.forEach(function(model){
                model.set({'isOpen': true});
            });
            setTimeout("alert('Ура, вы выиграли!!!')", 50);
        }

        // Check, is empty current cell?
        this.model.field.forEach(function(model){
            if (!model.get('minesAround') && !model.get('isMine')) {
                model.set({'isEmpty': true});
            }
        });
    },

    /**
     * Check all opening cells
     * @protected
     */
    checkOpenCells: function() {
        var a, b;

        this.model.field.forEach(function(model){
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
        var currentCell;
        var width = this.model.get('width');
        var height = this.model.get('height');

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
                currentCell = this.model.field.models[i*width + j];
                currentCell.set({'isOpen': true});
            }
        }
    }

});
