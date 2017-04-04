/**
 * @class CellView
 */

var CellView = Backbone.View.extend({

    className: 'cell',

    render: function () {

        if (this.model.get('minesAround')){
            this.$el.html(this.model.get('minesAround'));
        }
        else {
            this.$el.html('-1');
        }

        if (this.model.get('isMine')){
            this.$el.addClass('is-mine');
        }

        this.$el.attr("data-x", this.model.get('x'));
        this.$el.attr("data-y", this.model.get('y'));

        return this;
    }

});