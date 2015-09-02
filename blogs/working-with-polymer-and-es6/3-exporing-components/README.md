# Working with Polymer and ES6 - Exploring Components

In Part 3, we are now ready to start expanding and featurizing our new component to make it a practical component we
could see ourselves using in a site or web application.

## Component Bootcamp

With the sample project up and running, we can now start to explore what makes Polymer shine, while introducing you
to some of the great ES6 improvements to boot. If you haven't read through any of
[Polymer's Developer Guide](https://www.polymer-project.org/1.0/docs/devguide/feature-overview.html) yet, I highly
recommend it before continuing.

This guide will be taking you beyond what's in the Polymer docs, to help highlight some of it's intricacies and
got'chas to lookout for, allowing you to build more effective components with less effort.

Here's the highlights of what we'll be covering:

- [Registering your Component](#registering-your-component)
- [Properties](#properties)
- [Component Lifecycle](#component-lifecycle)
- [Listeners](#listeners)
- [Behaviours](#behaviours)
- [Styling](#styling)

### Registering your Component

[Polymer's guide on a component's Registration & Lifecycle](https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html)
 describes the various ways in which components are handled when registered on page, initialized and accessible on
 the DOM, and finally when they're being removed.

A Polymer object is registered by you defining it in your JS file:
```javascript
const MySample = Polymer({...});
```

The inclusion of this inside your component allows it to then be placed on the DOM, as with the ```index.html``` or
generated in code to spawn new components:

```html
<my-sample></my-stample>
```

```javascript
// Create an element through object construction
let el = new MySample(); // spawn a new component
document.findById('my-div').appendChild(el); append it to a div

// Create an element via the document
let el2 = document.createElement('my-sample');
document.findById('my-div').appendChild(el2); append it to a div
```

Seems easy enough, but this doesn't really given us any control over what is happening when it is created or added to
 the DOM. For that, we need to leverage the hook methods in the [component's lifecycle](#component-lifecycle). But
 first, it's time that we talk about a component's properties so we can add some substance to our component.

### Properties

```javascript
const config = {
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
  }
};
```

### Component Lifecycle

With component registration handled, Polymer offers few methods to manage how your component is initialized and
configured when it is spawned and or added to the DOM.

>The element’s basic initialization order is:
>
>created callback
>local DOM initialized
>ready callback
>factoryImpl callback
>attached callback

They declared up front that the order in which these execute is not guaranteed, but they are able to
ensure some of the hooks do execute in a manageable sequence.

*Note:* One of the callbacks has very limited use case: ```factoryImpl``` is only ever used if your component is being
dynamically generated in code. This will **never** be leveraged from components defined in the DOM or other components
templates.

>For a given element:
>
>The created callback is always called before ready.
>The ready callback is always called before attached.
>The ready callback is called on any local DOM children before it’s called on the host element.

Add into the mix components with in components, sibling components and so forth, it can get quite complicated!

So how does one make sense of all these hooks? Polymers guide has a introduction to them, but provides little on just
 how they pan out in practice. And this is where some of it's got'chas start to appear on how to best leverage it's
 tools for what you need.

Let's add these methods to our component with details on what they're trying to accomplished for you.

```javascript
const config = {
  is, // In ES6, setting a key equal to a matching name variable can be shorten
  factoryImpl()=> {
  },
  created: ()=> {
    // I do stuff
  },
  ready: ()=> {
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  },
  attached: ()=> {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).
  },
  detached: ()=> {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  }
}
```



### Listeners

### Behaviours

### Styling
