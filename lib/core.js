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

import polymerIntegrity from './core/integrity';
import HencePolymer from './core/polymer';
import HenceDebug from './core/debug';

import {BehaviourInitialization} from './behaviours/initialization';

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _clone from 'lodash/lang/cloneDeep';

/**
 * @constructor
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */
let HenceComp = (original)=> {
  let comp = _clone(original);

  // Ensure the basics are added to the component if not already present to ensure compatibility
  _defaults(comp, {
    hooks: {},
    properties: {},
    listeners: {},
    behaviors: []
  });

  /*******************************************************************************************************************
   * Polymer Helpers
   ******************************************************************************************************************/
  _extend(comp, HencePolymer());

  /*******************************************************************************************************************
   * Element Behaviour
   ******************************************************************************************************************/
    // Ensure to add the default HenceBehaviour to this component. We don't want to be overriding the behaviour list,
    // just adding to it so any additional behaviours are kept.
  comp.behaviors.push(BehaviourInitialization(comp));

  /********************************************************************************************************************
   * Debugging
   ********************************************************************************************************************/
  _defaults(comp, HenceDebug);

  /*******************************************************************************************************************
   * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
   ******************************************************************************************************************/
  polymerIntegrity(comp);

  return comp;
};

export default HenceComp;
