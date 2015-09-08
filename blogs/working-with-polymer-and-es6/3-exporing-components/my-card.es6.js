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
    details: 'String',
    condensed: 'Boolean', // Whether or not we want to see the full details, or partial
    email: {
      type: 'Object',
      value() { // Improved ES6 function definitions
        return { // Returns a unique object for each instance of my-card
          label: 'Email',
          placeholder: 'Please enter your email',
          value: ''
        };
      }
    }
  },
  myProps() { // A simple little debugging function
    // 'this' context is the current polymer instance, allowing you to access your properties
    // on demand.
    console.log('MyProps are:', { // spit out
      title: this.title,
      condensed: this.condensed,
      email: this.email
    });
  },
  /*********************************************************************************************************************
   * Lifecycle
   ********************************************************************************************************************/
  created() {
    // Handle any simple start up or initialization that will not require access to
    // instanced properties, or the DOM as it hasn't been ready'd yet.
  },
  ready() {
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  },
  factoryImpl(title, details = '', condensed = true) {
    // Handle any initializations for components created in code, and work with properties
    // as this is called after the ready check.
    this.title = title;
    this.details = details;
    this.condensed = condensed;
  },
  attached() {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).

    this.displayAllDetails();
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
    'readmore.tap': 'displayAllDetails'
  },
  /*********************************************************************************************************************
   * Component Interaction
   ********************************************************************************************************************/
    displayAllDetails(e) {
    if (!this.condensed) { // Remove the condensed class if we're removing the flag
      this.$.details.classList.remove('condensed');
    }
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
