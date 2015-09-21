// # Event Hooks
//
// Provides an easy accessible hook function for the component to leverage. With accepting a object parameter which
// contains an action method, this will provide a bindable event in the component's template, and automatically call
// that method, passing in the targeted data model from the event.
//
// Optionally, before the data is sent along to the original hook, you can process the data with anything related to
// the current component before it is sent off to be acted upon.
//
// Ideal use of these hooks are inside of Ui components, triggering hooks back to Models, so the Ui can handle the
// event and model digest, and serve the Model exactly the data it needs. Additional parameters returned, the model
// and originating event are provided should the hook be used between multiple Uis.
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module hence-hook
 */



import _keys from 'lodash/object/keys';
import _bind from 'lodash/function/bind';
import _find from 'lodash/collection/find';
import _clone from 'lodash/lang/cloneDeep';
import _isFunction from 'lodash/lang/isFunction';
import _isEqual from 'lodash/lang/isEqual';
import _isObject from 'lodash/lang/isObject';

// ```Hence.hook(target, prepare)```
// * target - The the intended target to hook into
// * prepare - A callback to allow the model data to be formatted before being returned to the callee
// * returns - The event callback to allow the component to hook into too
/**
 * @param {Object} target
 * @param {Function|Null} prepare
 * @returns {Function}
 */
let HenceHook = (target, prepare = null)=> {
  return (e)=> {
    let model = e.model || this || {};
    let component = this || model._rootDataHost;
    let hookData;
    let debug;

    // Attempt to load the data from the model. If not found, look into the event path to find the original
    // web component to link up the data from there.
    if (!(hookData = _clone(model[target]))) {
      component = model = _find(e.path, target) || {};
      hookData = _clone(model[target]);
    }

    // Helpful debugging data should the hook not be configured correctly.
    debug = { e, model, target, hookData, component };

    // If the target was not present and no data was found, give developers a clear message to help correct it.
    if (!_isObject(hookData)) {
      return console.error(`HenceHook::Configuration - The target model, ${target}, is NOT a property of the targeted component or repeated object.`, debug);
    }

    // If there is no action method, clearly something has gone amuck. Notify the developer to help them debug.
    else if (!_isFunction(hookData.action)) {
      return console.error(`HenceHook::Configuration - This hook was not properly configured or implemented. Please ensure the target model, ${target}, has a valid action method.`, debug);
    }

    // Clear out any past error flags on this hook object.
    hookData._error = false;

    // If a preparation callback was provided, run this to sanitize the hook data before it is passed along.
    if (prepare && _isFunction(component[prepare])) {
      // Launch the prepare function now, as prepare(data, model, e) with component being 'this'
      _bind(component[prepare], component, hookData, model, e)();
    }

    // Everything was configured and processed, and no errors were flagged; fire off the hook action now with the
    // adjusted data.
    if (hookData._error !== true) {
      // Launch the hook action now, as .action(model, e) with hookData being 'this'; WIP Passing it as 1st parameter.
      _bind(hookData.action, hookData, hookData, model, e)();
    }
  };
};

export {HenceHook};
