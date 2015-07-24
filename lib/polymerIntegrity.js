
import console from 'consoler';

import _keys from 'lodash/object/keys';
import _has from 'lodash/object/has';
import _union from 'lodash/array/union';

let PolymerMethods = _keys(Polymer.Base).sort();
let PolymerProperties = ['_aboveConfig','_config'];

/**
 * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
 * @param comp
 */
let polymerIntegrity = (comp)=> {
  if (_has(comp, PolymerProperties)) {
    console.error('Reversed property name found. Please review your use of properties and ensure you are not' +
      ' overriding any of Polymers defaults.', PolymerMethods);
  }
  if (_has(comp, PolymerMethods)) {
    console.error('Reversed method name found. Please review your use of methods and ensure you are not' +
      ' overriding any of Polymers defaults.', PolymerMethods);
  }

  //console.log('checking PolymerMethods',PolymerMethods);
};

export {polymerIntegrity};
