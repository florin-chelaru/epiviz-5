/**
* @license epiviz
* Copyright (c) 2015 Florin Chelaru & Hector Corrada Bravo
* License: MIT
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
* Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
* WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
* OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


goog.provide('epiviz.Configuration');

/**
 * @constructor
 */
epiviz.Configuration = function() {

};

Object.defineProperties(epiviz.Configuration.prototype, {

});


goog.provide('epiviz.controllers.Controller');

goog.require('epiviz.Configuration');

/**
 * @param {angular.Scope} $scope Angular scope
 * @param {epiviz.Configuration} config
 * @constructor
 */
epiviz.controllers.Controller = function($scope, config) {
  /**
   * {angular.Scope} Angular scope
   * @private
   */
  this._$scope = $scope;

  /**
   * @type {epiviz.Configuration}
   * @private
   */
  this._config = config;

  /**
   * @type {string}
   * @private
   */
  this._id = u.generatePseudoGUID(6);
};

/**
 * @type {string}
 * @name epiviz.controllers.Controller#id
 */
epiviz.controllers.Controller.prototype.id;

/**
 * @type {angular.Scope}
 * @name epiviz.controllers.Controller#$scope
 */
epiviz.controllers.Controller.prototype.$scope;

/**
 * @type {epiviz.Configuration}
 * @name epiviz.controllers.Controller#config
 */
epiviz.controllers.Controller.prototype.config;

Object.defineProperties(epiviz.controllers.Controller.prototype, {
  'id': { get: /** @type {function (this:epiviz.controllers.Controller)} */ (function() { return this._id; })},
  '$scope': { get: /** @type {function (this:epiviz.controllers.Controller)} */ (function() { return this._$scope; })},
  'config': { get: /** @type {function (this:epiviz.controllers.Controller)} */ (function() { return this._config; })}
});


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



goog.provide('epiviz.controllers.Master');

goog.require('epiviz.controllers.Controller');

/**
 * @param {angular.Scope} $scope
 * @constructor
 * @extends {epiviz.controllers.Controller}
 */
epiviz.controllers.Master = function($scope) {
  epiviz.controllers.Controller.apply(this, arguments);

  /**
   * @type {Array.<vs.ui.DataHandler>}
   * @private
   */
  this._dataContexts = [
    u.reflection.wrap({
      name: 'Genetic Variants',
      children: [],
      dataChanged: new u.Event(),
      visualizations: [
        {
          construct: {
            render: 'canvas',
            type: 'scatterplot'
          },
          options: {
            doubleBuffer: true,
            axisBoundaries: {},
            x: 10,
            y: 60,
            width: 200,
            height: 200,
            margins: {
              left: 10,
              right: 10,
              bottom: 10,
              top: 10
            },
            cols: [0, 0],
            vals: 'dna methylation'
          },
          decorators: {
            cls: [
              'vs-window',
              'vs-resizable',
              'vs-movable'
            ],
            elem: [
              {
                cls: 'vs-axis',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-axis',
                options: {
                  type: 'y'
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'y'
                }
              }
            ]
          }
        },
        {
          construct: {
            render: 'svg',
            type: 'scatterplot'
          },
          options: {
            doubleBuffer: false,
            axisBoundaries: {},
            x: 220,
            y: 60,
            width: 200,
            height: 200,
            margins: {
              left: 10,
              right: 10,
              bottom: 10,
              top: 10
            },
            cols: [0, 1],
            vals: 'dna methylation'
          },
          decorators: {
            cls: [
              'vs-window',
              'vs-resizable',
              'vs-movable'
            ],
            elem: [
              {
                cls: 'vs-axis',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-axis',
                options: {
                  type: 'y'
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'y'
                }
              }
            ]
          }
        },
        {
          construct: {
            render: 'canvas',
            type: 'manhattan'
          },
          options: {
            doubleBuffer: true,
            xBoundries: {min: 1000, max: 100000},
            yBoundaries: {min: 0, max: 0.5},
            x: 430,
            y: 60,
            width: 400,
            height: 200,
            margins: {
              left: 10,
              right: 10,
              bottom: 10,
              top: 10
            },
            cols: [0, 1],
            vals: 'v0',
            rows: ['start', 'end']
          },
          decorators: {
            cls: [
              'vs-window',
              'vs-resizable',
              'vs-movable'
            ],
            elem: [
              {
                cls: 'vs-axis',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-axis',
                options: {
                  type: 'y'
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'y'
                }
              }
            ]
          }
        },
        {
          construct: {
            render: 'svg',
            type: 'manhattan'
          },
          options: {
            xBoundries: {min: 1000, max: 100000},
            yBoundaries: {min: 0, max: 0.5},
            x: 430,
            y: 290,
            width: 400,
            height: 200,
            margins: {
              left: 10,
              right: 10,
              bottom: 10,
              top: 10
            },
            cols: [0, 1],
            vals: 'v0',
            rows: ['start', 'end']
          },
          decorators: {
            cls: [
              'vs-window',
              'vs-resizable',
              'vs-movable'
            ],
            elem: [
              {
                cls: 'vs-axis',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-axis',
                options: {
                  type: 'y'
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'x',
                  ticks: 10
                }
              },
              {
                cls: 'vs-grid',
                options: {
                  type: 'y'
                }
              }
            ]
          }
        }
      ],
      data: new vs.models.plugins.BigwigDataSource(
        [
          'http://localhost/E001-H3K4me1.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K4me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9ac.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K27me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K36me3.pval.signal.bigwig'],
        {
          proxyURI: 'http://localhost/bigwig/test/partial.php',
          initialQuery: [
            new vs.models.Query({target: 'rows', targetLabel: 'chr', test: '==', testArgs: 'chr1'}),
            new vs.models.Query({target: 'rows', targetLabel: 'start', test: '<', testArgs: '100000'}),
            new vs.models.Query({target: 'rows', targetLabel: 'end', test: '>=', testArgs: '1000'})
          ]
        }
      )
    }, vs.ui.DataHandler)
  ];
};

goog.inherits(epiviz.controllers.Master, epiviz.controllers.Controller);

/**
 * @type {Array.<vs.ui.DataHandler>}
 * @name epiviz.controllers.Master#dataContexts
 */
epiviz.controllers.Master.prototype.dataContexts;

Object.defineProperties(epiviz.controllers.Master.prototype, {
  'dataContexts': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function() { return this._dataContexts; })
  }
});


goog.provide('epiviz');

goog.require('epiviz.Configuration');
goog.require('epiviz.controllers.Master');
goog.require('epiviz.controllers.DataContext');

epiviz.main = angular.module('epiviz', ['vs']);

epiviz.main.provider('epivizConfig', function() {
  var self = this;
  self.__proto__ = new epiviz.Configuration();
  self.$get = function() { return self; };
});

epiviz.main.config(['epivizConfigProvider', /** @param {epiviz.Configuration} config */ function(config) {

}]);

epiviz.main.config(['configurationProvider', function(configuration) {
  configuration.customize({
    'visualizations': {
      'scatterplot': {
        'canvas': 'vs.ui.plugins.canvas.ScatterPlot',
        'svg': 'vs.ui.plugins.svg.ScatterPlot',
        'default': 'svg'
      },
      'manhattan': {
        'svg': 'vs.ui.plugins.svg.ManhattanPlot',
        'canvas': 'vs.ui.plugins.canvas.ManhattanPlot',
        'default': 'svg'
      }
    },
    'parallel': {
      'nthreads': 16,
      'worker': '/worker.js'
    }
  })
}]);

epiviz.main.controller('epiviz.controllers.Master', ['$scope', function($scope) {
  this['controller'] = u.reflection.applyConstructor(epiviz.controllers.Master, arguments);
}]);

epiviz.main.controller('epiviz.controllers.DataContext', ['$scope', function($scope) {
  this['controller'] = u.reflection.applyConstructor(epiviz.controllers.DataContext, arguments);
}]);
