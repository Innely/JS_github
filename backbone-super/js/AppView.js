/**
 * @class AppView
 * @classdesc Base application view
 * @see Backbone.View
 */

var AppView = Backbone.View.extend({

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
        this.listenTo(this.model, 'change:isGameFail', this.checkGameState);
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

        this.regions.controls.render(ControlsView, {
            model: this.model
        });

        return this;
    },

    /**
     * Check the state of the game
     * @public
     */
    checkGameState: function() {
        if (this.model.get('isGameFail')) {
            this.fail();
            return;
        }

        if (this.model.get('isGameFail') !== 0) {
            this.restart();
        }
    },

    restart: function () {
        this.render();
        this.listenTo(this.model.field, 'change:isOpen', this.updateCounter);
    },

    fail: function () {
        this.stopListening(this.model.field, 'change:isOpen');

        // Set 'isOpen' for all cell's with mine, stop the game
        this.model.field.forEach(function(model){
            if (model.get('isMine')){
                model.set('isOpen', true);
            }
        });
        setTimeout("alert('Вы проиграли...')", 50);
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
        this.model.set('openedCount', openedCells);

        // Check, has cliked cell the mine?
        this.model.field.forEach(function(model){
            if (model.get('isOpen') && model.get('isMine')) {
                minedCell = true;
            }
        });
        if (minedCell) {
            this.model.set('isGameFail', true);
        }

        // Set 'isOpen' for all cell's models, Happy-end the game
        if (openedCells == this.model.get('width') * this.model.get('height') - this.model.get('mines')) {
            this.stopListening(this.model.field, 'change:isOpen');
            this.model.field.forEach(function(model){
                model.set('isOpen', true);
            });
            this.model.set('isGameFail', 0);
            setTimeout("alert('Ура, вы выиграли!!!')", 50);
        }
    },

});
