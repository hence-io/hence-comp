/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module polymer-integrity
 */


import _keys from 'lodash/object/keys';
import _has from 'lodash/object/has';
import _intersection from 'lodash/array/intersection';
import _union from 'lodash/array/union';
import _without from 'lodash/array/without';


// A list of all polymer method/key names
let PolymerKeys = _keys(Polymer.Base);
// A list excluding those method/key names which are allowed
let PolymerMethods = _without(PolymerKeys,
  'created', 'ready', 'attached', 'detached', 'properties', 'behaviors', 'listeners', 'observers', 'is',
  'attributeChanged', 'factoryImpl', 'hostAttributes'
);

// A list of all reserved polymer properties names; include the method/key names as it will only cause issues if used
let PolymerProperties = _union(PolymerKeys, [
  'root', 'isAttached', '_aboveConfig', '_config', 'id', '_nativePrototypes', '_factoryArgs', '_aggregatedAttributes',
  '_serializing', '_debouncers', '_template', 'dataHost', '_clients', '_clientsReadied', '_readied', '_attachedPending',
  'event', 'node', '_classList', 'domApi', '_userContent', 'shadyRoot', 'textContent', '_composedChildren', '_notes',
  '$', '$$', 'gestures', 'info', '_twiddle', '_callbacks', 'context', 'boundComplete', 'finish', 'callback', '__data__',
  '_handlers', '_boundPaths', 'ruleTypes', '_encapsulateStyle', '_styles', '_scopeStyle', 'cache', '_properties',
  '_ownStylePropertyNames', 'customStyle', '_styleProperties', '_ownStyleProperties', '_scopeSelector',
  '_appliesToDocument', '_templatizerId', 'ctor', '_templatizerStatic', '_parentProps', '_rootDataHost', '_children',
  'userArray', 'store', 'omap', 'pmap', '_instances', '_instanceProps', '_sortFn', '_needFullRefresh', '_observePaths',
  'collection', '_splices', '_keyToInstIdx', 'selected', 'toggle', '_lastIf', '_instance', '_ready', '_setupConfigure'
]);

/**
 * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
 * @param comp The component/behaviour being inspected
 * @param behaviour An optional name for behaviours being inspected
 */
let polymerIntegrity = (comp, behaviour = '')=> {
  let hasIntegrity = true;

  // Determine any conflicting property names
  let propertyKeys = _keys(comp.properties || {});
  let conflictingProps = _intersection(propertyKeys, PolymerProperties);

  // Determine any conflicting method/key names
  let compKeys = _keys(comp);
  let conflictingMethods = _intersection(compKeys, PolymerMethods);

  if (conflictingProps.length) {
    hasIntegrity = false;
    console.error(`Attempted use of reversed Polymer property names found. Please revise the follow property names in your component to something else.
      Component in conflict: ${comp.is || behaviour}
      Properties in conflict: ${conflictingProps.join(', ')}`);
  }

  if (conflictingMethods.length) {
    hasIntegrity = false;
    console.error(`Attempted use of reversed Polymer method names found. Please revise the follow method names in your component to something else.
    Component in conflict: ${comp.is || behaviour}
    Methods in Conflict: ${conflictingMethods.join(', ')}`);
  }

  return hasIntegrity;
};

export default polymerIntegrity;
