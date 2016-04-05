/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 4/1/2016
 * Time: 3:27 PM
 */

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
          'click': function() { $modalInstance['close']({ 'visualization': self['selectedVis'], 'engine': self['selectedRenderEngine'], 'options': self['selectedVisOptions']}); },
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
      opts[k] = setting.getValue(opts, null, dataHandler.data, settings);
    });

    var editableSettings = {};
    u.each(settings, function(key, setting) {
      if (['x', 'y', 'width', 'height', 'margins'].indexOf(key) < 0) {
        editableSettings[key] = setting;
      }
    });

    this._selectedVisOptions = opts;
    this._selectedVisSettings = settings;
    this._editableSettings = editableSettings;
  }
};

epiviz.controllers.AddVisualization.prototype.resetEdits = function() {
  this._editTop = this._editLeft = this._editTopMargin = this._editLeftMargin = this._editRightMargin = this._editBottomMargin = this._editWidth = this._editHeight = false;
};
