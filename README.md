# Hence Component Framework

>

## About

Hence Component Framework is built on top of Polymer, designed to provide some essential standards to
the types of components to be based off of, and other essential helpers and tools to build better components.

The Component Framework is built in ES6 to leverage the latest benefits of native javascript, providing a streamlined
way to create new Polymer components, sanitizing them to make sure they're sound, and allow for easier debugging as
required.

### HenceComp

HenceComp is the base object in which all Hence Components are derived from to help address some common
 functionality that is not present in Polymer, such as simplifying component instantiation through DOM or
 dynamic creation, and methods to snap components to new DOM elements with ease.

A critical addition to this is a integrity checker to ensure properties and methods you add to your object do not
conflict with Polymer, prevent disastrous errors which go unchecked by Polymer, so you can address them promptly
during development.

>

## Component Type Methodology

### UI

UI components are the most diverse Hence Component type, and are derived from the base HenceComp object.

Polymers native functionally beyond this largely provides everything we need to make powerful and effective UI
components.

These components are designed to be data agnostic. Every possible piece of text, image, icons, links or more complex
elements are configurable and can be rendered by other components. Events dealing with data are hooks fired when
triggered back to the component which implemented it, while some internal events may exist in isolation to support
interaction or non-data based behaviour.

### Model

Model components are specialized to help bridge the UI & Schema components, taking data from Schemas, translates and
formats the results to support a dedicated UI component, and serves the results once prepared to UI.

### Schema

Schema components define and help data adhere to a strict format, field type, and validation methods for data
integrity and transport. All API interaction occurs through these components, and it helps to facilitate serving data
 to the Model components. These components have 0 consideration for UI and are utilized exclusively for their data
 management.

Because of the interoperable nature of these components, they are still able to effectively be leveraged on the
server API side of your project, if Node/iojs based, allowing the data validation methods to support front and
backend, reducing the need for divergent schemas over different parts of the project.

>

## Hence Component Framework

The most effective way to work with and make use of the Hence Polymer Code is to scaffold out some components via the
 [Hence Component Framework](https://github.com/hence-io/slush-hence).

A summary of the supported tools baked into it:

* Included
    * Hence Component Framework
    * Polymer Web Components
    * ES6 / ES2015
        * Babel
        * Browserify
    * Sass
        * Compass
    * Gulp
        * BrowserSync
* Optional
    * ES Lint
    * Scss Lint
    * KSS Style Guide
        * SC5 Styleguide
    * Web Component Behavioural Testing
    * Karma Unit Testing
    * JS Doc Generation

For more details, check out the project on how to get up and running in minutes! https://github.com/hence-io/slush-hence

# Getting Started with Hence Component Framework

Getting the package from npm:
```npm i --save hence-component-framework```

Getting the package from git:
```npm i --save hence-io/hence-component-framework```

## Building Components

```javascript
import Hence from 'hence-component-framework';

// Choose which Component Type to build, Ui, Model, or Schema
let MyElement = Hence.Ui({
  is: 'my-element',
  properties : {
    sample: 'string'
  }
}});

export default MyElement;
```

What this will afford you are some helper functions in working with Polymer. This usage of Polymer objects works
along the lines of Polymer.Class, so your components are not registered to the DOM automatically. This is for the
fact that some components being built may not need to become full Polymer components at run time, and can be lazy
loaded.  This helps make them more flexible in a ES6 workspace as well when importing many components at once.

### Registering Components

If you have your component, ```<my-element sample='great'></my-element>``` on the DOM and do not register your component in
Polymer, it effectively will do nothing until you do trigger ```registerElement```.

To register the element, simply:

```javascript
import MyElement from './my-element.js';

MyElement.registerElement(); // returns a Polymer object, and ensures to register it as a custom element.
```

This method safely only ever registers the element once, staticly storing the Polymer object.

### Creating Components Dynamically

You can easily create elements to add to the DOM. The ```createElement``` falls back on running the
```registerElement```, to ensure that the component you're trying to create was registered.

```javascript
import MyElement from './my-element.js';

let el = MyElement.createElement(); // lets build an element

document.body.appendChild(el); // add our el to the end of the body now
```

A simple helper function to append elements is ```appendElementTo```. Passing no target defaults to ```document.body```.

```javascript
import MyElement from './my-element.js';

MyElement.appendElementTo(document.querySelector('#myElement')); // lets build an element, and append it to our target
```

>
