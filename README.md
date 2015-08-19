# Hence Component Framework

>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [About](#about)
  - [HenceComp](#hencecomp)
- [Component Type Methodology](#component-type-methodology)
  - [UI](#ui)
  - [Model](#model)
  - [Schema](#schema)
- [Hence Component Stack](#hence-component-stack)
- [Getting Started](#getting-started)
  - [Building Components](#building-components)
    - [Creating Components Dynamically](#creating-components-dynamically)
    - [Appending Components Easily](#appending-components-easily)
  - [Event Hooks](#event-hooks)
    - [Usage](#usage)
  - [Polymer Integrity Checker](#polymer-integrity-checker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## About

Hence Component Framework is built on top of Polymer, designed to provide some essential standards to
the types of components to be based off of, and other essential helpers and tools to build better components.

The Component Framework is built in ES6 to leverage the latest benefits of native javascript, providing a streamlined
way to create and utilize Polymer components, sanitizing them to make sure they're sound, and allow for easier
debugging as required.

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

## Hence Component Stack

The most effective way to work with and make use of the framework is to scaffold out some components via the
 [Hence Component Stack](https://github.com/hence-io/slush-hence).

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

## Getting Started

Getting the package from npm:
```npm i --save hence-component-framework```

Getting the package from git:
```npm i --save hence-io/hence-component-framework```

### Building Components
```Hence.[Ui|Model|Schema](componentConfig)```

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

#### Registering Components

If you have your component, ```<my-element sample='great'></my-element>``` on the DOM and do not register your component in
Polymer, it effectively will do nothing until you do trigger ```registerElement```.

To register the element, simply:

```javascript
import MyElement from './my-element.js';

MyElement.registerElement(); // returns a Polymer object, and ensures to register it as a custom element.
```

This initialize the Polymer Class, and ensure it is only performed once, staticly storing the Polymer object to be
served when creating new elements, or support components already on the DOM.

[Source](https://github.com/hence-io/hence-component-framework/blob/master/lib/core.js)

#### Creating Components Dynamically

You can easily create elements to add to the DOM. The ```createElement``` falls back on running the
```registerElement```, to ensure that the component you're trying to create was registered.

```javascript
import MyElement from './my-element.js';

let el = MyElement.createElement(props); // lets build an element

document.body.appendChild(el); // add our el to the end of the body now
```

This create a new element, leveraging Polymers constructor method, allowing us to pass in parameters and execute the
factoryImpl(...) function, which HenceComp uses to assign matching properties to your new element.

[Source](https://github.com/hence-io/hence-component-framework/blob/master/lib/core.js)

#### Appending Components Easily

A simple helper function to append elements is ```appendElementTo```. Passing no target defaults to ```document.body```.

```javascript
import MyElement from './my-element.js';

MyElement.appendElementTo(props, document.querySelector('#myElement')); // lets build an element, and append it to our target
```

[Source](https://github.com/hence-io/hence-component-framework/blob/master/lib/core.js)

### Event Hooks
```Hence.hook(target, prepareData)```

Provides an easy accessible hook function for the component to leverage. With accepting a object parameter which
contains an action method, this will provide a bindable event in the component's template, and automatically call
that method, passing in the targeted data model from the event.

Optionally, before the data is sent along to the original hook, you can process the data with anything related to
the current component before it is sent off to be acted upon.

Ideal use of these hooks are inside of Ui components, triggering hooks back to Models, so the Ui can handle the
event and model digest, and serve the Model exactly the data it needs. Additional parameters returned, the model
and originating event are provided should the hook be used between multiple Uis.

[Source](https://github.com/hence-io/hence-component-framework/blob/master/lib/hook.js)

#### Usage

This sample would dynamically generate a Comp and attach it to the document body. Clicking the button
automatically triggers the hook action passed through from the callToAction property.

```javascript
// comp.js
export default Comp = Hence.Ui({
  is:'my-comp',
  properties: {
    callToAction: Object
  },
  eventCallToAction: Hence.hook('callToAction')
});
```
```html
<!-- comp.html -->
<dom-module is='my-comp'>
  <input value="{{callToAction.email::input}}" placeholder="email"></input>
  <button on-tap='eventCallToAction'>Sign Me Up!</button>
</dom-module>
```
```javascript
// index.js
import Comp from 'comp';
Comp.appendToElement({
 callToAction: {
   action: (data)=> {
     console.log('I got an email from the component!',data.email);
   },
   email: ''
 }
});
```

### Polymer Integrity Checker

As you begin to work with Polymer, once and a while you'll start to make changes to your components, and things will
go astray and break, seemingly without any indication that something has gone wrong. When working with multiple
components tied into each other, tireless hours potentially can get lost trying to determine what it is you did.

This is in part largely to Polymers inability to detect whether or not you've overridden one of it's essential
methods or properties it has. It literally allows you to hijack it's core attributes and methods unknowingly and can
produce mixed results from slight a disruption or blanking out your components completely, without raising a single
console error or notice. Even worse, is the component many render and work mostly, and until you perform a specific
action will you start to see it fail, giving a false illusion everything is aok.

Because of this lacking feature in the Polymer core, we decided to build our own Integrity Checker, so thwart
potential bugs from reusing reserved property & key names outright. In addition, it will tell you what method or
property names you're trying to use that are in conflict on a specific component.

Whenever you stumble upon a reserved name, you will receive a detailed console error so you can address it promptly
. No more mystery or confusion in tracking down what you've overridden.

<img width="910" alt="screen shot 2015-08-19 at 10 51 16 am" src="https://cloud.githubusercontent.com/assets/13222640/9359667/4514920e-4660-11e5-8397-5f81ba8abc18.png">
<img width="882" alt="screen shot 2015-08-19 at 10 44 00 am" src="https://cloud.githubusercontent.com/assets/13222640/9359542/9b4259d2-465f-11e5-9b24-5561cb3beec2.png">
