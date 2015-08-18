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

import _isFunction from 'lodash/lang/isFunction';
import _isEqual from 'lodash/lang/isEqual';
import _isObject from 'lodash/lang/isObject';

/**
 * ### Event Hooks ```Hence.hook(target, prepareData)```
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
 * #### Sample Usage
 *
 * This sample would dynamically generate a Comp and attach it to the document body. Clicking the button
 * automatically triggers the hook action passed through from the callToAction property.
 *
 * ```javascript
 * // comp.js
 * export default Comp = Hence.Ui({
 *  is:'my-comp',
 *  properties: {
 *    callToAction: Object
 *  },
 *  eventCallToAction: Hence.hook('callToAction')
 * });
 * ```
 * ```html
 * <!-- comp.html -->
 * <dom-module is='my-comp'>
 *   <input value="{{callToAction.email::input}}" placeholder="email"></input>
 *   <button on-tap='eventCallToAction'>Sign Me Up!</button>
 * </dom-module>
 * ```
 * ```javascript
 * // index.js
 * import Comp from 'comp';
 * Comp.appendToElement({
 * callToAction: {
 *   action: (data)=> {
 *     console.log('I got an email from the component!',data.email);
 *   },
 *  email: ''
 * }
 * });
 * ```
 *
 * @param {Object} targetModel The the intended target to hook into
 * @param {Function|Null} prepareData A callback to allow the model data to be formatted before being returned to the callee
 * @returns {Function} The event callback to allow the component to hook into too
 */
let HenceHook = (targetModel, prepareData = null)=> {
  return (e)=> {
    let model = e.model || {};
    let dataModel = model[targetModel];

    // If the target was not present, give developers a clear message on their flub to correct it.
    if (!dataModel || !_isObject(dataModel)) {
      return console.error(`HenceHook::Configuration - The target model, ${targetModel}, is NOT a valid property of the component or repeated object, or it is not an object with a valid action method to hook into.`);
    }
    // If there is no action method, clearly something has gone amuck. Notify the developer with all possible
    // objects to help them debug.
    else if (!_isFunction(dataModel.action)) {
      return console.error(`HenceHook::Configuration - This hook was not properly configured or implemented. Please ensure the target model, ${targetModel}, has a valid action method.`, {
        event: e,
        eventModel: model,
        target: targetModel,
        data: dataModel
      });
    }

    // If a preparation callback was provided, run this to sanitize the data before it is passed along.
    if (_isFunction(prepareData)) {
      prepareData(dataModel, model, e);
    }

    // Everything was configued and processed, fire off the hook action now with needed data.
    dataModel.action(dataModel, model, e);

    //console.log('HenceHook:event', e, model);
  }
};

export {HenceHook};
