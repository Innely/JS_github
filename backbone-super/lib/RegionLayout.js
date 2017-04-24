(function() {
    var Region = Backbone.Region = function(selector, $parentEl) {
        this.selector = selector;
        this.views = [];
        this.widgets = [];
        this.$parentEl = $parentEl;
    };

    _.extend(Region.prototype, Backbone.Events, {
        /**
         * This add mode is used to collect all views and insert them into the DOM at once.
         */
        ADD_MODE_WIDGET: 'widget',

        /**
         * Normal add mode. Used by default.
         */
        ADD_MODE_APPEND: 'append',

        /**
         * Reverse add mode.
         */
        ADD_MODE_PREPEND: 'prepend',

        //return jQuery element of region
        $el: function() {
            if (this.$parentEl !== undefined) {
                return this.$parentEl.find(this.selector);
            }

            return $(this.selector);
        },

        /**
         * render view or layout into this.$el() and initialize view subregions
         * @param view
         * @param options
         * @param isPreClose
         * @returns {view}
         */
        render: function(view, options, isPreClose) {
            var instance;

            if(isPreClose === undefined) {
                isPreClose = true;
            }

            if(typeof view !== 'function') throw new TypeError('Region can render Backbone.View or Backbone.Layout');

            if(isPreClose) {
                this.close();
            }

            options = options || {};

            _.extend(options, {
                el: this.$el(),
                region: this
            });

            instance = new view(options);
            instance._render();
            this._addView(instance);

            return instance;
        },

        widget: function(view, options) {
            var instance;

            if(typeof view !== 'function') throw new TypeError('Region can render Backbone.View or Backbone.Layout');

            options = options || {};

            _.extend(options, {
                region: this
            });

            instance = new view(options);
            instance._render();

            this._addView(instance);

            return instance;
        },

        /**
         * Insert all collected widgets in DOM.
         *
         * @param data - Optional array of data to render using this widgets.
         * @param view - Optional widget view for each element of the data.
         * @param viewOptionsCallback - Optional callback to provide the view with options.
         *                              Will be called for each item of data.
         * @returns {BaseView[]}
         */
        renderWidgets: function(data, view, viewOptionsCallback, mode) {
            var widgets = this.widgets;
            if ((_.isArray(data) || data instanceof Backbone.Collection) && !_.isUndefined(view)) {
                data.forEach(function(item, index) {
                    this.addWidget(view, _.isFunction(viewOptionsCallback) ? viewOptionsCallback(item, index) : {model: item});
                }.bind(this));
            }

            if(_.isBoolean(data) && data) {
                this.$el().prepend(this.widgets);
            } else {
                this.$el().append(this.widgets);
            }

            this.widgets = [];
            return widgets;
        },

        /**
         * Sets wrapper to element
         *
         * @private
         * @param el - DOM object
         * @param className - css className string
         * @returns {Object} - jQuery object
         * TODO: fox. TN-55525 remove method
         */
        _setWrapper: function(el, className) {
            return $('<div class="' + className + '"></div>').append(el);
        },

        /**
         * Add view to this region.
         *
         * @param view - View name.
         * @param options - Options for the view.
         * @param mode - Add mode. One of this.ADD_MODE_*.
         * @param cssWrapperClass - css className String (TODO: fox. TN-55525 remove param)
         */
        addView: function(view, options, mode, cssWrapperClass) {
            var instance;
            var $el;

            if(typeof view !== 'function') throw new TypeError('Region can render Backbone.View or Backbone.Layout');

            options = options || {};

            _.extend(options, {
                region: this
            });

            instance = new view(options);

            this._addView(instance);

            instance._render();

            // TODO: fox. TN-55525 remove "if" statement. Keep "$el = instance.el;"
            if (cssWrapperClass) {
                $el = this._setWrapper(instance.el, cssWrapperClass);
            } else {
                $el = instance.el;
            }

            switch (mode) {
                case this.ADD_MODE_WIDGET:
                    this.widgets.push($el);
                    break;

                case this.ADD_MODE_PREPEND:
                    this.$el().prepend($el);
                    break;

                case this.ADD_MODE_APPEND:
                default:
                    this.$el().append($el);
                    break;
            }

            return instance;
        },

        /**
         * Alias for addView with widget use case.
         * TODO: fox. TN-55525 remove cssWrapperClass
         */
        addWidget: function(view, options, cssWrapperClass) {
            return this.addView(view, options, this.ADD_MODE_WIDGET, cssWrapperClass);
        },

        _addView: function(instance) {
            this.views.push(instance);
        },

        close: function() {
            _.each(this.views, function(view) {
                view.remove();
            });

            this.views = [];
            this.widgets = [];

            this.$el().empty();
        },

        saving: function() {
            this.$el().addClass('saving');
        },

        loading: function() {
            this.$el().addClass('loading');
        },

        ready: function() {
            this.$el().removeClass('loading saving');
        }
    });

    // Saving Backbone original setElement function
    var originalSetElementFunction = Backbone.View.prototype.setElement;

    _.extend(Backbone.View.prototype, {
        _render: function() {
            var regions = {};

            if(this.regions) {
                _.each(this.regions, function(value, key) {
                    regions[key] = new Region(value, this.$el);
                }, this);

                this.regions = regions;
            }

            this.region = this.options.region;

            return this.render();
        },

        /**
         *
         * @private
         */
        renewalRegionsParentEl: function() {
            if (!this.regions) return;
            _.each(this.regions, function(region) {
                region.$parentEl = this.$el;
            }, this);
        },

        // Change the view's element (`this.el` property), including event
        // re-delegation.
        setElement: function(element, delegate) {
            // call original setElement method
            originalSetElementFunction.apply(this, arguments);

            this.renewalRegionsParentEl();

            return this;
        },

        remove: function() {
            this.trigger('remove');

            _.each(this.regions, function(region) {
                region.close();
            });

            this.region.views = _.without(this.region.views, this);
            this.region.widgets = _.without(this.region.widgets, this);

            this.undelegateEvents();
            this._removeElement();
            this.stopListening();
        },

        _removeElement: function() {
            if (this.$el.get(0) != this.region.$el().get(0)) {
                this.$el.remove();
            } else {
                this.$el.empty();
            }
        }
    });
}());

