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
import polymerIntegrity from '../core/integrity';

import console from 'consoler';

import _each from 'lodash/collection/each';
import _extend from 'lodash/object/extend';
import _keys from 'lodash/object/keys';
import _isArray from 'lodash/lang/isArray';

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
 */
let BehaviourInitialization = (comp)=> {
  let _props = _keys(comp.properties || {});

  return {
    /**
     * To simplify allowing to pass a single object through the DOM that overrides any/all of this components
     * properties, we'll allow a default 'props' property on the element to be access this way.
     */
    properties: {
      props: {
        type: Object
      },
      _propList: {
        type: Array,
        readOnly: true,
        value: _props
      },
      _propConfig: {
        type: Object,
        readOnly: true
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

    /********************************************************************************************************************
     * Initialization
     ********************************************************************************************************************/

    /**
     * The factoryImpl method is only invoked when you create an element using the constructor, this.createElement or
     * it's binding functions. Instances hardcoded into html already will NOT execute this constructor. You've been
     * warned.
     *
     * @param {Object} config A set of options for configuring this component
     */
      factoryImpl(config) {
      let self = this;
      self._set_propConfig(config);

      // Must use local _props private var, as self.propList will no yet be initialized... self.propList is usable
      // in the ready/attached methods without issue however.
      _each(_props, (propertyName)=> {
        if (config[propertyName]) {
          self.set(propertyName, config[propertyName]);
        }
      });
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
};

/*******************************************************************************************************************
 * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
 ******************************************************************************************************************/
polymerIntegrity(BehaviourInitialization, 'BehaviourInitialization');

export {BehaviourInitialization};
