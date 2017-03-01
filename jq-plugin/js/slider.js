/**
 * My Slider
 * @author  Lazarenko Inna, 2017
 */

(function($) {

  'use strict';

  $.slider = function(container, options) {

    var options  = $.extend( {
      interval: 3000,
      items: 1,
      loop: false,
      callback: function() {}
    }, options);

    var $dotItems;
    var photosMargin;
    var photosIndex = 0;
    var photosCurrent = 0;
    var timeoutSlider = null;
    var animation_speed = 500;
    var animation_speed_for_fix;
    animation_speed_for_fix = animation_speed + 100;
    var dotsCount;

    var $sliderItem = $(container).find(".slider_item");
    var $sliderList = $(container).find(".slider_list");
    var $sliderViewport = $(container).find(".slider_viewport");
    var $arrowLeft = $(container).find(".slider_arrow__left");
    var $arrowRight = $(container).find(".slider_arrow__right");

    var itemWidth = $(container).width()/options.items; // Slide middle width
    var itemCount = $sliderItem.length; // Sliders amount
    var viewportWidth = itemWidth * options.items;  // Viewport width
     // Dots amount
    if (options.items > 1){
      dotsCount = Math.ceil(itemCount/options.items);
    }
    else {
      dotsCount = itemCount/options.items;
    }

    //$sliderViewport.css('width', viewportWidth); // Set css width for viewport
    $sliderList.css('width', itemWidth * itemCount); // Set css width for slider-list
    $sliderItem.css('width', itemWidth);


    /**
     * initialize
     * @private
     */
    var initialize = function() {
      // Paint dots DOM
      $dotItems = $('<div class="slider_control-nav"/>');

      for (var i = 0; i < dotsCount; i++){
        $dotItems.append($('<div class="slider_control-nav-item"/>'));
      }
      $(container).append($dotItems);

      // For slider with loop
      if (options.loop) {
        // Copy the first and last slide is placed backward and forward for a beautiful animation effect
        $sliderList.children().slice(-options.items).clone().prependTo($sliderList)
        $sliderList.children().slice(options.items, 2 * options.items).clone().appendTo($sliderList);

        $sliderList.css('width', itemWidth * (itemCount + 2*options.items)); // Set css width for slider-list
      }

      photosMove(photosCurrent);
      setEvents();

      // Turn On auto-slideshow of the slider
      startLoopInterval();

    }.bind(this);


    /**
     * setEvents
     * @private
     */
    var setEvents = function() {
      $arrowLeft.on('click', function(){
        clearTimeout(timeoutSlider);
        photosMove(--photosIndex);

        startLoopInterval();
      });

      $arrowRight.on('click', function(){
        clearTimeout(timeoutSlider);
        photosMove(++photosIndex);

        startLoopInterval();
      });

      $dotItems.on('click', '.slider_control-nav-item', function(){
        clearTimeout(timeoutSlider);
        photosMove($(this).index());

        startLoopInterval();
      });
    };

    /**
     * Auto-move photos of the slider in loop.
     * @private
    */
    var startLoopInterval = function() {

      timeoutSlider = setInterval(function(){
        photosMove(++photosIndex);
      }, options.interval);

    }.bind(this);

    /**
     * Move photos of the slider.
     * @param {Number}  [index] The step of photos-view to move to.
     * @private
     */
    var photosMove = function(index) {
      photosIndex = isNaN(index) ? photosCurrent : index;
      // Number of the current slide is a multiple of the number of dots
      photosCurrent = photosIndex % dotsCount;

      // For slider without loop
      if (!options.loop){
        if(photosIndex < 0) {
          photosCurrent = photosIndex = 0;
        }

        if(photosIndex >= dotsCount) {
          photosCurrent = photosIndex = dotsCount - 1;
        }

        photosMargin = -viewportWidth * photosIndex;
        $sliderList.css({
          transform:'translate(' + photosMargin + 'px)',
          transition: 'transform ' + animation_speed + 'ms'
        });
      }

      // For slider with loop
      if (options.loop) {
        photosMargin = -viewportWidth * (photosIndex + 1);

       // Go from first to the last slide
        if(photosIndex < 0 && itemCount%options.items == 0) {
          $sliderList.css({
            transform:'translate(0px)',
            transition: 'transform ' + animation_speed + 'ms'
          });
          setTimeout(function() {
            $sliderList.css({
              transform: 'translate(' + (-viewportWidth) * dotsCount + 'px)',
              transition: 'none'
            });
          }, animation_speed);
          photosCurrent = photosIndex = dotsCount - 1;
        }
        // Go from last to the next slide
        else if(photosIndex === dotsCount && itemCount%options.items == 0) {
          $sliderList.css({
            transform:'translate(' + photosMargin + 'px)',
            transition: 'transform ' + animation_speed + 'ms'
          });
          setTimeout(function() {
            $sliderList.css({
              transform: 'translate(' + (-viewportWidth) + 'px)',
              transition: 'none'
            });
          }, animation_speed);
          photosCurrent = photosIndex = 0;
        }

        /*
         *For uneven number of slides to options.items ------------------------
         */
        // Go from first to the last slide
        else if(photosIndex < 0 && itemCount%options.items > 0) {
          $sliderList.css({
            transform:'translate(0px)',
            transition: 'transform ' + animation_speed + 'ms'
          });
          setTimeout(function() {
            $sliderList.css({
              transform: 'translate(' + (-itemCount*itemWidth) + 'px)',
              transition: 'none'
            });
          }, animation_speed);
          setTimeout(function() {
            $sliderList.css({
              transition: 'transform ' + animation_speed_for_fix + 'ms'
            });
          }, animation_speed_for_fix);
          photosCurrent = photosIndex = dotsCount - 1;
        }

        // Go from previous to the next slide
        else if(photosIndex === (dotsCount - 1) && itemCount%options.items > 0) {
          $sliderList.css({
            transform:'translate(' + (-itemCount*itemWidth) + 'px)',
            transition: 'transform ' + animation_speed + 'ms'
          });
        }

        // Go from last to the next slide
        else if(photosIndex === dotsCount && itemCount%options.items > 0) {
          $sliderList.css({
            transform:'translate(' + (-itemCount*itemWidth - viewportWidth) + 'px)',
            transition: 'transform ' + animation_speed + 'ms'
          });
          setTimeout(function() {
            $sliderList.css({
              transform: 'translate(' + (-viewportWidth) + 'px)',
              transition: 'none'
            });
          }, animation_speed);
          photosCurrent = photosIndex = 0;
        }
        /*
         * End: For uneven number of slides-----------------------
         */

        else if(photosIndex == 0) {
          $sliderList.css({
            transform:'translate(' + (-viewportWidth) + 'px)'
          });
        }
        else {
          $sliderList.css({
            transform:'translate(' + photosMargin + 'px)',
            transition: 'transform ' + animation_speed + 'ms'
          });
        }

      }

      // Move to a specific dot.
      $dotItems.children().removeClass("is-active");
      var $dots = $dotItems.children();
      $dots.eq(photosCurrent).addClass("is-active");

      // Only for slider without loop
      if (!options.loop){
        setButtons();
      }

      // Function callback from slider settings
      options.callback(photosCurrent);

    }.bind(this);

    /**
     * for disabling arrows
     * @private
     */
    function setButtons() {
      $arrowLeft.toggleClass("is-disabled", photosCurrent <= 0);
      $arrowRight.toggleClass("is-disabled", photosCurrent > (dotsCount - 2));
    }

    // Return amount of photo-slides
    this.getSlidesCount = function() {
      return itemCount;
    };

    return initialize();
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