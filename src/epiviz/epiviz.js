/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 3:50 PM
 */

goog.provide('epiviz');

goog.require('epiviz.Configuration');
goog.require('epiviz.controllers.Master');
goog.require('epiviz.controllers.DataContext');

u.log.VERBOSE = 'info';

epiviz.main = angular.module('epiviz', ['vs', 'ngb']);

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

epiviz.main.controller('epiviz.controllers.Master', ['$scope', function($scope) {
  return u.reflection.applyConstructor(epiviz.controllers.Master, arguments);
}]);

epiviz.main.controller('epiviz.controllers.DataContext', ['$scope', function($scope) {
  return u.reflection.applyConstructor(epiviz.controllers.DataContext, arguments);
}]);
