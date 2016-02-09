/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 4:06 PM
 */

goog.provide('epiviz.controllers.Master');

/**
 * @param {angular.Scope} $scope
 * @constructor
 * @extends {ngu.Controller}
 */
epiviz.controllers.Master = function($scope) {
  ngu.Controller.apply(this, arguments);

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
        {
          'construct': {
            'render': 'canvas',
            'type': 'scatterplot'
          },
          'options': {
            'doubleBuffer': true,
            'axisBoundaries': {},
            'x': 10,
            'y': 50,
            'width': 250,
            'height': 250,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': [1, 0],
            'vals': 'dna methylation',
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
              },
              {
                'cls': 'vs-brushing'
              }
            ]
          }
        },
        {
          'construct': {
            'render': 'svg',
            'type': 'scatterplot'
          },
          'options': {
            'doubleBuffer': false,
            'axisBoundaries': {},
            'x': 270,
            'y': 50,
            'width': 250,
            'height': 250,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': [0, 1],
            'vals': 'dna methylation',
            'fill': 'rgba(30,96,212,0.3)',
            'stroke': 'rgba(30,96,212,1)',
            'strokeThickness': 1
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
              },
              {
                'cls': 'vs-brushing'
              }
            ]
          }
        },
        {
          'construct': {
            'render': 'canvas',
            'type': 'manhattan'
          },
          'options': {
            'doubleBuffer': true,
            //'xBoundaries': {'min': 1000, 'max': 100000},
            'yBoundaries': {'min': 0, 'max': 10},
            'x': 530,
            'y': 50,
            'width': 400,
            'height': 115,
            'fill': 'rgba(255,96,50,0.3)',
            'stroke': 'rgba(255,96,50,1)',
            'strokeThickness': 1,
            'itemRatio': 0.03,
            'selectFill': 'rgba(30,96,212,1)',
            'selectStroke': '#ff0000',
            'selectStrokeThickness': 4,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': [0, 1],
            'vals': 'v0',
            'rows': ['start', 'end']
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
              },
              {
                'cls': 'vs-brushing'
              }
            ]
          }
        },
        {
          'construct': {
            'render': 'svg',
            'type': 'manhattan'
          },
          'options': {
            'yBoundaries': {'min': 0, 'max': 10},
            'x': 530,
            'y': 185,
            'width': 400,
            'height': 115,
            'itemRatio': 0.03,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': [0, 1],
            'vals': 'v0',
            'rows': ['start', 'end']
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
              },
              {
                'cls': 'vs-brushing'
              }
            ]
          }
        },
        {
          'construct': {
            'render': 'svg',
            'type': 'heatmap'
          },
          'options': {
            'xBoundaries': {'min': 1000, 'max': 100000},
            'yBoundaries': {'min': 0, 'max': 10},
            'x': 10,
            'y': 320,
            'width': 500,
            'height': 400,
            'margins': {
              'left': 10,
              'right': 10,
              'bottom': 10,
              'top': 10
            },
            'cols': [0, 1, 2, 3, 4, 5],
            'vals': 'v0',
            'rows': ['start', 'end'],
            'fill': 'rgb(30,96,212)'
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
                'cls': 'vs-brushing'
              }
            ]
          }
        }
      ],
      'data': new vs.models.plugins.BigwigDataSource(
        [
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K4me1.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K4me3.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K9ac.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K9me3.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K27me3.fc.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/foldChange/E001-H3K36me3.fc.signal.bigwig'],
          /*'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K4me1.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K4me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9ac.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K27me3.pval.signal.bigwig',
          'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K36me3.pval.signal.bigwig'],*/
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
      )
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
            'label': 'gwasPval',
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
    }, vs.ui.DataHandler)
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
