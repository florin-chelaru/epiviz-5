/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/9/2015
 * Time: 4:10 PM
 */

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
