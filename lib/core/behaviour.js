/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module hence-behaviour
 */

import {HenceHook} from '../hook';
import polymerIntegrity from './integrity';

import console from 'consoler';

import _each from 'lodash/collection/each';

/**
 * A core behaviour to allow any component to be passed in a props attribute with a full/partial set of properties
 * for the given component.
 *
 * Example:
 * ```
 * <api-comp url="...endpoint.json" results="{{customProps}}"></api-comp>
 * <my-ui props={{customProps}}></my-ui>
 * ```
 *
 * This allows other components to effortlessly passing a range of settings to render the child component, leaving it
 * to do it's own magic. The example above allows the ```api-comp``` to dump results in to the ```customProps```
 * variable, which feeds and then dispalys the ```my-ui``` component.
 *
 * In practical cases, the data would be transformed vs. being passed in raw to the ui component.  See the
 * HenceModel object for reference on this.
 *
 * @type {{properties: {props: {type: Object, notify: boolean}}, attached, _initializeProps}}
 */
let HenceBehaviour = {
  properties: {
    props: {
      type: Object
    }
  },

  created() {
    this._initializeHooks();
  },

  /**
   * Will auto fill in this components properties if passed in as an object through the constructor.
   */
    attached() {
    this._initializeProps();
  },

  /**
   * If this element was created on the DOM, and was passed in a props property, use that object to populate this
   * components properties now, in one fell swoop.
   *
   * @private
   */
    _initializeProps() {
    let self = this;
    let config = self.props;

    try {
      //console.log('should check props?', !!config, config, self._propList);

      if (config && self._propList) {
        self._propList.forEach((propertyName)=> {
          if (config[propertyName]) {
            self.set(propertyName, config[propertyName]);
          }
        });
      }
    } catch (e) {
      console.error('HenceBehaviour::_initializeProps failure', self, e);
    }
  },

  _initializeHooks() {
    let self = this;

    // Object method
    _each(self.hooks, (callee, event)=> {
      let target = event.replace('hook.', '');

      if (event.indexOf('hook.') === -1) {
        event = `hook.${event}`;
      }

      self[event] = HenceHook(target, callee);
    });

    // Array method
    /*_each(self.hooks, (hook)=> {
      let [event,callee] = _isArray(hook) ? hook : [hook];
      let target = event.replace('hook.', '');

      if (event.indexOf('hook.') === -1) {
        event = `hook.${event}`;
      }

      self[event] = HenceHook(target, callee);
    });*/
  }
};

/*******************************************************************************************************************
 * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
 ******************************************************************************************************************/
polymerIntegrity(HenceBehaviour, 'HenceBehaviour');

export default HenceBehaviour;
