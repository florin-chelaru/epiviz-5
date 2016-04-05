/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 4:27 PM
 */

goog.provide('epiviz.controllers.DataContext');

goog.require('epiviz.controllers.AddVisualization');
goog.require('goog.string.format');

/**
 * @param {angular.Scope} $scope
 * @param {ngb.s.Modal} $ngbModal
 * @constructor
 * @extends {ngu.Controller}
 */
epiviz.controllers.DataContext = function($scope, $ngbModal) {
  ngu.Controller.apply(this, arguments);

  /**
   * @type {ngb.s.Modal}
   * @private
   */
  this._$modal = $ngbModal;

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

  var range = vs.models.GenomicRangeQuery.extract(u.fast.concat(u.fast.map(this._dataHandler.data, function(d) { return d.query; })));

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
      .then(function (data) {
        u.log.info('query, data:', q, data);
      });
  } catch (err) {
    u.log.error(err);
  }
};

epiviz.controllers.DataContext.prototype.left = function() {
  try {
    var range = vs.models.GenomicRangeQuery.extract(u.fast.concat(u.fast.map(this._dataHandler.data, function(d) { return d.query; })));
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
    var range = vs.models.GenomicRangeQuery.extract(u.fast.concat(u.fast.map(this._dataHandler.data, function(d) { return d.query; })));
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
    var range = vs.models.GenomicRangeQuery.extract(u.fast.concat(u.fast.map(this._dataHandler.data, function(d) { return d.query; })));
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
    var range = vs.models.GenomicRangeQuery.extract(u.array.unique(u.fast.concat(u.fast.map(this._dataHandler.data, function(d) { return d.query; }))));
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

epiviz.controllers.DataContext.prototype.addVis = function() {
  var self = this;
  var $scope = this['$scope'];
  var h = this._dataHandler;
  var dlg = {
    'size': 'lg',
    'animation': true,

    'bodyTemplateUrl': 'res/templates/_add-vis.html',
    //'headerTemplateUrl': 'res/html/_user-profile-header.html',
    //'footerTemplateUrl': 'res/html/_login-footer.html',
    'title': 'Add visualization',
    'loaderClass': 'tf-loader',// tf-loader is not defined, which means we don't use a loader
    'fixed': false,
    'useFooterInputText': false,
    'controller': 'epiviz.controllers.AddVisualization',
    'controllerAs': 'addVis',
    'resolve': {
      'dataHandler': function() { return h; }
    }
  };

  var modalInstance = this._$modal.open(dlg);
  modalInstance.result.then(
    /**
     * @param {{visualization: string, engine: string, options: Object.<string, *>}} r
     */
    function(r) {
      // TODO
      // $scope.$emit('addVis', r);
      // console.log(r.visualization, r.engine, r.options);
      self._dataHandler.visualizations.push({
        'construct': {
          'render': r['engine'],
          'type': r['visualization']
        },
        'options': u.extend({'x': 50, 'y': 50}, r['options']),
        'decorators': {
          'cls': [
            'vs-window',
            'vs-resizable',
            'vs-movable',
            'vs-loader'
          ],
          'elem': [
            /*{
              'cls': 'vs-axis',
              'options': {
                'type': 'x',
                'ticks': 10,
                'label': 'true'
              }
            },
            {
              'cls': 'vs-axis',
              'options': {
                'type': 'y',
                'label': 'true'
              }
            },
            {
              'cls': 'vs-grid',
              'options': {
                'type': 'x',
                'ticks': 10
              }
            },
            {
              'cls': 'vs-grid',
              'options': {
                'type': 'y'
              }
            }*/
          ]
        }
      })
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });

};
