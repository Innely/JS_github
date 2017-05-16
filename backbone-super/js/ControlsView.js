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

    initialize: function() {
        this.listenTo(this.model, 'change:openedCount', this.render);
    },

    /**
     * Render controls of the application
     * @return {ControlsView}
     */
    render: function() {
        this.$el.html(tpl.render('Controls', {
            openedCount: this.model.get('openedCount')
        }));
        return this;
    },

    /**
     * Reset counters, repaint the field
     * @protected
     */
    _onResetClick: function() {
        var resetCounter;
        resetCounter = this.model.get('resetGameCounter') + 1;
        this.model.set({
            'openedCount': 0,
            'isGameFailModel': false,
            'resetGameCounter': resetCounter
        });

        this.model.field.reset();
        this.model.fillCellsCollection();

        //app.initialize();
        //window.location.reload();
    }

});