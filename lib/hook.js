/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module hence-ui
 */

import console from 'consoler';

import _keys from 'lodash/object/keys';
import _find from 'lodash/collection/find';
import _reject from 'lodash/collection/reject';
import _filter from 'lodash/collection/filter';
import _clone from 'lodash/lang/cloneDeep';
import _isFunction from 'lodash/lang/isFunction';
import _isEqual from 'lodash/lang/isEqual';
import _isObject from 'lodash/lang/isObject';

/**
 * ### Event Hooks
 * #### ```Hence.hook(target, prepareData)```
 *
 * Provides an easy accessible hook function for the component to leverage. With accepting a object parameter which
 * contains an action method, this will provide a bindable event in the component's template, and automatically call
 * that method, passing in the targeted data model from the event.
 *
 * Optionally, before the data is sent along to the original hook, you can process the data with anything related to
 * the current component before it is sent off to be acted upon.
 *
 * Ideal use of these hooks are inside of Ui components, triggering hooks back to Models, so the Ui can handle the
 * event and model digest, and serve the Model exactly the data it needs. Additional parameters returned, the model
 * and originating event are provided should the hook be used between multiple Uis.
 *
 * @param {Object} e The event object triggering this hook request
 * @param {Object} target The the intended target to hook into
 * @param {Function|Null} prepareData A callback to allow the model data to be formatted before being returned to the callee
 * @returns {Function} The event callback to allow the component to hook into too
 */
let HenceHook = (target, prepareData = null)=> {
  return (e)=> {
    let self = this;
    let model = e.model || self || {};
    let data = _clone(model[target]);

    var debug = {
      event: e,
      model: model,
      target: target,
      data: data,
      comp: self,
      args: arguments
    };

    if (!data) {
      self = model = _find(e.path, target) || {};
      data = _clone(model[target]);

      console.log('found this', _find(e.path, target), self, data);
    }

    // If the target was not present, give developers a clear message on their flub to correct it.
    if (!data || !_isObject(data)) {

      return console.error(`HenceHook::Configuration - The target model, ${target}, is NOT a property of the targeted component or repeated object.`, debug);
    }
    // If there is no action method, clearly something has gone amuck. Notify the developer with all possible
    // objects to help them debug.
    else if (!_isFunction(data.action)) {
      return console.error(`HenceHook::Configuration - This hook was not properly configured or implemented. Please ensure the target model, ${target}, has a valid action method.`, debug);
    }

    // Clear out any past error flags
    data._error = false;

    // If a preparation callback was provided, run this to sanitize the data before it is passed along.
    if (_isFunction(prepareData)) {
      prepareData.call(self, data, model, e);
    }

    // Everything was configured and processed, and no errors were flagged, fire off the hook action now with needed
    // data.
    if (data._error !== true) {
      console.log('launching action on', debug);
      data.action(data, model, e);
    }

    //console.log('HenceHook:event', e, model);
  };
};

export {HenceHook};
