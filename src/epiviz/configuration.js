/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 10/2/2015
 * Time: 1:02 PM
 */

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
