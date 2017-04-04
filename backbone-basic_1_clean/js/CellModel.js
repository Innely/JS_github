/**
 * Cell model
 */

var CellModel = Backbone.Model.extend({

    defaults: {
        isOpen: false,
        isMine: false,
        minesAround: 0
    }

});