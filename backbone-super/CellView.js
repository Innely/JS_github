/**
 * @class CellView
 * @classdesc View for one cell of the field
 * @see Backbone.View
 */

var CellView = Backbone.View.extend({

    /**
     * @const
     * for class names for cell
     * @type String
     */
    CSS_MINE_CLASS: 'is-mine',
    CSS_OPEN_CLASS: 'is-opened',

    className: 'cell',

    /**
     * @see Backbone.Events
     */
    events: {
        'click': 'onClick'
    },

    /**
     * Initialize component
     * @see Backbone.View.initialize
     */
    initialize: function() {
        this.listenTo(this.model, 'change:isOpen', this.onOpenChange);
    },

    /**
     * Render the cell of the field
     * @return {CellView}
     */
    render: function () {
        this.$el.html(this.model.get('minesAround') || '');
        this.$el.toggleClass(this.CSS_MINE_CLASS, this.model.get('isMine'));

        return this;
    },

    /**
     * Open cell, add class for open cell
     * @protected
     */
    onClick: function () {
        if (!this.model.get('isGameFail')) {
            this.model.set('isOpen', true);
            this.$el.toggleClass(this.CSS_OPEN_CLASS, this.model.get('isOpen'));
        }
    },

    /**
     * Open cells for happy end (all cells)
     * @protected
     */
    onOpenChange: function () {
        this.$el.toggleClass(this.CSS_OPEN_CLASS, this.model.get('isOpen'));
    }

});