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
        'click #resetButton': 'onResetClick'
    },

    /**
     * Render controls of the application
     * @return {ControlsView}
     */
    render: function() {
        this.$el.html(tpl.render('Controls', {
            // openedCount: this.model.get('openedCount');
        }));
        return this;
    },

    /**
     * Reset counters, repaint the field
     */
    onResetClick: function() {
        console.log('CLICKED RESET');
        // this.model.resetCounters();
    }

});