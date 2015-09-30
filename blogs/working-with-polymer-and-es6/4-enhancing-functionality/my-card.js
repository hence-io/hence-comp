(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'; // Some browsers still require this

// Match this to your component tag name, which must contain a [prefix]-[name]
Object.defineProperty(exports, '__esModule', {
  value: true
});
var is = 'my-card';

var config = {
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  is: is, // In ES6, setting a key equal to a matching name variable can be shorten
  properties: {
    title: String,
    details: String,
    condensed: { // Whether or not we want to see the full details, or partial
      type: Boolean,
      value: true
    },
    email: {
      type: Object,
      value: function value() {
        // Improved ES6 function definitions
        return { // Returns a unique object for each instance of my-card
          label: 'Email',
          placeholder: 'Please enter your email',
          value: ''
        };
      }
    }
  },
  myProps: function myProps() {
    // A simple little debugging function
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
  created: function created() {
    // Handle any simple start up or initialization that will not require access to
    // instanced properties, or the DOM as it hasn't been ready'd yet.
  },
  ready: function ready() {
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  },
  factoryImpl: function factoryImpl(title) {
    var details = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var condensed = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    // Handle any initializations for components created in code, and work with properties
    // as this is called after the ready check.
    this.title = title;
    this.details = details;
    this.condensed = condensed;
  },
  attached: function attached() {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).

    this.displayAllDetails();
  },
  detached: function detached() {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  },

  /*********************************************************************************************************************
   * Event Listeners
   ********************************************************************************************************************/
  listeners: {
    //'readmore.tap': 'displayAllDetails'
  },
  /*********************************************************************************************************************
   * Component Interaction
   ********************************************************************************************************************/
  displayAllDetails: function displayAllDetails(e) {
    if (!this.condensed) {
      // Remove the condensed class if we're removing the flag
      this.$.details.classList.remove('condensed');
    }
  },

  readMore: function readMore(e) {
    // Display the details, and will hide the button
    this.$.collapse.show();

    // Ensure to remove the condensed flag and class on the details
    this.condensed = false;
    this.displayAllDetails(e);
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/
  behaviors: []
};

// Define the MyCard component for Polymer, which will automatically register it on the DOM for us after.
var MyCard = Polymer(config);

// Expose some helpful parts of the component should they be leveraged by other components.
exports.is = is;
exports.config = config;

// Expose our component so it can be used dynamically later.
exports['default'] = MyCard;

},{}]},{},[1]);
