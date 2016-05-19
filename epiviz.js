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


goog.provide('epiviz.controllers.Master');

/**
 * @param {angular.Scope} $scope
 * @constructor
 * @extends {ngu.Controller}
 */
epiviz.controllers.Master = function($scope) {
  ngu.Controller.apply(this, arguments);

  var palette = d3.scale.category10();

  var proxyUrl = 'bower_components/bigwig.js/test/partial.php';
  var initialQuery = [
    new vs.models.Query({'target': 'chr', 'test': '==', 'testArgs': 'chr1'}),
    new vs.models.Query({'target': 'start', 'test': '<', 'testArgs': '1336878'}),
    new vs.models.Query({'target': 'end', 'test': '>=', 'testArgs': '1298894'})
  ];

  /**
   * @type {Array.<vs.ui.DataHandler>}
   * @private
   */
  this._dataContexts = [
    u.reflection.wrap({
      'name': 'Genetic Variants',
      'children': [],
      'dataChanged': new u.Event(),
      'visualizations': [
        /*{
          'construct': {
            'render': 'canvas',
            'type': 'scatterplot'
          },
          'options': {
            'doubleBuffer': true,
            'axisBoundaries': {},
            'x': 10,
            'y': 60,
            'width': 200,
            'height': 200,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': ['sample2','sample1'],
            'xVal': 'start',
            'yVal': 'avg',
            'fills': function() { return palette; },
            'strokes': function() { return palette; },
            'selectStrokeThickness': 4
          },
          'decorators': {
            'cls': [
              'vs-window',
              'vs-resizable',
              'vs-movable',
              'vs-loader'
            ],
            'elem': [
              {
                'cls': 'vs-axis',
                'options': {
                  'type': 'x',
                  'ticks': 10,
                  'label': true
                }
              },
              {
                'cls': 'vs-axis',
                'options': {
                  'type': 'y'
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
              }
            ]
          }
        },*/
        /*{
          'construct': {
            'render': 'svg',
            'type': 'scatterplot'
          },
          'options': {
            'x': 220,
            'y': 60,
            'width': 200,
            'height': 200,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': ['sample2','sample1'],
            'xVal': 'start',
            'yVal': 'avg'
          },
          'decorators': {
            'cls': [
              'vs-window',
              'vs-resizable',
              'vs-movable',
              'vs-loader'
            ],
            'elem': [
              {
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
              }
            ]
          }
        },*/
        /*
        {
          'construct': {
            'render': 'canvas',
            'type': 'manhattan'
          },
          'options': {
            'yBoundaries': {'min': 0, 'max': 30},
            'doubleBuffer': true,
            'x': 430,
            'y': 60,
            'width': 400,
            'height': 200,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': ['sample1'],
            'xVal': 'start',
            'yVal': 'avg',
            'fills': function() { return palette; },
            'strokes': function() { return palette; },
            'selectStrokeThickness': 4,
            'itemRatio': 0.03
          },
          'decorators': {
            'cls': [
              'vs-window',
              'vs-resizable',
              'vs-movable',
              'vs-loader'
            ],
            'elem': [
              {
                'cls': 'vs-axis',
                'options': {
                  'type': 'x',
                  'ticks': 10
                }
              },
              {
                'cls': 'vs-axis',
                'options': {
                  'type': 'y'
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
              }
            ]
          }
        },*/
        /*{
          'construct': {
            'render': 'svg',
            'type': 'manhattan'
          },
          'options': {
            'yBoundaries': {'min': 0, 'max': 30},
            'x': 430,
            'y': 290,
            'width': 400,
            'height': 200,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': ['sample2'],
            'xVal': 'start',
            'yVal': 'avg',
            'fills': function() { return palette; },
            'strokes': function() { return palette; },
            'itemRatio': 0.03
          },
          'decorators': {
            'cls': [
              'vs-window',
              'vs-resizable',
              'vs-movable',
              'vs-loader'
            ],
            'elem': [
              {
                'cls': 'vs-axis',
                'options': {
                  'type': 'x',
                  'ticks': 10,
                  'label': 'genomic location'
                }
              },
              {
                'cls': 'vs-axis',
                'options': {
                  'type': 'y',
                  'label': 'p-val'
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
              }
            ]
          }
        }*/
        /*,
        {
          'construct': {
            'render': 'svg',
            'type': 'heatmap'
          },
          'options': {
            'x': 10,
            'y': 290,
            'width': 400,
            'height': 200,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'yBoundaries': {'min': 0, 'max': 10},
            'cols': ['sample2','sample1', 'sample0', 'sample3', 'sample4', 'sample5'],
            'xVal': 'start',
            'yVal': 'avg',
            'fill': 'rgb(30,96,212)'
          },
          'decorators': {
            'cls': [
              'vs-window',
              'vs-resizable',
              'vs-movable',
              'vs-loader'
            ],
            'elem': []
          }
        }*/
      ],
      'data': [
        'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K4me1.fc.signal.bigwig',
        'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K4me3.fc.signal.bigwig',
        'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K9ac.fc.signal.bigwig',
        'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K9me3.fc.signal.bigwig',
        'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K27me3.fc.signal.bigwig',
        'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K36me3.fc.signal.bigwig'
       ].map(function(url, i) {
         return new vs.models.plugins.BigwigDataSource(url, {'initialQuery': initialQuery, 'proxyURL': proxyUrl, 'id': 'sample' + i});
       })
      /*'data': new vs.models.plugins.BigwigDataSource(
        [
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K4me1.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K4me3.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K9ac.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K9me3.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K27me3.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K36me3.fc.signal.bigwig'],
          /!*'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K4me1.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K4me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9ac.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K27me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K36me3.pval.signal.bigwig'],*!/
        {
          //'proxyURI': 'http://localhost/bigwig/test/partial.php',
          'proxyURI': 'bower_components/bigwig.js/test/partial.php',
          //'proxyURI': 'http://epiviz-dev.cbcb.umd.edu/bigwig/partial.php',
          'initialQuery': [
            new vs.models.Query({'target': 'rows', 'targetLabel': 'chr', 'test': '==', 'testArgs': 'chr1'}),
            //new vs.models.Query({'target': 'rows', 'targetLabel': 'start', 'test': '<', 'testArgs': '10000'}),
            new vs.models.Query({'target': 'rows', 'targetLabel': 'start', 'test': '<', 'testArgs': '1336878'}),
            new vs.models.Query({'target': 'rows', 'targetLabel': 'end', 'test': '>=', 'testArgs': '1298894'})
          ]
        }
      )*/
      /*'data': u.reflection.wrap({
        /!*'dirty': true,*!/
        'nrows': 51,
        'ncols': 2,
        'rows': [
          { 'label': 'snpid', 'd': ['rs114551744', 'rs10752752', 'rs186333629', 'rs12567310', 'rs192416686', 'rs183897471', 'rs145193745', 'rs186202256', 'rs186081217', 'rs192275158', 'rs72751993', 'rs1294299', 'rs1294287', 'rs183137223', 'rs190017470', 'rs114235520', 'rs149955012', 'rs1294266', 'rs142045052', 'rs75917843', 'rs77516196', 'rs192643817', 'rs148457912', 'rs77061983', 'rs12566188', 'rs190201031', 'rs192453879', 'rs183717127', 'rs148650720', 'rs962786', 'rs185014438', 'chr1:233490543', 'rs143728354', 'rs58507994', 'rs192456647', 'rs4649305', 'rs188603098', 'rs12093733', 'rs183414162', 'rs147666657', 'rs185545182', 'rs187596032', 'rs140818495', 'rs6669125', 'rs12046622', 'rs191178764', 'rs142593417', 'rs12021569', 'rs1294244', 'rs145593563', 'rs1294240'] },
          { 'label': 'chr', 'd': ['chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1', 'chr1'] },
          { 'label': 'start', 'boundaries': {'min': 233430449, 'max': 233517394}, 'd': [233430449, 233430787, 233434167, 233440166, 233445488, 233451557, 233451592, 233454543, 233458743, 233460369, 233468388, 233468950, 233471626, 233472817, 233474525, 233475563, 233476091, 233476263, 233476611, 233477990, 233479122, 233479411, 233480171, 233482035, 233482794, 233485458, 233485758, 233485785, 233488494, 233489054, 233490356, 233490543, 233490874, 233491638, 233491660, 233491811, 233493514, 233494747, 233498953, 233500924, 233502622, 233504063, 233508441, 233509349, 233510220, 233514010, 233515209, 233516041, 233516495, 233516539, 233517394] },
          { 'label': 'end', 'boundaries': {'min': 233430449, 'max': 233517394}, 'd': [233430449, 233430787, 233434167, 233440166, 233445488, 233451557, 233451592, 233454543, 233458743, 233460369, 233468388, 233468950, 233471626, 233472817, 233474525, 233475563, 233476091, 233476263, 233476611, 233477990, 233479122, 233479411, 233480171, 233482035, 233482794, 233485458, 233485758, 233485785, 233488494, 233489054, 233490356, 233490543, 233490874, 233491638, 233491660, 233491811, 233493514, 233494747, 233498953, 233500924, 233502622, 233504063, 233508441, 233509349, 233510220, 233514010, 233515209, 233516041, 233516495, 233516539, 233517394] }
        ],
        'cols': [
          { 'label': 'name', 'd': ['disease1','disease2'] },
          { 'label': 'id', 'd': [1,2] }
        ],
        'vals': [
          {
            'label': 'avg',
            'd': [
              // disease1
              0.404408372, 0.803992066, 0.507903609, 0.547426622, 0.871425707, 0.485113325, 0.942985046, 0.80968252, 0.59025104, 0.446705793, 0.367949548, 0.837335724, 0.149008212, 0.815750721, 0.093113352, 0.760738683, 0.930361486, 0.865139848, 0.287298789, 0.345222337, 0.265686873, 0.326640821, 0.780148806, 0.760738683, 0.188583291, 0.545830368, 0.660700041, 0.683667077, 0.568244947, 0.931031203, 0.264302602, 0.272114888, 0.385857376, 0.184553922, 0.931031203, 0.545830368, 0.371864446, 0.345417064, 0.257295141, 0.747021106, 0.156752567, 0.896914644, 0.861281252, 0.039224306, 0.737350595, 0.814257925, 0.47957881, 0.49590813, 0.463224669, 0.468325228, 0.411346765,
              // disease2
              0.882708277, 0.382179127, 0.004464214, 0.956819961, 0.63578401, 0.006068026, 0.011369486, 0.849105131, 0.045518979, 0.073306556, 0.355315744, 0.836675429, 0.247715838, 0.878707621, 0.17187381, 0.975673874, 0.040117816, 0.814716033, 0.252212106, 0.250706362, 0.240120589, 0.213638592, 0.950169885, 0.975673874, 0.02665442, 0.732943237, 0.835452127, 0.292697145, 0.803356351, 0.570762048, 0.25849114, 0.389962194, 0.677604718, 0.135996401, 0.570762048, 0.732943237, 0.206626417, 0.746734601, 0.140132017, 0.417547526, 0.991532188, 0.690396282, 0.179808891, 0.99351707, 0.588622432, 0.032090482, 0.478861261, 0.441972278, 0.402009328, 0.502378328, 0.289511637
            ],
            't': true, // transpose
            'boundaries': { 'min': 0, 'max': 1 }
          }],
        'query': [
          new vs.models.Query({'target': 'rows', 'targetLabel': 'chr', 'test': '==', 'testArgs': 'chr1'}),
          new vs.models.Query({'target': 'rows', 'targetLabel': 'start', 'test': '<', 'testArgs': '233517394'}),
          new vs.models.Query({'target': 'rows', 'targetLabel': 'end', 'test': '>=', 'testArgs': '233430449'})
        ]
      }, vs.models.DataSource)*/
      /*'data': [
        u.reflection.wrap({
          "id": "sample1",
          "label": "disease1",
          "state": "static",
          "rowMetadata": [
            {
              "label": "snpid"
            },
            {
              "label": "chr"
            },
            {
              "label": "start",
              "boundaries": {
                "min": 233430449,
                "max": 233517394
              },
              "type": "number"
            },
            {
              "label": "end",
              "boundaries": {
                "min": 233430449,
                "max": 233517394
              },
              "type": "number"
            },
            {
              "label": "avg",
              "type": "number",
              "boundaries": {
                "min": 0,
                "max": 1
              }
            }
          ],
          "d": [
            /!*{
             "snpid": "rs114551744",
             "chr": "chr1",
             "start": 233430449,
             "end": 233430449,
             "avg": 0.404408372,
             "__d__": "sample1"
             },*!/
            {
              "snpid": "rs10752752",
              "chr": "chr1",
              "start": 233430787,
              "end": 233430787,
              "avg": 0.803992066,
              "__d__": "sample1"
            },
            {
              "snpid": "rs186333629",
              "chr": "chr1",
              "start": 233434167,
              "end": 233434167,
              "avg": 0.507903609,
              "__d__": "sample1"
            },
            {
              "snpid": "rs12567310",
              "chr": "chr1",
              "start": 233440166,
              "end": 233440166,
              "avg": 0.547426622,
              "__d__": "sample1"
            },
            {
              "snpid": "rs192416686",
              "chr": "chr1",
              "start": 233445488,
              "end": 233445488,
              "avg": 0.871425707,
              "__d__": "sample1"
            },
            {
              "snpid": "rs183897471",
              "chr": "chr1",
              "start": 233451557,
              "end": 233451557,
              "avg": 0.485113325,
              "__d__": "sample1"
            },
            {
              "snpid": "rs145193745",
              "chr": "chr1",
              "start": 233451592,
              "end": 233451592,
              "avg": 0.942985046,
              "__d__": "sample1"
            },
            {
              "snpid": "rs186202256",
              "chr": "chr1",
              "start": 233454543,
              "end": 233454543,
              "avg": 0.80968252,
              "__d__": "sample1"
            },
            {
              "snpid": "rs186081217",
              "chr": "chr1",
              "start": 233458743,
              "end": 233458743,
              "avg": 0.59025104,
              "__d__": "sample1"
            },
            {
              "snpid": "rs192275158",
              "chr": "chr1",
              "start": 233460369,
              "end": 233460369,
              "avg": 0.446705793,
              "__d__": "sample1"
            },
            {
              "snpid": "rs72751993",
              "chr": "chr1",
              "start": 233468388,
              "end": 233468388,
              "avg": 0.367949548,
              "__d__": "sample1"
            },
            {
              "snpid": "rs1294299",
              "chr": "chr1",
              "start": 233468950,
              "end": 233468950,
              "avg": 0.837335724,
              "__d__": "sample1"
            },
            {
              "snpid": "rs1294287",
              "chr": "chr1",
              "start": 233471626,
              "end": 233471626,
              "avg": 0.149008212,
              "__d__": "sample1"
            },
            {
              "snpid": "rs183137223",
              "chr": "chr1",
              "start": 233472817,
              "end": 233472817,
              "avg": 0.815750721,
              "__d__": "sample1"
            },
            {
              "snpid": "rs190017470",
              "chr": "chr1",
              "start": 233474525,
              "end": 233474525,
              "avg": 0.093113352,
              "__d__": "sample1"
            },
            {
              "snpid": "rs114235520",
              "chr": "chr1",
              "start": 233475563,
              "end": 233475563,
              "avg": 0.760738683,
              "__d__": "sample1"
            },
            {
              "snpid": "rs149955012",
              "chr": "chr1",
              "start": 233476091,
              "end": 233476091,
              "avg": 0.930361486,
              "__d__": "sample1"
            },
            {
              "snpid": "rs1294266",
              "chr": "chr1",
              "start": 233476263,
              "end": 233476263,
              "avg": 0.865139848,
              "__d__": "sample1"
            },
            {
              "snpid": "rs142045052",
              "chr": "chr1",
              "start": 233476611,
              "end": 233476611,
              "avg": 0.287298789,
              "__d__": "sample1"
            },
            {
              "snpid": "rs75917843",
              "chr": "chr1",
              "start": 233477990,
              "end": 233477990,
              "avg": 0.345222337,
              "__d__": "sample1"
            },
            {
              "snpid": "rs77516196",
              "chr": "chr1",
              "start": 233479122,
              "end": 233479122,
              "avg": 0.265686873,
              "__d__": "sample1"
            },
            {
              "snpid": "rs192643817",
              "chr": "chr1",
              "start": 233479411,
              "end": 233479411,
              "avg": 0.326640821,
              "__d__": "sample1"
            },
            {
              "snpid": "rs148457912",
              "chr": "chr1",
              "start": 233480171,
              "end": 233480171,
              "avg": 0.780148806,
              "__d__": "sample1"
            },
            {
              "snpid": "rs77061983",
              "chr": "chr1",
              "start": 233482035,
              "end": 233482035,
              "avg": 0.760738683,
              "__d__": "sample1"
            },
            {
              "snpid": "rs12566188",
              "chr": "chr1",
              "start": 233482794,
              "end": 233482794,
              "avg": 0.188583291,
              "__d__": "sample1"
            },
            {
              "snpid": "rs190201031",
              "chr": "chr1",
              "start": 233485458,
              "end": 233485458,
              "avg": 0.545830368,
              "__d__": "sample1"
            },
            {
              "snpid": "rs192453879",
              "chr": "chr1",
              "start": 233485758,
              "end": 233485758,
              "avg": 0.660700041,
              "__d__": "sample1"
            },
            {
              "snpid": "rs183717127",
              "chr": "chr1",
              "start": 233485785,
              "end": 233485785,
              "avg": 0.683667077,
              "__d__": "sample1"
            },
            {
              "snpid": "rs148650720",
              "chr": "chr1",
              "start": 233488494,
              "end": 233488494,
              "avg": 0.568244947,
              "__d__": "sample1"
            },
            {
              "snpid": "rs962786",
              "chr": "chr1",
              "start": 233489054,
              "end": 233489054,
              "avg": 0.931031203,
              "__d__": "sample1"
            },
            {
              "snpid": "rs185014438",
              "chr": "chr1",
              "start": 233490356,
              "end": 233490356,
              "avg": 0.264302602,
              "__d__": "sample1"
            },
            {
              "snpid": "chr1:233490543",
              "chr": "chr1",
              "start": 233490543,
              "end": 233490543,
              "avg": 0.272114888,
              "__d__": "sample1"
            },
            {
              "snpid": "rs143728354",
              "chr": "chr1",
              "start": 233490874,
              "end": 233490874,
              "avg": 0.385857376,
              "__d__": "sample1"
            },
            {
              "snpid": "rs58507994",
              "chr": "chr1",
              "start": 233491638,
              "end": 233491638,
              "avg": 0.184553922,
              "__d__": "sample1"
            },
            {
              "snpid": "rs192456647",
              "chr": "chr1",
              "start": 233491660,
              "end": 233491660,
              "avg": 0.931031203,
              "__d__": "sample1"
            },
            {
              "snpid": "rs4649305",
              "chr": "chr1",
              "start": 233491811,
              "end": 233491811,
              "avg": 0.545830368,
              "__d__": "sample1"
            },
            {
              "snpid": "rs188603098",
              "chr": "chr1",
              "start": 233493514,
              "end": 233493514,
              "avg": 0.371864446,
              "__d__": "sample1"
            },
            {
              "snpid": "rs12093733",
              "chr": "chr1",
              "start": 233494747,
              "end": 233494747,
              "avg": 0.345417064,
              "__d__": "sample1"
            },
            {
              "snpid": "rs183414162",
              "chr": "chr1",
              "start": 233498953,
              "end": 233498953,
              "avg": 0.257295141,
              "__d__": "sample1"
            },
            {
              "snpid": "rs147666657",
              "chr": "chr1",
              "start": 233500924,
              "end": 233500924,
              "avg": 0.747021106,
              "__d__": "sample1"
            },
            {
              "snpid": "rs185545182",
              "chr": "chr1",
              "start": 233502622,
              "end": 233502622,
              "avg": 0.156752567,
              "__d__": "sample1"
            },
            {
              "snpid": "rs187596032",
              "chr": "chr1",
              "start": 233504063,
              "end": 233504063,
              "avg": 0.896914644,
              "__d__": "sample1"
            },
            {
              "snpid": "rs140818495",
              "chr": "chr1",
              "start": 233508441,
              "end": 233508441,
              "avg": 0.861281252,
              "__d__": "sample1"
            },
            {
              "snpid": "rs6669125",
              "chr": "chr1",
              "start": 233509349,
              "end": 233509349,
              "avg": 0.039224306,
              "__d__": "sample1"
            },
            {
              "snpid": "rs12046622",
              "chr": "chr1",
              "start": 233510220,
              "end": 233510220,
              "avg": 0.737350595,
              "__d__": "sample1"
            },
            {
              "snpid": "rs191178764",
              "chr": "chr1",
              "start": 233514010,
              "end": 233514010,
              "avg": 0.814257925,
              "__d__": "sample1"
            },
            {
              "snpid": "rs142593417",
              "chr": "chr1",
              "start": 233515209,
              "end": 233515209,
              "avg": 0.47957881,
              "__d__": "sample1"
            },
            {
              "snpid": "rs12021569",
              "chr": "chr1",
              "start": 233516041,
              "end": 233516041,
              "avg": 0.49590813,
              "__d__": "sample1"
            },
            {
              "snpid": "rs1294244",
              "chr": "chr1",
              "start": 233516495,
              "end": 233516495,
              "avg": 0.463224669,
              "__d__": "sample1"
            },
            {
              "snpid": "rs145593563",
              "chr": "chr1",
              "start": 233516539,
              "end": 233516539,
              "avg": 0.468325228,
              "__d__": "sample1"
            },
            {
              "snpid": "rs1294240",
              "chr": "chr1",
              "start": 233517394,
              "end": 233517394,
              "avg": 0.411346765,
              "__d__": "sample1"
            }
          ],
          "query": [
            new vs.models.Query({
              "target": "chr",
              "test": "==",
              "testArgs": "chr1"
            }),
            new vs.models.Query({
              "target": "start",
              "test": "<",
              "testArgs": "233517394"
            }),
            new vs.models.Query({
              "target": "end",
              "test": ">=",
              "testArgs": "233430449"
            })
          ],
          "metadata": {
            "name": "disease1",
            "id": 1
          }
        }, vs.models.DataSource),
        u.reflection.wrap({
          "id": "sample2",
          "label": "disease2",
          "state": "static",
          "rowMetadata": [
            {
              "label": "snpid"
            },
            {
              "label": "chr"
            },
            {
              "label": "start",
              "boundaries": {
                "min": 233430449,
                "max": 233517394
              },
              "type": "number"
            },
            {
              "label": "end",
              "boundaries": {
                "min": 233430449,
                "max": 233517394
              },
              "type": "number"
            },
            {
              "label": "avg",
              "type": "number",
              "boundaries": {
                "min": 0,
                "max": 1
              }
            }
          ],
          "d": [
            {
              "snpid": "rs114551744",
              "chr": "chr1",
              "start": 233430449,
              "end": 233430449,
              "avg": 0.882708277,
              "__d__": "sample2"
            },
            /!*{
             "snpid": "rs10752752",
             "chr": "chr1",
             "start": 233430787,
             "end": 233430787,
             "avg": 0.382179127,
             "__d__": "sample2"
             },*!/
            {
              "snpid": "rs186333629",
              "chr": "chr1",
              "start": 233434167,
              "end": 233434167,
              "avg": 0.004464214,
              "__d__": "sample2"
            },
            {
              "snpid": "rs12567310",
              "chr": "chr1",
              "start": 233440166,
              "end": 233440166,
              "avg": 0.956819961,
              "__d__": "sample2"
            },
            {
              "snpid": "rs192416686",
              "chr": "chr1",
              "start": 233445488,
              "end": 233445488,
              "avg": 0.63578401,
              "__d__": "sample2"
            },
            {
              "snpid": "rs183897471",
              "chr": "chr1",
              "start": 233451557,
              "end": 233451557,
              "avg": 0.006068026,
              "__d__": "sample2"
            },
            {
              "snpid": "rs145193745",
              "chr": "chr1",
              "start": 233451592,
              "end": 233451592,
              "avg": 0.011369486,
              "__d__": "sample2"
            },
            {
              "snpid": "rs186202256",
              "chr": "chr1",
              "start": 233454543,
              "end": 233454543,
              "avg": 0.849105131,
              "__d__": "sample2"
            },
            {
              "snpid": "rs186081217",
              "chr": "chr1",
              "start": 233458743,
              "end": 233458743,
              "avg": 0.045518979,
              "__d__": "sample2"
            },
            {
              "snpid": "rs192275158",
              "chr": "chr1",
              "start": 233460369,
              "end": 233460369,
              "avg": 0.073306556,
              "__d__": "sample2"
            },
            {
              "snpid": "rs72751993",
              "chr": "chr1",
              "start": 233468388,
              "end": 233468388,
              "avg": 0.355315744,
              "__d__": "sample2"
            },
            {
              "snpid": "rs1294299",
              "chr": "chr1",
              "start": 233468950,
              "end": 233468950,
              "avg": 0.836675429,
              "__d__": "sample2"
            },
            {
              "snpid": "rs1294287",
              "chr": "chr1",
              "start": 233471626,
              "end": 233471626,
              "avg": 0.247715838,
              "__d__": "sample2"
            },
            {
              "snpid": "rs183137223",
              "chr": "chr1",
              "start": 233472817,
              "end": 233472817,
              "avg": 0.878707621,
              "__d__": "sample2"
            },
            {
              "snpid": "rs190017470",
              "chr": "chr1",
              "start": 233474525,
              "end": 233474525,
              "avg": 0.17187381,
              "__d__": "sample2"
            },
            {
              "snpid": "rs114235520",
              "chr": "chr1",
              "start": 233475563,
              "end": 233475563,
              "avg": 0.975673874,
              "__d__": "sample2"
            },
            {
              "snpid": "rs149955012",
              "chr": "chr1",
              "start": 233476091,
              "end": 233476091,
              "avg": 0.040117816,
              "__d__": "sample2"
            },
            {
              "snpid": "rs1294266",
              "chr": "chr1",
              "start": 233476263,
              "end": 233476263,
              "avg": 0.814716033,
              "__d__": "sample2"
            },
            {
              "snpid": "rs142045052",
              "chr": "chr1",
              "start": 233476611,
              "end": 233476611,
              "avg": 0.252212106,
              "__d__": "sample2"
            },
            {
              "snpid": "rs75917843",
              "chr": "chr1",
              "start": 233477990,
              "end": 233477990,
              "avg": 0.250706362,
              "__d__": "sample2"
            },
            {
              "snpid": "rs77516196",
              "chr": "chr1",
              "start": 233479122,
              "end": 233479122,
              "avg": 0.240120589,
              "__d__": "sample2"
            },
            {
              "snpid": "rs192643817",
              "chr": "chr1",
              "start": 233479411,
              "end": 233479411,
              "avg": 0.213638592,
              "__d__": "sample2"
            },
            {
              "snpid": "rs148457912",
              "chr": "chr1",
              "start": 233480171,
              "end": 233480171,
              "avg": 0.950169885,
              "__d__": "sample2"
            },
            {
              "snpid": "rs77061983",
              "chr": "chr1",
              "start": 233482035,
              "end": 233482035,
              "avg": 0.975673874,
              "__d__": "sample2"
            },
            {
              "snpid": "rs12566188",
              "chr": "chr1",
              "start": 233482794,
              "end": 233482794,
              "avg": 0.02665442,
              "__d__": "sample2"
            },
            {
              "snpid": "rs190201031",
              "chr": "chr1",
              "start": 233485458,
              "end": 233485458,
              "avg": 0.732943237,
              "__d__": "sample2"
            },
            {
              "snpid": "rs192453879",
              "chr": "chr1",
              "start": 233485758,
              "end": 233485758,
              "avg": 0.835452127,
              "__d__": "sample2"
            },
            {
              "snpid": "rs183717127",
              "chr": "chr1",
              "start": 233485785,
              "end": 233485785,
              "avg": 0.292697145,
              "__d__": "sample2"
            },
            {
              "snpid": "rs148650720",
              "chr": "chr1",
              "start": 233488494,
              "end": 233488494,
              "avg": 0.803356351,
              "__d__": "sample2"
            },
            {
              "snpid": "rs962786",
              "chr": "chr1",
              "start": 233489054,
              "end": 233489054,
              "avg": 0.570762048,
              "__d__": "sample2"
            },
            {
              "snpid": "rs185014438",
              "chr": "chr1",
              "start": 233490356,
              "end": 233490356,
              "avg": 0.25849114,
              "__d__": "sample2"
            },
            {
              "snpid": "chr1:233490543",
              "chr": "chr1",
              "start": 233490543,
              "end": 233490543,
              "avg": 0.389962194,
              "__d__": "sample2"
            },
            {
              "snpid": "rs143728354",
              "chr": "chr1",
              "start": 233490874,
              "end": 233490874,
              "avg": 0.677604718,
              "__d__": "sample2"
            },
            {
              "snpid": "rs58507994",
              "chr": "chr1",
              "start": 233491638,
              "end": 233491638,
              "avg": 0.135996401,
              "__d__": "sample2"
            },
            {
              "snpid": "rs192456647",
              "chr": "chr1",
              "start": 233491660,
              "end": 233491660,
              "avg": 0.570762048,
              "__d__": "sample2"
            },
            {
              "snpid": "rs4649305",
              "chr": "chr1",
              "start": 233491811,
              "end": 233491811,
              "avg": 0.732943237,
              "__d__": "sample2"
            },
            {
              "snpid": "rs188603098",
              "chr": "chr1",
              "start": 233493514,
              "end": 233493514,
              "avg": 0.206626417,
              "__d__": "sample2"
            },
            {
              "snpid": "rs12093733",
              "chr": "chr1",
              "start": 233494747,
              "end": 233494747,
              "avg": 0.746734601,
              "__d__": "sample2"
            },
            {
              "snpid": "rs183414162",
              "chr": "chr1",
              "start": 233498953,
              "end": 233498953,
              "avg": 0.140132017,
              "__d__": "sample2"
            },
            {
              "snpid": "rs147666657",
              "chr": "chr1",
              "start": 233500924,
              "end": 233500924,
              "avg": 0.417547526,
              "__d__": "sample2"
            },
            {
              "snpid": "rs185545182",
              "chr": "chr1",
              "start": 233502622,
              "end": 233502622,
              "avg": 0.991532188,
              "__d__": "sample2"
            },
            {
              "snpid": "rs187596032",
              "chr": "chr1",
              "start": 233504063,
              "end": 233504063,
              "avg": 0.690396282,
              "__d__": "sample2"
            },
            {
              "snpid": "rs140818495",
              "chr": "chr1",
              "start": 233508441,
              "end": 233508441,
              "avg": 0.179808891,
              "__d__": "sample2"
            },
            {
              "snpid": "rs6669125",
              "chr": "chr1",
              "start": 233509349,
              "end": 233509349,
              "avg": 0.99351707,
              "__d__": "sample2"
            },
            {
              "snpid": "rs12046622",
              "chr": "chr1",
              "start": 233510220,
              "end": 233510220,
              "avg": 0.588622432,
              "__d__": "sample2"
            },
            {
              "snpid": "rs191178764",
              "chr": "chr1",
              "start": 233514010,
              "end": 233514010,
              "avg": 0.032090482,
              "__d__": "sample2"
            },
            {
              "snpid": "rs142593417",
              "chr": "chr1",
              "start": 233515209,
              "end": 233515209,
              "avg": 0.478861261,
              "__d__": "sample2"
            },
            {
              "snpid": "rs12021569",
              "chr": "chr1",
              "start": 233516041,
              "end": 233516041,
              "avg": 0.441972278,
              "__d__": "sample2"
            },
            {
              "snpid": "rs1294244",
              "chr": "chr1",
              "start": 233516495,
              "end": 233516495,
              "avg": 0.402009328,
              "__d__": "sample2"
            },
            {
              "snpid": "rs145593563",
              "chr": "chr1",
              "start": 233516539,
              "end": 233516539,
              "avg": 0.502378328,
              "__d__": "sample2"
            },
            {
              "snpid": "rs1294240",
              "chr": "chr1",
              "start": 233517394,
              "end": 233517394,
              "avg": 0.289511637,
              "__d__": "sample2"
            }
          ],
          "query": [
            new vs.models.Query({
              "target": "chr",
              "test": "==",
              "testArgs": "chr1"
            }),
            new vs.models.Query({
              "target": "start",
              "test": "<",
              "testArgs": "233517394"
            }),
            new vs.models.Query({
              "target": "end",
              "test": ">=",
              "testArgs": "233430449"
            })
          ],
          "metadata": {
            "name": "disease2",
            "id": 2
          }
        }, vs.models.DataSource)
      ]*/
    }, /** @type {function(new:vs.ui.DataHandler)} */ (vs.ui.DataHandler))
  ];

  /**
   * @type {Array.<{index:number, label:string}>}
   * @private
   */
  this._allEpigenomes = ['IMR90 fetal lung fibroblasts Cell Line', 'ES-WA7 Cells', 'H9 Cells', 'ES-I3 Cells', 'HUES6 Cells', 'HUES48 Cells',
    'HUES64 Cells', 'H1 Cells', 'ES-UCSF4  Cells', 'iPS-20b Cells', 'iPS-18 Cells', 'iPS-15b Cells', 'iPS DF 6.9 Cells',
    'iPS DF 19.11 Cells', 'H1 Derived Neuronal Progenitor Cultured Cells', 'H9 Derived Neuronal Progenitor Cultured Cells',
    'H9 Derived Neuron Cultured Cells', 'hESC Derived CD56+ Mesoderm Cultured Cells',
    'hESC Derived CD56+ Ectoderm Cultured Cells', 'hESC Derived CD184+ Endoderm Cultured Cells',
    'H1 BMP4 Derived Mesendoderm Cultured Cells', 'H1 BMP4 Derived Trophoblast Cultured Cells',
    'H1 Derived Mesenchymal Stem Cells', 'Primary mononuclear cells from peripheral blood',
    'Primary T cells from peripheral blood', 'Primary T cells effector/memory enriched from peripheral blood',
    'Primary T cells from cord blood', 'Primary T regulatory cells from peripheral blood',
    'Primary T helper cells from peripheral blood', 'Primary T helper naive cells from peripheral blood',
    'Primary T helper cells PMA-I stimulated', 'Primary T helper 17 cells PMA-I stimulated',
    'Primary T helper memory cells from peripheral blood 1', 'Primary T helper memory cells from peripheral blood 2',
    'Primary T CD8+ memory cells from peripheral blood', 'Primary T helper naive cells from peripheral blood',
    'Primary T CD8+ naive cells from peripheral blood', 'Primary monocytes from peripheral blood',
    'Primary B cells from cord blood', 'Primary hematopoietic stem cells',
    'Primary hematopoietic stem cells G-CSF-mobilized Male', 'Primary hematopoietic stem cells G-CSF-mobilized Female',
    'Primary hematopoietic stem cells short term culture', 'Primary B cells from peripheral blood',
    'Primary Natural Killer cells from peripheral blood', 'Primary neutrophils from peripheral blood',
    'Bone Marrow Derived Cultured Mesenchymal Stem Cells', 'Mesenchymal Stem Cell Derived Chondrocyte Cultured Cells',
    'Adipose Derived Mesenchymal Stem Cell Cultured Cells', 'Mesenchymal Stem Cell Derived Adipocyte Cultured Cells',
    'Muscle Satellite Cultured Cells', 'Foreskin Fibroblast Primary Cells skin01',
    'Foreskin Fibroblast Primary Cells skin02', 'Foreskin Melanocyte Primary Cells skin01',
    'Foreskin Melanocyte Primary Cells skin03', 'Foreskin Keratinocyte Primary Cells skin02',
    'Foreskin Keratinocyte Primary Cells skin03', 'Breast variant Human Mammary Epithelial Cells (vHMEC)',
    'Breast Myoepithelial Primary Cells', 'Ganglion Eminence derived primary cultured neurospheres',
    'Cortex derived primary cultured neurospheres', 'Thymus', 'Fetal Thymus', 'Brain Hippocampus Middle',
    'Brain Substantia Nigra', 'Brain Anterior Caudate', 'Brain Cingulate Gyrus', 'Brain Inferior Temporal Lobe',
    'Brain Angular Gyrus', 'Brain_Dorsolateral_Prefrontal_Cortex', 'Brain Germinal Matrix', 'Fetal Brain Female',
    'Fetal Brain Male', 'Adipose Nuclei', 'Psoas Muscle', 'Skeletal Muscle Female', 'Skeletal Muscle Male',
    'Fetal Muscle Trunk', 'Fetal Muscle Leg', 'Fetal Heart', 'Right Atrium', 'Left Ventricle', 'Right Ventricle',
    'Aorta', 'Duodenum Smooth Muscle', 'Colon Smooth Muscle', 'Rectal Smooth Muscle', 'Stomach Smooth Muscle',
    'Fetal Stomach', 'Fetal Intestine Small', 'Fetal Intestine Large', 'Small Intestine', 'Sigmoid Colon', 'Colonic Mucosa',
    'Rectal Mucosa Donor 29', 'Rectal Mucosa Donor 31', 'Stomach Mucosa', 'Duodenum Mucosa', 'Esophagus', 'Gastric',
    'Placenta Amnion', 'Fetal Kidney', 'Fetal Lung', 'Ovary', 'Pancreatic Islets', 'Fetal Adrenal Gland', 'Placenta',
    'Liver', 'Pancreas', 'Lung', 'Spleen', 'A549 EtOH 0.02pct Lung Carcinoma Cell Line', 'Dnd41 TCell Leukemia Cell Line',
    'GM12878 Lymphoblastoid Cells', 'HeLa-S3 Cervical Carcinoma Cell Line', 'HepG2 Hepatocellular Carcinoma Cell Line',
    'HMEC Mammary Epithelial Primary Cells', 'HSMM Skeletal Muscle Myoblasts Cells',
    'HSMM cell derived Skeletal Muscle Myotubes Cells', 'HUVEC Umbilical Vein Endothelial Primary Cells',
    'K562 Leukemia Cells', 'Monocytes-CD14+ RO01746 Primary Cells', 'NH-A Astrocytes Primary Cells',
    'NHDF-Ad Adult Dermal Fibroblast Primary Cells', 'NHEK-Epidermal Keratinocyte Primary Cells',
    'NHLF Lung Fibroblast Primary Cells', 'Osteoblast Primary Cells'].map(function(label, i) { return {'label':label, 'index': i}});

  /**
   * @type {string}
   * @private
   */
  this._epigenomeFilter = '';

  /**
   * @type {Object.<number, {index: number, label: string}>}
   * @private
   */
  this._epigenomeSelection = {};

  /**
   * @type {number}
   * @private
   */
  this._pageSize = 5;

  /**
   * @type {number}
   * @private
   */
  this._pageIndex = 0;

  /**
   * @type {Array.<{index:number, label:string}>}
   * @private
   */
  this._epigenomes = this._allEpigenomes.slice(0, this._pageSize);

  /**
   * @type {Array.<{index: number, label:string}>}
   * @private
   */
  this._groups = ['IMR90', 'ESC', 'iPSC', 'ES-deriv', 'Blood & T-cell', 'HSC & B-cell', 'Mesench', 'Myosat', 'Epithelial', 'Neurosph', 'Thymus', 'Brain', 'Adipose', 'Muscle', 'Heart', 'Sm. Muscle', 'Digestive', 'Other', 'ENCODE2012']
    .map(function(label, i) { return {'label':label, 'index': i}});

  /**
   * @type {string}
   * @private
   */
  this._groupFilter = '';

  /**
   * @type {Object.<number, {index: number, label: string}>}
   * @private
   */
  this._groupSelection = {};
};

goog.inherits(epiviz.controllers.Master, ngu.Controller);

/**
 * @type {Array.<vs.ui.DataHandler>}
 * @name epiviz.controllers.Master#dataContexts
 */
epiviz.controllers.Master.prototype.dataContexts;

/**
 * @type {string}
 * @name epiviz.controllers.Master#epigenomeFilter
 */
epiviz.controllers.Master.prototype.epigenomeFilter;

/**
 * @type {Array.<{index:number, label:string}>}
 * @name epiviz.controllers.Master#epigenomes
 */
epiviz.controllers.Master.prototype.epigenomes;

/**
 * @type {Object.<number, {index:number, label:string}>}
 * @name epiviz.controllers.Master#epigenomeSelection
 */
epiviz.controllers.Master.prototype.epigenomeSelection;

Object.defineProperties(epiviz.controllers.Master.prototype, {
  'dataContexts': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function() { return this._dataContexts; })
  },

  'epigenomes': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function () {
      return this._epigenomes;
    }),
    set: /** @type {function (this:epiviz.controllers.Master)} */ (function (value) {
      this._epigenomes = value;
    })
  },

  'epigenomeFilter': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function () {
      return this._epigenomeFilter;
    }),
    set: /** @type {function (this:epiviz.controllers.Master)} */ (function (value) {
      this._epigenomeFilter = value;
    })
  },

  'epigenomeSelection': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function () {
      return this._epigenomeSelection;
    }),
    set: /** @type {function (this:epiviz.controllers.Master)} */ (function (value) {
      this._epigenomeSelection = value;
    })
  },

  'groups': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function () {
      return this._groups;
    }),
    set: /** @type {function (this:epiviz.controllers.Master)} */ (function (value) {
      this._groups = value;
    })
  },

  'groupFilter': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function () {
      return this._groupFilter;
    }),
    set: /** @type {function (this:epiviz.controllers.Master)} */ (function (value) {
      this._groupFilter = value;
    })
  },

  'groupSelection': {
    get: /** @type {function (this:epiviz.controllers.Master)} */ (function () {
      return this._groupSelection;
    }),
    set: /** @type {function (this:epiviz.controllers.Master)} */ (function (value) {
      this._groupSelection = value;
    })
  }

});

/**
 * @returns {boolean}
 */
epiviz.controllers.Master.prototype.loadMoreEpigenomes = function() {
  if (this._epigenomes.length >= this._allEpigenomes.length) {
    return false;
  }

  ++this._pageIndex;
  this._epigenomes = this._allEpigenomes.slice(0, this._pageIndex * this._pageSize);
  return true;
};

/**
 */
epiviz.controllers.Master.prototype.selectAllEpigenomes = function() {
  var self = this;
  this._allEpigenomes.forEach(function(item) { self._epigenomeSelection[item['index']] = item; });
};

/**
 * @returns {boolean}
 */
epiviz.controllers.Master.prototype.loadMoreGroups = function() {
  return false;
};

/**
 */
epiviz.controllers.Master.prototype.selectAllGroups = function() {
  var self = this;
  this._groups.forEach(function(item) { self._groupSelection[item['index']] = item; });
};



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


goog.provide('epiviz.Configuration');

goog.require('ngu.Configuration');

/**
 * @constructor
 * @extends {ngu.Configuration}
 */
epiviz.Configuration = function() {
  ngu.Configuration.apply(this, arguments);
};

goog.inherits(epiviz.Configuration, ngu.Configuration);

Object.defineProperties(epiviz.Configuration.prototype, {});


goog.provide('epiviz.controllers.AddVisualization');

goog.require('ngb.s.ModalController');

/**
 * @param {angular.Scope} $scope
 * @param {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}} $uibModalInstance
 * @param {angular.$q.Deferred} $ngbAnimation
 * @param {string} bodyTemplateUrl
 * @param {{headerTemplateUrl: string, footerTemplateUrl: string, title: string, loaderClass: string, sendMessage: (Function|undefined), fixed: boolean}} options
 * @param {vs.ui.DataHandler} dataHandler
 * @param {vs.Configuration} config
 * @constructor
 * @extends {ngb.s.ModalController}
 */
epiviz.controllers.AddVisualization = function ($scope, $uibModalInstance, $ngbAnimation, bodyTemplateUrl, options, dataHandler, config) {
  ngb.s.ModalController.apply(this, arguments);

  /**
   * @type {vs.ui.DataHandler}
   * @private
   */
  this._dataHandler = dataHandler;

  /**
   * @type {vs.Configuration}
   * @private
   */
  this._config = config;

  /**
   * @type {string|null}
   * @private
   */
  this._selectedVis = null;

  /**
   * @type {null}
   * @private
   */
  this._selectedRenderEngine = null;

  /**
   * @type {Object.<string, *>}
   * @private
   */
  this._selectedVisOptions = null;

  /**
   * @type {Object.<string, vs.ui.Setting>}
   * @private
   */
  this._selectedVisSettings = null;

  /**
   * @type {Object.<string, vs.ui.Setting>}
   * @private
   */
  this._editableSettings = null;

  /**
   * @type {Object.<string, angular.NgModelController>}
   * @private
   */
  this._form = {};

  this._editTop = false;
  this._editLeft = false;
  this._editTopMargin = false;
  this._editLeftMargin = false;
  this._editBottomMargin = false;
  this._editRightMargin = false;
  this._editWidth = false;
  this._editHeight = false;
};

goog.inherits(epiviz.controllers.AddVisualization, ngb.s.ModalController);

Object.defineProperties(epiviz.controllers.AddVisualization.prototype, {
  'data': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._dataHandler.data;
    })
  },

  'visualizations': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return Object.keys(this._config['options']['visualizations']);
    })
  },
  'selectedVis': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._selectedVis || this['visualizations'][0];
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this._selectedVis = value;

      this._selectedVisOptions = null;
    })
  },

  'renderEngines': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return Object.keys(this._config['options']['visualizations'][this['selectedVis']]).filter(function(r) { return r != 'default'; });
    })
  },

  'selectedRenderEngine': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      var engines = this._config['options']['visualizations'][this['selectedVis']];

      if (!this._selectedRenderEngine || !(this._selectedRenderEngine in engines)) {
        if ('default' in engines) {
          this._selectedRenderEngine = engines['default'];
        } else {
          this._selectedRenderEngine = engines[Object.keys(engines)[0]];
        }
      }

      return this._selectedRenderEngine;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this._selectedRenderEngine = value;

      this._selectedVisOptions = null;
    })
  },

  'selectedVisSettings': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      this.calcSelectedVisSettings();

      return this._selectedVisSettings;
    })
  },

  'editableSettings': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      this.calcSelectedVisSettings();

      return this._editableSettings;
    })
  },

  'selectedVisOptions': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      this.calcSelectedVisSettings();

      return this._selectedVisOptions;
    })
  },

  'form': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._form;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this._form = value;
    })
  },

  'footerButtons': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      var self = this;
      var $modalInstance = this['$modalInstance'];
      return [
        {
          'label': 'Ok',
          'click': function() { self.ok(); },
          'disabled': function() { return false; },
          'class': 'btn-primary'
        },
        {
          'label': 'Cancel',
          'click': function() { $modalInstance['dismiss']('cancel'); },
          'class': 'btn-default',
          'disabled': function() { return false; }
        }
      ];
    })
  },

  'editTop': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editTop;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editTop = value;
    })
  },
  'editLeft': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editLeft;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editLeft = value;
    })
  },
  'editTopMargin': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editTopMargin;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editTopMargin = value;
    })
  },
  'editLeftMargin': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editLeftMargin;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editLeftMargin = value;
    })
  },
  'editRightMargin': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editRightMargin;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editRightMargin = value;
    })
  },
  'editBottomMargin': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editBottomMargin;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editBottomMargin = value;
    })
  },
  'editWidth': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editWidth;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editWidth = value;
    })
  },
  'editHeight': {
    get: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function () {
      return this._editHeight;
    }),
    set: /** @type {function (this:epiviz.controllers.AddVisualization)} */ (function (value) {
      this.resetEdits();
      this._editHeight = value;
    })
  }
});

epiviz.controllers.AddVisualization.prototype.calcSelectedVisSettings = function() {
  if (!this._selectedVisOptions) {
    var visClassStr = this._config['options']['visualizations'][this['selectedVis']][this['selectedRenderEngine']];
    var visClass = u.reflection.evaluateFullyQualifiedTypeName(visClassStr);
    var settings = visClass ? visClass['Settings'] : {};
    var opts = {};

    var dataHandler = this._dataHandler;
    u.each(settings, function(k, setting) {
      if (setting['hidden']) { return; }
      if (setting['type'] == vs.ui.Setting.Type['ARRAY'] && setting['template'] == '_multiselect-tbl.html') {
        var _opt = setting.getValue(opts, null, dataHandler.data, settings);
        Object.defineProperty(opts, '__' + k, {
          get: function() { return _opt; },
          set: function(value) {
            _opt = value;

            if (!value || !(Array.isArray(value))) { return; }

            opts[k] = u.fast.map(value, function(o) { return ('text' in o) ? o['text'] : o; });
          },
          enumerable: true,
          configurable: true
        });
      }
      opts[k] = setting.getValue(opts, null, dataHandler.data, settings);
    });

    opts['y'] = Math.max(opts['y'], 50); // navbar overlaps

    var editableSettings = {};
    u.each(settings, function(key, setting) {
      if (['x', 'y', 'width', 'height', 'margins'].indexOf(key) < 0 && !setting['hidden']) {
        editableSettings[key] = setting;
      }
    });

    this._selectedVisOptions = opts;
    this._selectedVisSettings = settings;
    this._editableSettings = editableSettings;

    var $scope = this['$scope'];
    u.each(settings, function(key, setting) {
      if (setting['hidden']) { return; }
      var deps = setting['dependencies'];
      if (!deps) { return; }
      u.each(deps, function(k, dep) {
        if (settings[dep]['type'] == vs.ui.Setting.Type['ARRAY'] && settings[dep]['template'] == '_multiselect-tbl.html') {
          $scope.$watchCollection(function() { return opts['__' + dep]; }, function(newVal, oldVal) {
            opts[dep] = u.fast.map(newVal, function(o) { return (typeof o == 'object' && 'text' in o) ? o['text'] : o; });
            delete opts[key];
            opts[key] = setting.getValue(opts, null, dataHandler.data, settings);
          });
        } else {
          $scope.$watch(function() { return opts[dep]; }, function(newVal, oldVal) {
            delete opts[key];
            opts[key] = setting.getValue(opts, null, dataHandler.data, settings);
          });
        }
      });
    });
  }
};

epiviz.controllers.AddVisualization.prototype.resetEdits = function() {
  this._editTop = this._editLeft = this._editTopMargin = this._editLeftMargin = this._editRightMargin = this._editBottomMargin = this._editWidth = this._editHeight = false;
};

/**
 * @param {vs.ui.Setting} setting
 * @returns {string}
 */
epiviz.controllers.AddVisualization.prototype.getTemplate = function(setting) {
  var supportedTemplates = ['_categorical.html', '_string.html', '_multiselect-tbl.html', '_boundaries.html', '_number.html', '_slider.html', '_color.html', '_function.html'];
  if (supportedTemplates.indexOf(setting.template) < 0) {
    switch (setting.type) {
      case vs.ui.Setting.Type.CATEGORICAL:
        return '_categorical.html';
      default:
        return '_string.html';
    }
  } else {
    return setting.template;
  }
};

/**
 * @param {vs.ui.Setting} setting
 * @returns {Array.<string>}
 */
epiviz.controllers.AddVisualization.prototype.arrayPossibleValues = function(setting) {
  return setting.possibleValues(this['selectedVisOptions'], null, this['data'], this['selectedVisSettings']);
};

epiviz.controllers.AddVisualization.prototype.ok = function() {
  var $modalInstance = this['$modalInstance'];

  /*var self = this;
  u.each(this['editableSettings'], function(key, setting) {
    if (setting['type'] == vs.ui.Setting.Type['ARRAY'] && setting['template'] == '_multiselect-tbl.html') {
      self['selectedVisOptions'][key] = u.fast.map(self['selectedVisOptions'][key], function(o) { return o['text']; });
    }
  });*/

  $modalInstance['close']({
    'visualization': this['selectedVis'],
    'engine': this['selectedRenderEngine'],
    'options': this['selectedVisOptions']
  });
};


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
    'size': 'md',
    'animation': true,

    'bodyTemplateUrl': 'res/templates/_add-vis.html',
    //'headerTemplateUrl': 'res/html/_user-profile-header.html',
    //'footerTemplateUrl': 'res/html/_login-footer.html',
    'title': 'Add visualization',
    'loaderClass': 'tf-loader',// tf-loader is not defined, which means we don't use a loader
    'fixed': true,
    'useFooterInputText': false,
    'controller': 'epiviz.controllers.AddVisualization',
    'controllerAs': 'addVis',
    'backdrop': 'static',
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
            {
              'cls': 'vs-axis',
              'options': {
                'type': 'x',
                'ticks': 10
              }
            },
            {
              'cls': 'vs-axis',
              'options': {
                'type': 'y'
              }
            }
            /*,
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


goog.provide('epiviz');

goog.require('ngu');
goog.require('ngb');

goog.require('epiviz.Configuration');
goog.require('epiviz.controllers.Master');
goog.require('epiviz.controllers.DataContext');
goog.require('ngb.d.InfiniteNumberSlider');

u.log.VERBOSE = 'info';

epiviz.main = angular.module('epiviz', ['vs', 'ngb', 'ngTagsInput', 'ui.bootstrap-slider', 'colorpicker.module']);

epiviz.main.provider('epivizConfig', function() {
  return new epiviz.Configuration();
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
      },
      'heatmap': {
        'svg': 'vs.ui.plugins.svg.Heatmap',
        'default': 'svg'
      }
    },
    'parallel': {
      'nthreads': 16,
      'worker': '/worker.js'
    }
  })
}]);

epiviz.main.config(['linkProvider', /** @param {vs.linking.LinkProvider} linkProvider */ function(linkProvider) {
  var snpLink = function(d1, objects1, d2) {
    // Can be done faster
    return u.fast.concat(u.fast.map(objects1, function(o) {
      return u.fast.filter(d2.d, function (item) {
        return item.chr == o.chr && item.start < o.end && item.end > o.start;
      });
    }));
  };

  for (var i = 0; i < 6 - 1; ++i) {
    for (var j = i+1; j < 6; ++j) {
      linkProvider.register('sample' + i, 'sample' + j, snpLink);
      linkProvider.register('sample' + j, 'sample' + i, snpLink);
    }
  }

  /*linkProvider.register('sample1', 'sample2', snpLink);
  linkProvider.register('sample2', 'sample1', snpLink);*/
}]);

epiviz.main.controller('epiviz.controllers.Master', ['$scope', function($scope) {
  return u.reflection.applyConstructor(/** @type {function (new:epiviz.controllers.Master)} */ (epiviz.controllers.Master), arguments);
}]);

epiviz.main.controller('epiviz.controllers.DataContext', ['$scope', '$ngbModal', function($scope) {
  return u.reflection.applyConstructor(/** @type {function (new:epiviz.controllers.DataContext)} */ (epiviz.controllers.DataContext), arguments);
}]);

epiviz.main.controller('epiviz.controllers.AddVisualization', ['$scope', '$uibModalInstance', '$ngbAnimation', 'bodyTemplateUrl', 'options', 'dataHandler', 'configuration', function() {
  return u.reflection.applyConstructor(/** @type {function(new: epiviz.controllers.AddVisualization)} */ (epiviz.controllers.AddVisualization), arguments);
}]);

epiviz.main.directive('ngbInfiniteNumberSlider', [function() {
  return ngu.Directive.createNew('ngbInfiniteNumberSlider', /** @type {function(new: ngu.Directive)} */ (ngb.d.InfiniteNumberSlider), arguments, {restrict: 'A'});
}]);

