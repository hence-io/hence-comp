'use strict';
/**
 * @module hence-comp-behaviour
 */

import console from 'consoler';

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
 * @type {{properties: {props: {type: Object, notify: boolean}}, attached, _configureProperties}}
 */
let HenceBehaviour = {
  properties: {
    props: {
      type: Object
    }
  },

  attached() {
    this._configureProperties(); // will auto fill in this components properties if passed in as an object through the
  },

  /**
   * If this element was created on the DOM, and was passed in a props property, use that object to populate this
   * components properties now, in one fell swoop.
   *
   * @private
   */
    _configureProperties() {
    let self = this;
    let propOverrides = self.props;

    //console.log('should check props?',!!propOverrides, propOverrides);

    if (propOverrides) {
      self.propList.forEach((propertyName)=> {
        if (propOverrides[propertyName]) {
          self.set(propertyName, propOverrides[propertyName]);
        }
      });
    }
  }
};

export {HenceBehaviour};
