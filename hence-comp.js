'use strict';
/**
 * @module hence-comp
 */
/**
 * @external Polymer http://polymer.github.io/polymer/
 */

import console from 'consoler';
import _once from 'lodash/function/once
import _extend from 'lodash/object/extend';

/**
 * @constructor
 * @param {Object|*} comp The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */
let HenceComp = function (comp) {
  var _polymerClass = null;
  var _polymerRegistered = false;

  return _extend(comp || {}, {
    /**
     * Initialize the Polymer Class, and ensure it is only performed once, to be used in registering the element, as
     * well as for creating new instances of it.
     *
     * @returns {Polymer} The resulting Polymer instance, able to be leveraged once registered.
     */
    polymerClass: _once(()=> {
      return _polymerClass = Polymer.Class(this);
    }),

    /**
     * Register's this element with Polymer, or return the created Polymer object; ensure that it is only ever
     * registered once.
     *
     * @returns {Boolean} Whether or not the element is registered.
     */
    registerElement: _once(()=> {
      document.registerElement(this.is, this.polymerClass());
      return _polymerRegistered = true;
    }),

    /**
     * Create a new element, leveraging the constructor method, allowing us to pass in parameters and execute the
     * factoryImpl(...) function via Polymer. Running new using the registerElement ensures it is found to Polymer once.
     *
     * @param {Object} opts Options for which to configure this new dynamically generated component
     * @returns {Polymer} The resulting created DOM element,
     */
    createElement(opts = {}) {
      this.registerElement(); // ensure that the element is in fact registered
      let el = new _polymerClass(opts); // Generates a new polymer component of this type
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
