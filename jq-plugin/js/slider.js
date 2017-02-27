/**
 * Slider
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

    var $sliderItem = $(container).find(".slider_item");
    var $sliderList = $(container).find(".slider_list");
    var $sliderViewport = $(container).find(".slider_viewport");
    var $arrowLeft = $(container).find(".slider_arrow__left");
    var $arrowRight = $(container).find(".slider_arrow__right");

    var itemWidth = $(container).width()/options.items; // Slide middle width
    var itemCount = $sliderItem.length; // Sliders amount
    var viewportWidth = itemWidth * options.items;  // Viewport width
    var dotsCount = itemWidth * itemCount/viewportWidth; // Dots amount

    $sliderViewport.css('width', viewportWidth); // Set css width for viewport
    $sliderList.css('width', itemWidth * itemCount); // Set css width for slider-list
    $sliderItem.css('width', itemWidth);

    /** privat method initialize */
    var initialize = function() {
      /** Paint dots DOM */
      $dotItems = $('<div/>', {
        class: 'slider_control-nav',
      })
      for (var i = 0; i < dotsCount; i++){
        $dotItems.append($('<div class="slider_control-nav-item"/>'));
      }
      $(container).append($dotItems);

      // For slider with loop
      if (options.loop) {
        // Копия первых и последних слайдов помещается назад и вперед для эффекта красивой анимации
        $sliderList.children().slice(-options.items).clone().prependTo($sliderList)
        $sliderList.children().slice(options.items, 2 * options.items).clone().appendTo($sliderList);

        $sliderList.css('width', itemWidth * (itemCount + 2*options.items)); // Set css width for slider-list
      }

      photosMove(photosCurrent);
      setEvents();

      // Turn On auto-slideshow of the slider
      //startSlideShow();

    }.bind(this);

    /** privat method setEvents */
    var setEvents = function() {
      $arrowLeft.on('click', function(){
        clearTimeout(timeoutSlider);
        photosMove(--photosIndex);

        //startSlideShow();
      });

      $arrowRight.on('click', function(){
        clearTimeout(timeoutSlider);
        photosMove(++photosIndex);

        //startSlideShow();
      });

      $dotItems.on('click', '.slider_control-nav-item', function(){
        clearTimeout(timeoutSlider);
        photosMove($(this).index());

        //startSlideShow();
      });
    }.bind(this);

    /** Auto-move photos of the slider in loop. */
    var startSlideShow = function() {

      timeoutSlider = setInterval(function(){
        photosMove(++photosIndex);
      }, options.interval);

    }.bind(this);

    /**
     * Move photos of the slider.
     * *@param {Number}  [index] The step of photos-view to move to.
     */
    var photosMove = function(index) {
      photosIndex = isNaN(index) ? photosCurrent : index;
      // Номер текущего слайда кратно количеству dots
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
          'transform':'translate(' + photosMargin + 'px)',
          'transition': 'transform .5s'
        });
      }

      // For slider with loop
      if (options.loop) {
          photosMargin = -viewportWidth * (photosIndex + 1);

        // Go from first to the previous slide
        if(photosIndex < 0) {
          $sliderList.css({
            'transform':'translate(0px)',
            'transition': 'transform .5s'
          });
          setTimeout(function() {
            $sliderList.css({
              'transform': 'translate(' + (-viewportWidth) * dotsCount + 'px)',
              'transition': 'none'
            });
          }, 500);
          photosCurrent = photosIndex = dotsCount - 1;
        }
        // Go from last to the next slide
        else if(photosIndex == dotsCount) {
          $sliderList.css({
            'transform':'translate(' + photosMargin + 'px)',
            'transition': 'transform .5s'
          });
          setTimeout(function() {
            $sliderList.css({
              'transform': 'translate(' + (-viewportWidth) + 'px)',
              'transition': 'none'
            });
          }, 500);
          photosCurrent = photosIndex = 0;
        }
        else if(photosIndex == 0) {
          $sliderList.css({
            'transform':'translate(' + (-viewportWidth) + 'px)'
          });
        }
        else {
          $sliderList.css({
            'transform':'translate(' + photosMargin + 'px)',
            'transition': 'transform .5s'
          });
        }
      }

      // Move to a specific dot.
      $dotItems.children().removeClass("is-active");
      var $dots = $dotItems.children();
      $($dots[photosCurrent]).addClass("is-active");

      // Only for slider without loop
      if (!options.loop){
        setButtons();
      }

      // Function callback from slider settings
      options.callback(photosCurrent);

    }.bind(this);

    /** privat method setButtons for disabling arrows */
    function setButtons() {
      $arrowLeft.toggleClass("is-disabled", photosCurrent <= 0);
      $arrowRight.toggleClass("is-disabled", photosCurrent > (dotsCount - 2));
    }

    /**  Return amount of photo-slides */
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