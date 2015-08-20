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

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _each from 'lodash/collection/each';
import _defaults from 'lodash/object/defaults';
import _keys from 'lodash/object/keys';
import _has from 'lodash/object/has';
import _clone from 'lodash/lang/cloneDeep';
import _isArray from 'lodash/lang/isArray';

/**
 * @constructor
 * @param {Object} _props The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */

let HenceInit = (_props)=> {
  return {
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
      _each(_props, (propertyName)=> {
        if (config[propertyName]) {
          self.set(propertyName, config[propertyName]);
        }
      });
    }
  };
};

export default HenceInit;
