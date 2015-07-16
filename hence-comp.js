'use strict';
/**
 * @module hence-comp
 */
/**
 * @external Polymer
 */

import console from 'console';
import _extend from 'lodash/object/extend';
import _isEqual from 'lodash/lang/isEqual';

/**
 * @constructor
 * @param {Object|*} comp The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */
let HenceComp = function (comp, debug) {
  var _polymer = null;

  return _extend(comp || {}, {
    /**
     * Register's this element with Polymer, or return the created Polymer object; ensure that it is only ever
     * registered once.
     *
     * @returns {Polymer} The resulting bound Polymer instance, registered and ready to be leveraged.
     */
      registerElement() {
      let result = _polymer;

      if (!result) {
        _polymer = result = Polymer.Class(this);
        document.registerElement(this.is, _polymer);
        if (debug) {
          console.log('HenceComp.registerElement on:', this, result, _polymer, _isEqual(result,_polymer));
        }
      }

      return result;
    },

    /**
     * Create a new element, leveraging the constructor method, allowing us to pass in parameters and execute the
     * factoryImpl(...) function via Polymer. Running new using the registerElement ensures it is found to Polymer once.
     *
     * @param {Object} opts Options for which to configure this new dynamically generated component
     * @returns {Polymer} The resulting created DOM element,
     */
      createElement(opts = {}) {
      let el = new this.registerElement()(opts); // Generates a new polymer component of this type
      return el;
    },

    /**
     * Appends a new component to a given target element
     *
     * @param {Object} opts Options for which to configure this new dynamically generated component
     * @param {Object} target The desired DOM element to append the new component too.
     * @returns {Polymer} The resulting created DOM element,
     */
      appendElementTo(opts, target = document.body) {
      let el = this.createElement(opts);
      target.appendChild(el);
      return el;
    }
  });
};

export default HenceComp;
