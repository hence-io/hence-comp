'use strict';
/**
 * @module hence-model
 */

import {polymerIntegrity} from './polymerIntegrity';
import {HenceComp} from './core';

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
let HenceModel = (original)=> {
  let comp = _clone(original);

  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  _extend(comp.properties, {
    query: {
      type: Object,
      value: null
    },
    processedState: {
      type: Object,
      readOnly: true,
      value: null
    },
    state: {
      type: Array,
      value: null
    }
  });

  _extend(comp, {
    renderState() {
      return this._processState();
    },

    /**
     * This method does the essential processing of the state pulled in from a given schema component, and processes
     * it via the _transforState function to couple the raw data to a friendly option set for the desired UI component.
     */
    _processState() {
      let self = this;
      let results = [];
      let state = this.state;

      _each(state, (entry)=> {
        let transform = self._transformState(entry);

        if (transform) {
          results.push(transform);
        }
      });

      // If there is 1 or none in the array, convert it to an object/undefined instead.
      if (results.length <= 1) {
        results = results[0];
      }

      self._setProcessedState(results); // read only and must be set privately here
      //console.log('processedState',self.processedState);

      return self.processedState;
    }
  });

  _defaults(comp, {
    /**
     * This version is meant to be overridden by the component implementing this behaviour. Serves a console.warn
     * depicting such to notify developers of their misuse.
     *
     * @private
     */
    _transformState(entry) {
      console.warn('HenceModel::transformEntry - Default method running! It\'s unlikely your data is rendering' +
        ' correctly, please consider overriding it...');
      return entry;
    }
  });

  return HenceComp(comp);
};

export {HenceModel};
