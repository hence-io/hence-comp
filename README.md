# Hence.io
## HenceComp
A core wrapper for working with Polymer objects, used to be a foundation for other Hence components, which are an ES6
 implementation of Polymer web components.

### Working with HenceComp

Getting the package from npm:
```npm i --save hence-polycore```

#### Registering Components
```
import HenceComp from 'hence-polycore';
let MyElement = HenceComp({ ... your polymer config ... }});
export default MyElement;
```

What this will afford you are some helper functions in working with Polymer. This usage of Polymer objects works
along the lines of Polymer.Class, so your components are not registered to the DOM automatically. This is for the
fact that some components being built may not need to become full Polymer components at run time, and can be lazy
loaded.  This helps make them more flexible in a ES6 workspace as well when importing many components at once.

If you have your component, <my-element></my-element> on the DOM and do not register your component in Polymer, it
effectively will do nothing until you do trigger ```registerElement```.

To register the element, simply:

```
import MyElement from './my-element.js';
MyElement.registerElement(); // returns a Polymer object, and ensures to register it as a custom element.
```

This method safely only ever registers the element once, staticly storing the Polymer object.

#### Creating Components Dynamically

You can easily create elements to add to the DOM. The ```createElement``` falls back on running the
```registerElement```, to ensure that the component you're trying to create was registered.

```
import MyElement from './my-element.js';
let el = MyElement.createElement(); // lets build an element
document.body.appendChild(el); // add our el to the end of the body now
```

A simple helper function to append elements is ```appendElementTo```. Passing no target defaults to ```document.body```.

```
import MyElement from './my-element.js';
MyElement.appendElementTo(document.querySelector('#myElement')); // lets build an element, and append it to our target
```
