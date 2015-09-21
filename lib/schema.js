/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

## Component Type Methodology

### Schema

Schema components define and help data adhere to a strict format, field type, and validation methods for data
integrity and transport. All API interaction occurs through these components, and it helps to facilitate serving data
 to the Model components. These components have 0 consideration for UI and are utilized exclusively for their data
 management.

Because of the interoperable nature of these components, they are still able to effectively be leveraged on the
server API side of your project, if Node/iojs based, allowing the data validation methods to support front and
backend, reducing the need for divergent schemas over different parts of the project.

*/
/**
 * @module hence-schema
 */

import HenceComp from './core';



import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _each from 'lodash/collection/each';
import _clone from 'lodash/lang/cloneDeep';
import _isArray from 'lodash/lang/isArray';

/**
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component, based on HenceComp, with some added Model specific functionality.
 */
let HenceSchema = (original)=> {
  let comp = _clone(original);

  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  _extend(comp.properties, {
    executeOnLoad: {
      type: Boolean,
      value: true
    },
    action: String,
    query: {
      type: Object,
      value: ()=> { return {}; }
    },
    results: {
      type: Array,
      readOnly: true,
      notify: true
    }
  });

  /*******************************************************************************************************************
   * Element DOM Hooks
   ******************************************************************************************************************/
  _extend(comp, {
    /**
     * When the component has loaded and is ready, auto trigger the executeQuery method, if desired.
     */
      ready() {
      let self = this;

      if (self.executeOnLoad) {
        self.executeQuery();
      }
    },

    /**
     * The public facing execute method allowing this function to be triggered manually as needed, or re-triggered at
     * will
     */
      executeQuery() {
      let self = this;

      self._executeQuery((err, results)=> {
        if (err) {
          return console.error('HenceSchema::_executeQuery', err);
        }

        if (!_isArray(results)) {
          results = [results];
        }

        self._setResults(results);
      });
    }
  });

  /*******************************************************************************************************************
   * Element Behaviour
   ******************************************************************************************************************/
  _defaults(comp, {
    _executeQuery(done) {
      done('Default method running! Please override it.'); // return an error, since this should of been overridden
    }
  });

  return HenceComp(comp);
};

export {HenceSchema};
