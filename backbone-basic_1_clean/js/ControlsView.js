/**
 * @class ControlsView
 */
var ControlsView = Backbone.View.extend({

    events: {
        'click #resetButton': 'onResetClick'
    },

    render: function() {
        this.$el.html(tpl.render('Controls', {}));
        return this;
    },

    onResetClick: function() {
        console.log('CLICKED RESET');
    }

});
