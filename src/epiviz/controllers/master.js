/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 4:06 PM
 */

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