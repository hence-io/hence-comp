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
 * @module hence-core
 */

import polymerIntegrity from './core/integrity';
import HencePolymer from './core/polymer';
import HenceDebug from './core/debug';

import _each from 'lodash/collection/each';
import _defaults from 'lodash/object/defaults';
import _isFunction from 'lodash/lang/isFunction';

let HenceDefaults = (props)=> {
  _each(props, (prop, key) => {
    // If this is a basic type set on the prop 'type: String, type: Object', we want to convert it an actual object
    if (_isFunction(prop)) {
      prop = {
        type: prop
      };
    }

    // Now lets apply the default values when it's not provided on the component itself for compatibility, only if a
    // default value was not already defined.
    switch (prop.type) {
      case Boolean:
        props[key] = _defaults(prop, {
          value: false
        });
        break;
      case Array:
      case Object:
        props[key] = _defaults(prop, {
          value: null
        });
        break;
      default:
        props[key] = _defaults(prop, {
          value: ''
        });
    }
  });
};

export default HenceDefaults;
