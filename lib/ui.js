/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

## Component Type Methodology

### UI

UI components are the most diverse Hence Component type, and are derived from the base HenceComp object.

Polymers native functionally beyond this largely provides everything we need to make powerful and effective UI
components.

These components are designed to be data agnostic. Every possible piece of text, image, icons, links or more complex
elements are configurable and can be rendered by other components. Events dealing with data are hooks fired when
triggered back to the component which implemented it, while some internal events may exist in isolation to support
interaction or non-data based behaviour.

*/
/**
 * @module hence-ui
 */

import HenceComp from './core';

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _each from 'lodash/collection/each';
import _clone from 'lodash/lang/cloneDeep';

/**
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component, based on HenceComp, with some added Model specific functionality.
 */
let HenceUi = (original)=> {
  let comp = _clone(original);

  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  _extend(comp.properties, {
  });

  _extend(comp, {
  });

  _defaults(comp, {
  });

  return HenceComp(comp);
};

export {HenceUi};
