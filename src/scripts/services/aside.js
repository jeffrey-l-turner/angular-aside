angular.module('ngAside')
  /**
   * @ngdoc service
   * @name ngAside.services:$aside
   * @description
   * Factory to create a modal instance to use it as aside. It simply wraps $modal by overriding open() method and sets a class on modal window.
   * @function
   */
  .factory('$aside', function($modal) {
    'use strict';
    var defaults = this.defaults = {
      placement: 'left'
    },

       asideFactory = {
      // override open method
      open: function(config) {
        var options = angular.extend({}, defaults, config),
            vertHoriz;
        // check placement is set correct
        if (['left', 'right', 'bottom', 'top'].indexOf(options.placement) === -1) {
          options.placement = defaults.placement;
        }
        vertHoriz = ['left', 'right'].indexOf(options.placement) === -1 ? 'vertical' : 'horizontal';
        // set aside classes
        options.windowClass = 'ng-aside ' + vertHoriz + ' ' + options.placement + (options.windowClass ? ' ' + options.windowClass : '');
        delete options.placement;
        return $modal.open(options);
      }
    },

    // create $aside as extended $modal
        $aside = angular.extend({}, $modal, asideFactory);

    return $aside;
  });
