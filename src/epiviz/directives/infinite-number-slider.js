/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 4/6/2016
 * Time: 10:53 AM
 */


goog.provide('ngb.d.InfiniteNumberSlider');

goog.require('ngu.Directive');

/**
 * @param {angular.Scope} $scope
 * @param $rootScope {angular.$rootScope}
 * @param $q
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.InfiniteNumberSlider = function ($scope, $rootScope, $q) {
  ngu.Directive.apply(this, arguments);
};

goog.inherits(ngb.d.InfiniteNumberSlider, ngu.Directive);

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.InfiniteNumberSlider.prototype.link = function ($scope, $element, $attrs) {
  var lastX;
  var $doc = $(document);

  $element.css('cursor', 'ew-resize');

  var mouseMove = function(e) {
    if (e.screenX == lastX) { return; }
    if (e.screenX > lastX) {
      $element.val(parseInt($element.val(), 10) + 1);
    } else {
      $element.val(parseInt($element.val(), 10) - 1);
    }
    lastX = e.screenX;
    $element.triggerHandler('input');
  };

  var mouseUp = function(e) {
    $doc.off('mousemove', mouseMove);
    $doc.off('mouseup', mouseUp);
  };

  $element
    .mousedown(function(e) {
      lastX = e.screenX;
      $doc.on('mousemove', mouseMove);
      $doc.on('mouseup', mouseUp);
    });
};
