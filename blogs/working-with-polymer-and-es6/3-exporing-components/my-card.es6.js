'use strict'; // Some browsers still require this

// Match this to your component tag name, which must contain a [prefix]-[name]
const is = 'my-card';

const config = {
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  is, // In ES6, setting a key equal to a matching name variable can be shorten
  properties: {
    title: 'String',
    condensed: 'Boolean',
    email: {
      type: 'Object',
      value: {
        label: 'Email',
        placeholder: 'Please enter your email',
        value: ''
      }
    }
  },
  /*********************************************************************************************************************
   * Lifecycle
   ********************************************************************************************************************/
  factoryImpl() {
    cli
  },
  created() {
    // I do stuff
  },
  ready() {
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  },
  attached() {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).
  },
  detached() {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  },

  /*********************************************************************************************************************
   * Event Listeners
   ********************************************************************************************************************/
  listeners: {
    'myButton.tap': 'buttonTapped'
  },
  buttonTapped(e){
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/
  behaviors: []
};

// Define the MyCard component for Polymer, which will automatically register it on the DOM for us after.
const MyCard = Polymer(config);

// Expose some helpful parts of the component should they be leveraged by other components.
export {is, config};

// Expose our component so it can be used dynamically later.
export default MyCard;
