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
     * Render application
     * @return {AppView}
     */
    render: function() {
        this.$el.html(tpl.render('App'));

        /**
         * Render field
         */
        this.regions.field.renderWidgets(
            this.model.field,
            CellView,
            function(model) {
                return {model: model};
            }
        );
        console.log(this.model.field);

        /**
         * Render controls
         */
        this.regions.controls.render(ControlsView);

        return this;
    }

});
