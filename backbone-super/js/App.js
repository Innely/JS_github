/* global AppView */

/**
 * Main Backbone application
 * There is nothing of interesting in this file. Just initializing application, and no more.
 */

'use strict';

// Create basic applictions
var App = Backbone.App = function(options) {
    _.extend(this, options || {});
}

// Overwrite initialize methods adding regions
_.extend(App.prototype, Backbone.Events, {
    initialize: function() {
        var regions = {};

        _.each(this.regions, function(value, key) {
            regions[key] = new Backbone.Region(value);
        });

        this.regions = regions;
        this.ready();
    },
    ready: function() {}
});

// Create basic application instance
window.app = new Backbone.App({

    regions: {
        app: '#app',
    },

    ready: function() {
        this.regions.app.render(AppView, {
            model: new AppModel({
                width: 5,
                height: 5,
                mines: 8
            })
        });
    }

});

// Initialize it
$(function() {
    app.initialize();
});
