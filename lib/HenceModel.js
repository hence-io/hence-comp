'use strict';
/**
 * @module hence-comp-model
 */

import HenceComp from './HenceComp';

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';

import _each from 'lodash/collection/each';

/**
 * @constructor
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component, based on HenceComp, with some added Model specific functionality.
 */
let HenceModel = (original)=> {
  let comp = HenceComp(original);

  _defaults(comp.properties, {
    query: {
      type: Object,
      value: ()=> { return {}; }
    }
  });

  _extend(comp.properties, {
    processedState: {
      type: Object,
      value: null
    },
    state: {
      type: Array,
      value: null
    }
  });

  _extend(comp, {
    /**
     * This method does the essential processing of the state pulled in from a given schema component, and processes
     * it via the _transforState function to couple the raw data to a friendly option set for the desired UI component.
     */
    renderState() {
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

      self.set('processedState', results);

      return this.processedState;
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

  return comp;
};

export {HenceModel};
