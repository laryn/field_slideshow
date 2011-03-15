(function($) {
  Drupal.behaviors.field_slideshow = {
    attach: function(context) {

      for (i in Drupal.settings.field_slideshow) {
        var settings = Drupal.settings.field_slideshow[i];
        var slideshow = $('.' + i);

        // Add Caption height if exists
        if (settings.caption != '') slideshow.css("padding-bottom", ($("." + i + " .field-slideshow-caption").outerHeight() + parseInt($("." + i + " .field-slideshow-slide img").css("margin-bottom"))) + "px");

        // Create Pager wrapper
        if (settings.pager != '') slideshow.after("<" + (settings.pager == 'image' ? 'ul' : 'div') + " id='" + i + "-pager' class='field-slideshow-pager'/>");

        // Create Controls
        if (settings.controls) slideshow.after("<div id='" + i + "-controls' class='field-slideshow-controls'><a href='#' class='prev'>" + Drupal.t('Prev') + "</a> <a href='#' class='next'>" + Drupal.t('Next') + "</a></div>");

        // Add options
        var options = {
          resizing: 0,
          fx: settings.fx,
          speed: settings.speed,
          timeout: parseInt(settings.timeout)
        }

        if (settings.speed == "0" && settings.timeout == "0") options.fastOnEvent = true;
        if (settings.controls != "0") {
          options.prev = "#" + i + "-controls .prev";
          options.next = "#" + i + "-controls .next";
        }
        if (settings.pause != "0") options.pause = true;

        if (settings.pager != '') {
          options.pager = "#" + i + "-pager";
          if (settings.pager == 'image') options.pagerAnchorBuilder = function(idx, slide) {
            return '<li><a href="#"><img src="' + settings.pager_thumbnails[idx] + '"/></a></li>';
          };
        }

        // Cycle!
        slideshow.cycle(options);

      }

    }
  }
})(jQuery);