'use strict';
/**
 * @module hence-ui
 */

import console from 'consoler';

import _extend from 'lodash/object/extend';
import _defaults from 'lodash/object/defaults';
import _keys from 'lodash/object/keys';

import _each from 'lodash/collection/each';

import _clone from 'lodash/lang/cloneDeep';

import _isFunction from 'lodash/lang/isFunction';
import _isEqual from 'lodash/lang/isEqual';
import _isObject from 'lodash/lang/isObject';

/**
 *
 *
 * @param {Object} targetModel The component being defined
 * @param {Function|Null} prepareData A callback to allow the model data to be formatted before being returned to
 *                        the callee
 * @returns {Function} The resulting component, based on HenceComp, with some added Model specific functionality.
 */
let HenceHook = (targetModel, prepareData = null)=> {
  return (e)=> {
    let model = e.model || {};
    let data = model[targetModel];

    // If the target was not present, give developers a clear message on their flub to correct it.
    if (!data || !_isObject(data)) {
      return console.error(`HenceHook::Configuration - The target model, ${targetModel}, is NOT a valid property of the component or repeated object, or it is not an object with a valid action method to hook into.`);
    }
    // If there is no action method, clearly something has gone amuck. Notify the developer with all possible
    // objects to help them debug.
    else if (!_isFunction(data.action)) {
      return console.error(`HenceHook::Configuration - This hook was not properly configured or implemented. Please ensure the target model, ${targetModel}, has a valid action method.`, {
        event: e,
        eventModel: model,
        target: targetModel,
        data: data
      });
    }

    if (_isFunction(prepareData)) {
      prepareData(data, model);
    }

    data.action(e, data, model);

    console.log('HenceHook:event', e, model);
  }
};

export {HenceHook};
