/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module hence-defaults
 */

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
