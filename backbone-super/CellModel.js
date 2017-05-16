/**
 * @class CellModel
 * @classdesc Model for one cell of the field
 * @see Backbone.Model
 */

var CellModel = Backbone.Model.extend({

    defaults: {
        isOpen: false,
        isMine: false,
        minesAround: 0
    }

});