'use strict';
/**
 * @module hence-comp
 */
/**
 * @external Polymer
 */

import {polymerIntegrity} from './polymerIntegrity';
import {HenceBehaviour} from './HenceBehaviour';

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _keys from 'lodash/object/keys';
import _has from 'lodash/object/has';

import _clone from 'lodash/lang/cloneDeep';

/**
 * @constructor
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */
let HenceComp = (original)=> {
  let comp = _clone(original);
  let _polymerClass = null;
  let _polymerRegistered = null;
  let _props = _keys(comp.properties || {});

  // Ensure the basics are added to the component if not already present to ensure compatibility
  _defaults(comp, {
    properties: {},
    listeners: {},
    behaviors: []
  });

  /**
   * To simplify allowing to pass a single object through the DOM that overrides any/all of this components
   * properties, we'll allow a default 'props' property on the element to be access this way.
   */
  _extend(comp.properties, {
    _propList: {
      type: Array,
      readOnly: true,
      value: _props
    },
    _propConfig: {
      type: Object,
      readOnly: true
    }
  });

  _defaults(comp, {
    /********************************************************************************************************************
     * Initialization
     ********************************************************************************************************************/

    /**
     * The factoryImpl method is only invoked when you create an element using the constructor, this.createElement or
     * it's binding functions. Instances hardcoded into html already will NOT execute this constructor. You've been
     * warned.
     *
     * @param {Object} config A set of options for configuring this component
     */
      factoryImpl(config) {
      this._construct(config);
    },

    _construct(config = {}) {
      let self = this;
      self._set_propConfig(config);

      // Must use local _props private var, as self.propList will no yet be initialized... self.propList is usable
      // in the ready/attached methods without issue however.
      _props.forEach((propertyName)=> {
        if (config[propertyName]) {
          self.set(propertyName, config[propertyName]);
        }
      });

      //console.log(`props updated`, _props, self.properties);
    },

    debugThis() {
      let self = this;
      let data = {};

      _props.forEach((propertyName)=> {
        data[propertyName] = self.get(propertyName);
      });

      //console.log('debug', data, self.properties);

      return JSON.stringify(data);
    }
  });

  _extend(comp, {
    /*******************************************************************************************************************
     * Polymer Helpers
     ******************************************************************************************************************/

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

  /*******************************************************************************************************************
   * Element Behaviour
   ******************************************************************************************************************/

  // Ensure to add the default behavior
  if (!comp.behaviors) {
    comp.behaviors = [];
  }
  comp.behaviors.push(HenceBehaviour);

  /*******************************************************************************************************************
   * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
   ******************************************************************************************************************/
  polymerIntegrity(comp);

  return comp;
};

export default HenceComp;
