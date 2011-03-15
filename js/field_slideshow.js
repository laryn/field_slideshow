(function($) {
  Drupal.behaviors.field_slideshow = {
    attach: function(context) {

      for (i in Drupal.settings.field_slideshow) {
        var settings = Drupal.settings.field_slideshow[i];
        var slideshow = $('.' + i);

        // Add padding if needed
        var padding = [0, 0, 0, 0];
        var props = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'];
        $('.field-slideshow-slide:first,.field-slideshow-slide a:first,.field-slideshow-slide img:first').each(function() {
          $this = $(this);
          for (p in props) padding[p%4] += parseInt($this.css(props[p]));
        });
        if (settings.caption != '') padding[2] += $("." + i + " .field-slideshow-caption").outerHeight();
        slideshow.css({
          'padding-top': padding[0] + 'px',
          'padding-right': padding[1] + 'px',
          'padding-bottom': padding[2] + 'px',
          'padding-left': padding[3] + 'px'
        });

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