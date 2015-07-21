'use strict';
/**
 * @module hence-comp
 */
/**
 * @external Polymer http://polymer.github.io/polymer/
 */

import console from 'consoler';
import _clone from 'lodash/lang/cloneDeep';
import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _keys from 'lodash/object/keys';

/**
 * @constructor
 * @param {Object|*} original The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */
let HenceComp = function (original) {
  let comp = _clone(original);
  let _polymerClass = null;
  let _polymerRegistered = null;
  let _props = _keys(comp.properties);

  /**
   * To simplify allowing to pass a single object through the DOM that overrides any/all of this components
   * properties, we'll allow a default 'props' property on the element to be access this way.
   */
  _extend(comp.properties, {
    props: {
      type: Object
    }
  });

  /**
   * The factoryImpl method is only invoked when you create an element using the constructor, this.createElement or
   * it's binding functions. Instances hardcoded into html already will NOT execute this constructor. You've been
   * warned.
   *
   * @param {Object} opts A set of options for configuring this component
   */
  _defaults(comp, {
  factoryImpl(opts = {}) {
      let self = this;

      _props.forEach(function (propertyName) {
        if (opts[propertyName]) {
          self.set(propertyName, opts[propertyName]);
        }
      });
    }
  });

  /**
   * Now lets bind the essential Polymer helpers
   */
  _extend(comp, {
    /**
     * If this element was created on the DOM, and was passed in a props property, use that object to populate this
     * components properties now, in one fell swoop.
     */
    configureProperties() {
      let self = this;
      let propOverrides = self.props;

      if (propOverrides) {
        _props.forEach(function (propertyName) {
          if (propOverrides[propertyName]) {
            self.set(propertyName, propOverrides[propertyName]);
          }
        });
      }
    },

    /**
     * Initialize the Polymer Class, and ensure it is only performed once, to be used in registering the element, as
     * well as for creating new instances of it.
     *
     * @returns {Polymer} The resulting Polymer instance, able to be leveraged once registered.
     */
    polymerClass() {
      if (!_polymerClass && Polymer) {
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
      if (!_polymerRegistered && document && this.polymerClass()) {
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
      let el;

      if (this.registerElement()) { // ensure that the element is in fact registered
        el = new _polymerClass(opts); // Generates a new polymer component of this type
      }

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

      if (target) {
        target.appendChild(el);
      }

      return el;
    }
  });

  return comp;
};

export default HenceComp;
