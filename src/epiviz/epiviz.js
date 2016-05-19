/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 3:50 PM
 */

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
    },
    'decorators': {
      'cls': [
      ],
      'elem': [
        {
          'cls': 'vs-axis',
          'render': {
            'svg': 'vs.ui.svg.SvgAxis',
            'canvas': 'vs.ui.canvas.CanvasAxis'
          }
        },
        {
          'cls': 'vs-grid',
          'render': {
            'svg': 'vs.ui.svg.SvgGrid',
            'canvas': 'vs.ui.canvas.CanvasGrid'
          }
        }
      ]

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

