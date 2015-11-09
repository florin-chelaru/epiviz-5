/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 4:27 PM
 */

goog.provide('epiviz.controllers.DataContext');

goog.require('epiviz.controllers.Controller');

goog.require('goog.string.format');

/**
 * @param {angular.Scope} $scope
 * @constructor
 * @extends {epiviz.controllers.Controller}
 */
epiviz.controllers.DataContext = function($scope) {
  epiviz.controllers.Controller.apply(this, arguments);

  /** @type {vs.ui.DataHandler} */
  var dataHandler = $scope['vsDataContext'].handler.handler;
  var $window = $scope['vsWindow'].handler.$window;
  var data = dataHandler.data;
  var range = vs.models.GenomicRangeQuery.extract(data.query);
  $scope.name = dataHandler.name;
  $scope.location = goog.string.format('%s:%s-%s', range.chr, range.start, range.end);

  var regex = /^\s*([a-zA-Z0-9]+)\s*\:\s*([0-9]+)\s*\-\s*([0-9]+)\s*$/;

  $scope.query = function() {
    var matches = $scope.location.match(regex);
    if (!matches || matches.length < 4) { throw new Error('Invalid location'); }

    var chr = matches[1];
    var start = parseInt(matches[2], 10);
    var end = parseInt(matches[3], 10);

    var q = new vs.models.GenomicRangeQuery(chr, start, end);

    //data.applyQuery(q.query);
    console.log(q.chr + ' ' + q.start + ' ' + q.end);
  };

  $scope.mousedown = function(e) {
    $window.trigger(new $.Event('mousedown', {target: $window[0], originalEvent: e, 'pageX': e.pageX, 'pageY': e.pageY}));
  };
};

goog.inherits(epiviz.controllers.DataContext, epiviz.controllers.Controller);

