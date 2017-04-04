/**
 * Base application view
 */

var AppView = Backbone.View.extend({

    regions: {
        field: '#field',
        controls: '#controls'
    },

    initialize: function() {

    },

    render: function() {
        this.$el.html(tpl.render('App'));

        this.regions.field.renderWidgets(
            this.model.collection,
            CellView,
            function(model) {
                return {model: model};
            }
        );
        console.log(this.model.collection);

        this.regions.controls.render(ControlsView, {});

        return this;
    }

});
