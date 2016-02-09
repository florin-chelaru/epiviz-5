/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 4:27 PM
 */

goog.provide('epiviz.controllers.DataContext');

goog.require('goog.string.format');

/**
 * @param {angular.Scope} $scope
 * @constructor
 * @extends {ngu.Controller}
 */
epiviz.controllers.DataContext = function($scope) {
  ngu.Controller.apply(this, arguments);

  /**
   * @type {vs.ui.DataHandler}
   * @private
   */
  this._dataHandler = $scope['vsDataContext'].handler;

  /**
   * @type {jQuery}
   * @private
   */
  this._$window = $scope['vsWindow'].$window;

  /**
   * @type {string}
   * @private
   */
  this._name = this._dataHandler.name;

  var range = vs.models.GenomicRangeQuery.extract(this._dataHandler.data.query);

  /**
   * @type {string}
   * @private
   */
  this._location = goog.string.format('%s:%s-%s', range.chr, range.start, range.end);

  /**
   * @type {RegExp}
   * @private
   */
  this._locationRegex = /^\s*([a-zA-Z0-9]+)\s*\:\s*([0-9]+)\s*\-\s*([0-9]+)\s*$/;
};

goog.inherits(epiviz.controllers.DataContext, ngu.Controller);

/**
 * @type {string}
 * @name epiviz.controllers.DataContext#name
 */
epiviz.controllers.DataContext.prototype.name;

/**
 * @type {string}
 * @name epiviz.controllers.DataContext#location
 */
epiviz.controllers.DataContext.prototype.location;

Object.defineProperties(epiviz.controllers.DataContext.prototype, {
  'name': { get: /** @type {function (this:epiviz.controllers.DataContext)} */ (function() { return this._name; })},
  'location': {
    get: /** @type {function (this:epiviz.controllers.DataContext)} */ (function() { return this._location; }),
    set: /** @type {function (this:epiviz.controllers.DataContext)} */ (function(value) { this._location = value; })
  }
});

epiviz.controllers.DataContext.prototype.query = function() {
  var matches = this._location.match(this._locationRegex);
  if (!matches || matches.length < 4) { u.log.error('Invalid query:' + this._location); }

  try {
    var chr = matches[1];
    var start = parseInt(matches[2], 10);
    var end = parseInt(matches[3], 10);

    var q = new vs.models.GenomicRangeQuery(chr, start, end);

    u.log.info(q.chr + ' ' + q.start + ' ' + q.end);
    this._dataHandler.query(q.query)
      .then(function (data) { u.log.info('New data: ', data); });
  } catch (err) {
    u.log.error(err);
  }
};

epiviz.controllers.DataContext.prototype.left = function() {
  try {
    var range = vs.models.GenomicRangeQuery.extract(this._dataHandler.data.query);
    var width = range.end - range.start;
    if (width <= 0) { return; }
    var tenth = Math.ceil(width * 0.1);

    var start = Math.max(0, range.start - tenth);
    var end = start + width;
    this._location = goog.string.format('%s:%s-%s', range.chr, start, end);
    this.query();
  } catch (err) {
    u.log.error(err);
  }
};

epiviz.controllers.DataContext.prototype.right = function() {
  try {
    var range = vs.models.GenomicRangeQuery.extract(this._dataHandler.data.query);
    var width = range.end - range.start;
    if (width <= 0) { return; }
    var tenth = Math.ceil(width * 0.1);

    this._location = goog.string.format('%s:%s-%s', range.chr, range.start + tenth, range.end + tenth);
    this.query();
  } catch (err) {
    u.log.error(err);
  }
};

epiviz.controllers.DataContext.prototype.zoomOut = function() {
  try {
    var range = vs.models.GenomicRangeQuery.extract(this._dataHandler.data.query);
    var width = range.end - range.start;
    if (width <= 0) { return; }
    var tenth = Math.ceil(width * 0.1);

    var start = Math.max(0, range.start - tenth);
    var end = start + width + 2 * tenth;

    this._location = goog.string.format('%s:%s-%s', range.chr, start, end);
    this.query();
  } catch (err) {
    u.log.error(err);
  }
};

epiviz.controllers.DataContext.prototype.zoomIn = function() {
  try {
    var range = vs.models.GenomicRangeQuery.extract(this._dataHandler.data.query);
    var width = range.end - range.start;
    if (width <= 1) { return; }
    var tenth = Math.ceil(width * 0.1);
    if (width - 2 * tenth < 1) { return; }

    var start = range.start + tenth;
    var end = start + width - 2 * tenth;

    this._location = goog.string.format('%s:%s-%s', range.chr, start, end);
    this.query();
  } catch (err) {
    u.log.error(err);
  }
};

epiviz.controllers.DataContext.prototype.mousedown = function(e) {
  this._$window.trigger(new $.Event('mousedown', {'target': this._$window[0], 'originalEvent': e, 'pageX': e.pageX, 'pageY': e.pageY}));
};
