'use strict'; // Some browsers still require this

// Match this to your component tag name, which must contain a [prefix]-[name]
const is = 'my-sample';

const config = {
  is // In ES6, setting a key equal to a matching name variable can be shorten
};

// Define the MySample component for Polymer, which will automatically register it on the DOM for us after.
const MySample = Polymer(config);

// Expose some helpful parts of the component should they be leveraged by other components.
export {is, config};

// Expose our component so it can be used dynamically later.
export default MySample;
