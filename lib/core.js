/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

### HenceComp

HenceComp is the base object in which all Hence Components are derived from to help address some common
 functionality that is not present in Polymer, such as simplifying component instantiation through DOM or
 dynamic creation, and methods to snap components to new DOM elements with ease.

A critical addition to this is a integrity checker to ensure properties and methods you add to your object do not
conflict with Polymer, prevent disastrous errors which go unchecked by Polymer, so you can address them promptly
during development.

*/
/**
 * @module hence-comp
 */
/**
 * @external Polymer
 */

import {polymerIntegrity} from './polymerIntegrity';
import {HenceBehaviour} from './behaviour';

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _keys from 'lodash/object/keys';
import _has from 'lodash/object/has';
import _clone from 'lodash/lang/cloneDeep';
import _isArray from 'lodash/lang/isArray';

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

  _extend(comp, {
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
      let self = this;
      self._set_propConfig(config);

      // Must use local _props private var, as self.propList will no yet be initialized... self.propList is usable
      // in the ready/attached methods without issue however.
      _props.forEach((propertyName)=> {
        if (config[propertyName]) {
          self.set(propertyName, config[propertyName]);
        }
      });
    },

    /*******************************************************************************************************************
     * Polymer Helpers
     ******************************************************************************************************************/

    /**
     * This initialize the Polymer Class, and ensure it is only performed once, staticly storing the Polymer object to be
     * served when creating new elements, or support components already on the DOM.
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
     * ### Registering Components
     * #### ```Comp.registerElement()``` [Source](https://github.com/hence-io/hence-component-framework/blob/master/lib/core.js)
     *
     * If you have your component, ```<my-element sample='great'></my-element>``` on the DOM and do not register your component in
     * Polymer, it effectively will do nothing until you do trigger ```registerElement```.
     *
     * To register the element, simply:
     *
     * ```javascript
     * import MyElement from './my-element.js';
     *
     * MyElement.registerElement(); // returns a Polymer object, and ensures to register it as a custom element.
     * ```
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
     * ### Creating Components Dynamically
     * #### ```Comp.appendChild(props)``` [Source](https://github.com/hence-io/hence-component-framework/blob/master/lib/core.js)
     *
     * You can easily create elements to add to the DOM. The ```createElement``` falls back on running the
     * ```registerElement```, to ensure that the component you're trying to create was registered.
     *
     * ```javascript
     * import MyElement from './my-element.js';
     *
     * let el = MyElement.createElement(props); // lets build an element
     *
     * document.body.appendChild(el); // add our el to the end of the body now
     * ```
     *
     * This create a new element, leveraging Polymers constructor method, allowing us to pass in parameters and execute the
     * factoryImpl(...) function, which HenceComp uses to assign matching properties to your new element.
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
     * #### Appending Components Easily
     * #### ```Comp.appendElementTo(props, target)``` [Source](https://github.com/hence-io/hence-component-framework/blob/master/lib/core.js)
     * A simple helper function to append elements is ```appendElementTo```. Passing no target defaults to ```document.body```.
     *
     * ```javascript
     * import MyElement from './my-element.js';
     *
     * MyElement.appendElementTo(props, document.querySelector('#myElement')); // lets build an element, and append it to our target
     * ```
     *
     * @param {Object} opts Options for which to configure this new dynamically generated component
     * @param {Object} target The desired DOM element to append the new component too.
     * @returns {Polymer} The resulting created DOM element,
     */
      appendElementTo(opts = {}, target = document.body) {
      let el = this.createElement(opts);

      try {
        //console.log('adding el to', el, target, document, document.body);

        target.appendChild(el);
      } catch (e) {
        console.warn('HenceComp::appendElementTo - Failure to append element', el, e);
      }

      return el;
    }
  });

  /*******************************************************************************************************************
   * Element Behaviour
   ******************************************************************************************************************/

    // Ensure to add the default HenceBehaviour to this component. We don't want to be overriding the behaviour list,
    // just adding to it so any additional behaviours are kept.
  comp.behaviors.push(HenceBehaviour);

  /********************************************************************************************************************
   * Debugging
   ********************************************************************************************************************/
  _defaults(comp, {

    /**
     * A simple way to debug the component by pooling it's current property values and displaying them as a JSON
     * stringify'd
     *
     * @param {Boolean} stringify Whether or not to return a string or the object
     * @returns {String|Object} JSON string output of the component
     */
      debugThis(stringify = false) {
      let self = this;
      let data = {};

      _props.forEach((propertyName)=> {
        data[propertyName] = self.get(propertyName);
      });

      return stringify ? JSON.stringify(data) : data;
    }
  });

  /*******************************************************************************************************************
   * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
   ******************************************************************************************************************/
  polymerIntegrity(comp);

  return comp;
};

export {HenceComp};
