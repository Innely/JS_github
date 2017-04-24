/**
 * @class ControlsView
 * @classdesc View for controls (count, reset button)
 * @see Backbone.View
 */
var ControlsView = Backbone.View.extend({

    /**
     * @see Backbone.Events
     */
    events: {
        'click #resetButton': '_onResetClick'
    },

    initialize: function(arg) {
        this.openedCells = arg.openedCells;
    },

    /**
     * Render controls of the application
     * @return {ControlsView}
     */
    render: function() {
        this.$el.html(tpl.render('Controls', {
             openedCount: this.openedCells
        }));

        return this;
    },

    /**
     * Reset counters, repaint the field
     * @protected
     */
    _onResetClick: function() {
        window.location.reload();
    }

});