/**
 * @class CellView
 * @classdesc View for one cell of the field
 * @see Backbone.View
 */

var CellView = Backbone.View.extend({

    CSS_MINE_CLASS: 'is-mine',

    className: 'cell',

    /**
     * Render the cell of the field
     * @return {CellView}
     */
    render: function () {
        this.$el.html(this.model.get('minesAround') || '');
        this.$el.toggleClass(this.CSS_MINE_CLASS, this.model.get('isMine'));

        return this;
    }

});