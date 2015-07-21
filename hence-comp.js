'use strict';
/**
 * @module hence-comp
 */
/**
 * @external Polymer http://polymer.github.io/polymer/
 */

import console from 'consoler';
import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _keys from 'lodash/object/keys';

// A fall back dependency for unit testing
//import Polymer from 'polymer-js';
//import wcl from 'webcomponents-lite';

let Polymer = window.Polymer || {Class:()=>{}};

/**
 * @constructor
 * @param {Object|*} comp The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */
let HenceComp = function (comp) {
  var _polymerClass = null;
  var _polymerRegistered = null;
  var _props = _keys(comp.properties);

  _defaults(comp,{
    /**
     * The factoryImpl method is only invoked when you create an element using the constructor, this.createElement or
     * it's binding functions. Instances hardcoded into html already will NOT execute this constructor. You've been
     * warned.
     *
     * @param {Object} opts A set of options for configuring this component
     */
      factoryImpl(opts = {}) {
      let self = this;
      _props.forEach(function(name){
        if(opts[name]) {
          self.set(name, opts[name]);
        }
      });
    }
  });

  return _extend(comp || {}, {
    /**
     * Initialize the Polymer Class, and ensure it is only performed once, to be used in registering the element, as
     * well as for creating new instances of it.
     *
     * @returns {Polymer} The resulting Polymer instance, able to be leveraged once registered.
     */
      polymerClass() {
      if (!_polymerClass) {
        _polymerClass = Polymer.Class(this);
      }
      return _polymerClass;
    },

    /**
     * Register's this element with Polymer, or return the created Polymer object; ensure that it is only ever
     * registered once.
     *
     * @returns {Boolean} Whether or not the element is registered.
     */
      registerElement() {
      if (!_polymerRegistered) {
        document.registerElement(this.is, this.polymerClass());
        _polymerRegistered = true;
      }

      return _polymerRegistered;
    },

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
