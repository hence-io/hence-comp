'use strict';
/**
 * @module hence-schema
 */

import {polymerIntegrity} from './polymerIntegrity';
import {HenceComp} from './HenceComp';

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';

import _each from 'lodash/collection/each';

import _clone from 'lodash/lang/cloneDeep';

/**
 * @constructor
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
