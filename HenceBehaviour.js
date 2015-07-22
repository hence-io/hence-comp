'use strict';
/**
 * @module hence-comp
 */
/**
 * @external Polymer http://polymer.github.io/polymer/
 */

import console from 'consoler';

let HenceBehaviour = {
  properties: {
    props: {
      type: Object,
      notify: true
    }
  },

  attached() {
    this.configureProperties(); // will auto fill in this components properties if passed in as an object through the
  },

  /**
   * If this element was created on the DOM, and was passed in a props property, use that object to populate this
   * components properties now, in one fell swoop.
   */
    configureProperties() {
    let self = this;
    let propOverrides = self.props;

    if (propOverrides) {
      self.propList.forEach(function (propertyName) {
        if (propOverrides[propertyName]) {
          self.set(propertyName, propOverrides[propertyName]);
        }
      });
    }
  }
};

export default HenceBehaviour;
