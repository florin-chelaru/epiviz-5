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
