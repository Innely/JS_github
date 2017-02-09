/**
 * Slider
 */

(function($) {

  'use strict';

  $.slider = function(container, options) {

    var defaults  = $.extend( {
      interval: 3000,
      items: 1,
      loop: false,
      callback: function() {}
    }, options);

    this.$container = $(container);
    var self = this;
    var timeoutSlider = null;

    var $sliderItem = this.$container.find(".slider_item");
    var $sliderList = this.$container.find(".slider_list");
    var $sliderViewport = this.$container.find(".slider_viewport");
    var $arrowLeft = this.$container.find(".slider_arrow__left");
    var $arrowRight = this.$container.find(".slider_arrow__right");

    var itemWidth = $sliderItem.width(); // Slide width
    var itemCount = $sliderItem.length; // Sliders amount

    var itemsWidth = itemWidth * itemCount; // Slider-list width
    var viewportWidth = itemWidth * defaults.items;  // Viewport width
    var dotsCount = itemWidth * itemCount/viewportWidth; // Dots amount

    $sliderViewport.css('width', viewportWidth); // Set css width for viewport
    $sliderList.css('width', itemsWidth); // Set css width for slider-list


    /** Paint dots DOM */
    var $dotItems = $('<div/>', {
      class: 'slider_control-nav',
    })
    for (var i = 0; i < dotsCount; i++){
      var $dotItem = $('<div class="slider_control-nav-item"/>');
      $dotItems.append($dotItem);
    }
    this.$container.append($dotItems);


    /** method _initialize */
    function _initialize() {
      // For slider with loop
      if (defaults.loop && (dotsCount > 2)) {
        // Копия последних слайдов помещается в перед чтоб первый слайд был на втором месте, без пустот по бокам
        $sliderList.children().slice(-defaults.items).clone().prependTo($sliderList);
        $sliderList.children().slice(-defaults.items).remove();
        $sliderList.css('margin-left', -viewportWidth);
      }

      self.dotMove(self.dotCurrent);
      self.photosMove(self.photosCurrent);

      _setEvents();

      return self;
    }

    /** method _setEvents */
    function _setEvents() {
      $arrowLeft.click(function(){
        self.dotMove(--dotIndex);
        self.photosMove(--photosIndex);

        return false;
      });

      $arrowRight.click(function() {
        self.dotMove(++dotIndex);
        self.photosMove(++photosIndex);

        return false;
      });

      $dotItems.on('click', '.slider_control-nav-item', function(){
        self.dotMove($(this).index());
        self.photosMove($(this).index());

        return false;
      });
    }

    /** Auto-move photos of the slider in loop. */
    this.startSlideShow = function() {
        clearTimeout(timeoutSlider);

        timeoutSlider = setTimeout(function(){
        self.dotMove(++dotIndex);
        self.photosMove(++photosIndex);
      }, defaults.interval);

      return self;
    };

    /**
     * Move photos of the slider.
     * *@param {Number}  [index] The step of photos-view to move to.
     */
    var photosIndex = 0;
    var photosMargin;
    var photosIndexPrevious = 0;
    this.photosCurrent = 0;
    this.photosMove = function(index) {
      photosIndex = isNaN(index) ? self.photosCurrent : index;
      // Номер текущего слайда кратно количеству dots
      self.photosCurrent = photosIndex % dotsCount;

      // For slider without loop
      if (!defaults.loop){
        if(photosIndex < 0) {
          self.photosCurrent = photosIndex = 0;
        }

        if(photosIndex >= dotsCount) {
          self.photosCurrent = photosIndex = dotsCount - 1;
        }

        photosMargin = -viewportWidth * photosIndex;
        $sliderList.animate({marginLeft:photosMargin},500);
      }

      // For slider with loop
      if (defaults.loop && (dotsCount > 2)) {
          photosMargin = -viewportWidth;

        // Go to the next slide
        if(photosIndexPrevious < photosIndex) {
          $sliderList.animate({marginLeft: 2*photosMargin},500);

          setTimeout(function() {
            // Копия первых слайдов помещается в конец.
            $sliderList.children().slice(0, defaults.items).clone().appendTo($sliderList);
            $sliderList.children().slice(0, defaults.items).remove();
            $sliderList.css('margin-left', photosMargin);
          }, 600);
        }
        // Go to the previous slide
        else if (photosIndexPrevious > photosIndex) {
          $sliderList.animate({marginLeft: 0},500);

          setTimeout(function() {
            // Копия последних слайдов помещается в перед.
            $sliderList.children().slice(-defaults.items).clone().prependTo($sliderList);
            $sliderList.children().slice(-defaults.items).remove();
            $sliderList.css('margin-left', photosMargin);
          }, 600);
        }

        // Remember number of revious slide
        photosIndexPrevious = photosIndex;
      }
      else {
        if(photosIndex < 0) {
          self.photosCurrent = photosIndex = dotsCount - 1;
        }

        if(photosIndex >= dotsCount) {
          self.photosCurrent = photosIndex = 0;
        }

        photosMargin = -viewportWidth * photosIndex;
        $sliderList.animate({marginLeft:photosMargin},500);
      }


      // Function callback from slider settings
      defaults.callback(self.photosCurrent);

      // Turn On auto-slideshow of the slider
      self.startSlideShow();

      // Only for slider without loop
      if (!defaults.loop){
        _setButtons();
      }

      return self;
    };

    /**
     * Move to a specific dot.
     * @param {Number}  [index] The dot to move to.
     */
    var dotIndex = 0;
    this.dotCurrent = 0;
    this.dotMove = function(index) {

      dotIndex = isNaN(index) ? self.dotCurrent : index;
      self.dotCurrent = dotIndex % dotsCount;

      // For slider without loop
      if (!defaults.loop){
        if(dotIndex < 0) {
          self.dotCurrent = dotIndex = 0;
        }

        if(dotIndex >= dotsCount) {
          self.dotCurrent = dotIndex = dotsCount - 1;
        }
      }
      // For slider with loop
      else {
        if(dotIndex < 0) {
          self.dotCurrent = dotIndex = dotsCount - 1;
        }

        if(dotIndex > dotsCount) {
          self.dotCurrent = dotIndex = 1;
        }
      }

      $dotItems.children().removeClass("is-active");
      var $dots = $dotItems.children();
      $($dots[self.dotCurrent]).addClass("is-active");

      return self;
    };

    /** method _setButtons for disabling arrows */
    function _setButtons() {
      $arrowLeft.toggleClass("is-disabled", self.dotCurrent <= 0);
      $arrowRight.toggleClass("is-disabled", self.dotCurrent > (dotsCount - 2));
    }

    /**  Return amount of photo-slides */
    this.getSlidesCount = function() {
      return itemCount;
    };

    return _initialize();

  }

  $.fn.slider = function(options) {
    if (options === undefined) {
      options = {}
    }

    if (typeof options === 'object') {
      return new $.slider(this, options);
    }
  }

})(jQuery);