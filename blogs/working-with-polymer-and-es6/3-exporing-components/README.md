# Working with Polymer and ES6 - Exploring Components

In Part 3, we'll dive in to our new component to explore the various aspects of Polymer to start crafting the
foundation of our component.

- [Component Bootcamp](#component-bootcamp)
  - [Registering your Component](#registering-your-component)
  - [Properties](#properties)
  - [Component Lifecycle](#component-lifecycle)
  - [Template](#teamplte)
  - [Listeners](#listeners)

---

## Component Bootcamp

With the sample project up and running, we can now start to explore what makes Polymer shine, while introducing you
to some of the great ES6 improvements to boot. If you haven't read through any of
[Polymer's Developer Guide](https://www.polymer-project.org/1.0/docs/devguide/feature-overview.html) yet, I highly
recommend it before continuing.

This guide will be taking you beyond what's in the Polymer docs, to help highlight some of it's intricacies and
got'chas to lookout for, allowing you to build more effective components with less effort.

### Registering your Component

[Polymer's guide on a component's Registration & Lifecycle](https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html)
 describes the various ways in which components are handled when registered on page, initialized and accessible on
 the DOM, and finally when they're being removed.

A Polymer object is registered by you defining it in your JS file:
```javascript
const MyCard = Polymer({...});
```

You notice the use of the **const** keyword. This is one of the new ES6 variable declaration types, and it is
especially useful for when defining things that shouldn't be overridden, such as our Polymer component definition!

By creating a Polymer object this way, it allows your components to be placed on the DOM, as with the ```index.html``` or
generated in code to spawn new components:
```html
<my-card></my-card>
```

```javascript
// Create an element through object construction
let el = new MyCard(); // spawn a new component
document.findById('my-div').appendChild(el); append it to a div

// Create an element via the document
let el2 = document.createElement('my-card');
document.findById('my-div').appendChild(el2); append it to a div
```

**let** is another new variable keyword, which has essential replaced the use of ```var```, as let provides tighter
control over what scopes your variables exist in.

So, this seems easy enough? We've got our objects being generated, but this doesn't really given us any control over
what is happening when it is created or added to the DOM yet. For that, we need to leverage the hook methods in the
[component's lifecycle](#component-lifecycle). But first, it's time that we talk about a component's properties, so
we can add some substance to our component.

### Properties

Properties on our Polymer object allow it to manage state, flag options, and explicitly define what data this
component will be interacting with. Properties can be defined by their simple object type ```String```, ```Array```
and so forth, or they can be defined with a set of options to enhancing their purpose.

Let's add some simple properties to our sample in ```my-card.es6.js```. We'll be getting into more advanced
properties later on!

```javascript
const config = {
  /**************************************************************************************
   * Initialization
   *************************************************************************************/
  is, // In ES6, setting a key equal to a matching name variable can be shorten
  properties: {
    title: 'String',
    details: 'String',
    condensed: { // Whether or not we want to see the full details, or partial
      type: Boolean,
      value: true
    },
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
  }
};
```

With **email** being an object with a unique default, we want to return a new object vs setting one. This ensures that
each **my-card** component has a unique email object assigned to it. If we didn't, every single instance of
**my-card** would share the same value. While there are some cases this could be useful, it is not the norm.

You will also notice that we're leveraging ES6's improved function definition  ```value() {...}```, which in ES5 would of
required us to write ```value: function() {...}```. It's a simple short hand, but when you've written ```function```
thousands (and thousands, and thousands...) of times, it's a very handy time saver!

Lastly, a handy little debug function was added in ```myProps() {...}``` which shows how within the component we can
have access to properties we're defining. ```this``` within any component functions will always give you the context of
the component, and natively through Polymer, the way it constructs properties allows you to use them driectly as
```this.email``` without excessive getter/setter functions.

### Component Lifecycle

Now that our component has some properties to work with, lets dive right into how their lifecycle flow.  Polymer offers
few methods to manage how your component is initialized and configured when it is spawned and or added to the DOM.

>The element’s basic initialization order is:
>
> - created callback
> - local DOM initialized
> - ready callback
> - factoryImpl callback
> - attached callback

They declared up front that the order in which these execute is not guaranteed, but they are able to
ensure some of the hooks do execute in a manageable sequence.

*Note:* One of the callbacks has very limited use case: ```factoryImpl``` is only ever used if your component is being
dynamically generated in code. This will **never** be leveraged from components defined in the DOM or other components
templates.

>For a given element:
>
> - The created callback is always called before ready.
> - The ready callback is always called before attached.
> - The ready callback is called on any local DOM children before it’s called on the host element.

Add into the mix components with in components, sibling components and so forth, it can get quite complicated!

So how does one make sense of all these hooks? Polymers guide has a introduction to them, but it provides little on
 how they pan out in practice. And this is where some of it's got'chas start to appear on how to best leverage it's
 tools for what you need.

Let's add these methods to our component with details on what they're trying to accomplished for you.

```javascript
const config = {
  ...
  /**************************************************************************************
   * Lifecycle
   *************************************************************************************/
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
  },
  detached() {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  },
  ...
}
```

These functions have been laid out in the their relative expected order in which they're ran to keep the flow of the
lifecycle present. ```created()``` and ```ready()``` tend to be a bit misleading in terms of what actions you can
actually perform within them.

* ```created()``` This is the most limited start up method, and should be focused on low level support in elements as
it has no access to much of the final components attributes.

* ```ready()``` Avid jQuery users will be thrown for a bit of a loop with this on, as it does not imply everything
related to this component is ready to use! You do however have access to the DOM at this point, and this method is very
effective for working with any child components, as it ensures they are fully initialized and able to be manipulated at
this point.

* ```factoryImpl(title, details = '', condensed = true) {...}``` Recalling the note above, this function will only run
for new components created dynamically in code. One of it's benefits is that is a custom function, allowing you define
your own set of parameters to build your component constructor as you choose.

* ```attached()``` **The bread and butter of setting up your component**, the attached method lets you fully access all
of your components properties, affect it fully on the DOM, and know that any parent/child components will respond to
them accordingly.

* ```detached()``` Plugins, temporary state, or anything you wish to clean up after you component is removed should be
placed here. This  is very useful if you're dynamically adding and removing your components on page, to ensure it's not
leaving anything unwanted behind afterwards.

In this sample, we also see another awesome ES6 enhancements to functions! Finally (FINALLY!), we have access to
default values for are method arguments. Creating a new component with ```let card = new MyCard('This is my card');```
will provide with a card component, having a title of 'This is my card', blank details, and be flagged as condensed.
It's wonderful to finally have this feature in JS, and helps to reduce argument verification code to ward off undefined
parameters passed.

### Template

We've added a lot of code to our component definition, and it's time that we update our component's template to tie in
 all of the new functionality and behaviour we've been adding. We will replace our ```my-card.html``` <tempalte> tag
 with the following:

```html
<dom-module id="my-card">
  ...
  <template>
    <!-- Display the provided title -->
    <h3 id="title">{{title}}</h3>
    <!--
    Display the provided details, and by default set the condensed class.
    Attached() will determine what to do with it.
    -->
    <p id="details" class="condensed"><b>Details:</b> <span>{{details}}</span></p>
    <!-- If condensed is set on the component, display this button. -->
    <template is="dom-if" if="{{condensed}}">
      <button id="readmore">Read More</button>
    </template>
  </template>
  ...
</dom-module>
```

We are able to display our properties values in the template with ease. ```{{properyName}}``` gives us the value,
which we can use to output text/HTML through to the browser, or in special cases use our values to optionally display
different elements.

**Displaying Text/HTML**

The first use of a property on the DOM above for **title**, you can see that it is the only text within the h3 tag.
With the **details** it displayed with a prefix 'Details: ', but the property is still wrapped inside a span after.
This is an important got'cha of Polymer, in which you CANNOT provide a property as text in conjunction with other
text. Had we written ```<p id="details" class="condensed"><b>Details:</b> {{details}}</p>```, you'd be testing it and
 scratching you head as to why you only ever see 'Details: ' displayed on your sample.

**What's a dom-if?**

Polymer has some great utilities built into it, allowing you to make your templates flexible and handing conditions
or 'if this do that/show that', as well as some utilities for handling repeating data, which we'll be touching on
later. ```<template is="dom-if" if="{{condensed}}">``` will only ensure that the read more button is visible if the
component is flagged as condensed.

**Using IDs everywhere, seriously?**

It may seem weird at first, seeing ID attributes used on many of your component elements. Inherently using IDs has
been a mixed bag, with them easily be duplicated and causing any number of nightmares in DOM/jQuery based
development, but Polymer does things a little differently thanks to the power of shadow DOM. IDs now become local
references to instanced components, so that these elements physically never exist on the same HTML source, and you
can safely target them without ever fear of sibling or other components having the same IDs present.

### Listeners

Now that we have a button in our template to help control displaying the details, we need a way to control that
button, as well as track whether the component should be displaying the details condensed or not.

To accomplish this, we need to add some behaviour to our component so it knows what to do when the condensed flag is
set or toggled, and allow our button to trigger that.

```javascript
const config = {
  ...
  /**************************************************************************************
   * Lifecycle
   *************************************************************************************/
  attached() {
    this.displayAllDetails();
  },
  /**************************************************************************************
   * Event Listeners
   *************************************************************************************/
  listeners: {
   'readmore.tap': 'displayAllDetails'
  },
  /**************************************************************************************
   * Component Interaction
   *************************************************************************************/
  displayAllDetails(e) {
   if(!this.condensed) { // Remove the condensed class if we're removing the flag
     this.$.details.classList.remove('condensed');
   }
  },
  ...
}
```

Updating our component to include these methods, we have a method ```displayAllDetails(e)``` to check whether or not
the condensed class should be removed from the details element.  Executing this method from the ```attached()``` method
ensures that when our components are initializing, they will apply this behaviour as needed.

An event listener now is also designated, which is looking for an element with the id ```readmore``` and tracking any
tap (mouse click, mobile tap) that occurs on that element. When the event is triggered, it should fire of the
```displayAllDetails(e)``` method for us.  **e** passed in is the event object sent by Polymer, which has some handy
component specific attributes to help with more advanced usage.

**Why can't I set a method on a listener?**

Due to some issues in the event propagation of Polymer, firing events has to stick to leveraging strings as the
targets vs embedding functions. This means a typical code convention will no be successful:

```javascript
const config = {
  ...
  /**************************************************************************************
   * Event Listeners
   *************************************************************************************/
  listeners: {
   'readmore.tap': (e)=> { // This will epically fail
      if(!this.condensed) { // Remove the condensed class if we're removing the flag
        this.$.details.classList.remove('condensed');
      }
   }
  },
  ...
}
```

In this example, the function will not fire, and from exploring the innards of Polymer, it is clear why they've
avoided it. Due to their complex chain of method firing, the **this** context in this function will not point to your
 instanced component, making it near impossible to get any use out of it. The only way to make use of the listeners
 object is to target your methods by name.

Another variation of the new ES6 method usage is featured in this code sample as well for us. Because we are
targeting a key on the listners object which is a string *readmore.tap*, we can't do the simple method declaration
```'readmore.tap'(e) {...}```. However the use of arrow functions comes to the rescue! ```(e)=> {...}``` is the
equivalent of typing ```function(e) {...}```. It's a subtle shift that helps us save in typing the function keyword
unnecessarily.

**Alternative Syntax**

We can forgo the ```listeners``` object on your component and target the method directly, similar to syntax you would
find in the likes of AngularJS. Some may prefer this syntax over the use of the listeners object. The only draw back
from this style is not having a clearly defined list of all the events that take place on your component, but cases
no hindrance.

```html
<!-- No need for a listern event when explicitly defining an on-tap method -->
<button on-tap="readMore" id="readmore">Read More</button>
```

---

## [Continuing Reading Part 4](https://github.com/hence-io/hence-component-framework/tree/master/blogs/working-with-polymer-and-es6/4-enhancing-functionality)
