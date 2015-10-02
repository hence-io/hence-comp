# Working with Polymer and ES6 - Getting Started

In Part 2, we will be getting a sample project set up for you to begin using Polymer and ES6 together, rendering your
 first web component.

- [Getting Started](#getting-started)
  - [Package Files](#package-files)
  - [Dependencies](#dependencies)
- [Creating your First Component](#creating-your-first-component)
  - [Compiling your ES6 Code](#compiling-your-es6-code)
  - [Serving your Component](#serving-your-component)

---

#### Prerequisites

To make sure you're able to work with the samples below, please ensure you obtain these essential prerequisites first.

- [Download and install NodeJS](https://nodejs.org/download/)
- Once Node is installed:
  - Install Bower: ```npm i -g bower```
- And... you're done! See, wasn't that easy?

## Getting Started

It's time to start exploring what we can actually do with Polymer and ES6 together!

Starting off with a fresh folder, we will begin by creating our new sample project.

```bash
mkdir my-card && cd my-card
```

### Package Files

Having installed the [prerequisites](#prerequisites) from above, next we'll initialize an NPM and Bower package so you
can start to add some dependencies too them.

```bash
npm init && bower init
```

These commands will ask you some attributes to fill in for each of the package files, but you can likely just spam
the Enter key for the sake of this sample.

**Why are we doing this?**

In order to actually make use of NPM & Bower, you need a ```package.json``` to add and manage your NPM dependencies,
and a ```bower.json``` to add and manager your bower dependencies. These init commands are designed to help generate
bare bone versions of these files for you. In addition, when you do start to fill these out in more detail, they are
what define a package you may be publishing to the network for others to consume later on.

### Dependencies

With your blank project ready to go, now we'll look at the essential dependencies you'll need to start
working.

From Bower we want to include the core Polymer package, required to support our custom component running in browser,
 and serves as the backbone of the code we will be writing.

```bash
bower i --save polymer
```

From NPM we want to include a few different packages, to support our ES6 usage and serve our sample component as we
work on it.

```bash
npm i -D babel browserify browser-sync
```

## Creating your First Component

To start with, we'll create a ```index.html``` which will be used to preview the component itself.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- This lib is installed by Polymer for you automatically, and used for browser polyfills. -->
  <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>

  <!-- Leveraging Polymer components require you to import your components to make use of them. -->
  <link rel="import" href="./my-card.html">
</head>
<body>
  <!-- Let's render our component! -->
  <my-card></my-card>
</body>
</html>
```

Some key things seen in this example:

- We are including a polyfill to ensure our component can be better supported
- Our component file we will be creating is being imported using an HTML5 spec method, desigend to allow the
```link``` tag to import html files as needed. This is also how components import other components for consumption.
- New new component we'll be creating is being instansiated by ```<my-card></my-card>```.

If you were to open this file in your web browser right now, you don't get to see much since we don't have our
component created yet, Let's do that now! Add a ```my-card.html```

```html
<!-- First, we must always import Polymers core, so that our component will be definable. -->
<link rel="import" href="bower_components/polymer/polymer.html">

<!-- The dom-module tells Polymer what isolated html, styles, and JS applied to your given component. -->
<dom-module id="my-card">
  <!-- Styles here are isolated to the scope of this component alone, to help reduce global style cruft. -->
  <style>
    /* A specialized selector which applies base styles to your component. */
    :host {
      color: #0000FF;
    }
  </style>
  <!-- Define the actual output of your component on the DOM, what is displays and allows users' to interact with. -->
  <template>
    <p>
      Web Components Rock!
    </p>
  </template>
  <!-- Include our ES6 generated script file to define our component. -->
  <script src="my-card.js"></script>
</dom-module>
```

Lastly, we still start off with a simplified component definition to get things started in ```my-card.es6.js```.

```javascript
'use strict'; // Some browsers still require this

// Match this to your component tag name, which must contain a [prefix]-[name]
const is = 'my-card';

const config = {
  is // In ES6, setting a key equal to a matching name variable can be shorten
};

// Define the MyCard component for Polymer, which will automatically register it on the DOM for us after.
const MyCard = Polymer(config);

// Expose some helpful parts of the component should they be leveraged by other components.
export {is, config};

// Expose our component so it can be used dynamically later.
export default MyCard;
```

### Compiling your ES6 Code

Now that we have the basic examples in place, it's time to compile your ES6 code to test our your component.

If you noticed in the ```my-card.html``` template file, the script bring referenced is ```my-card.js``` and not
the file we named our script as, ```my-card.es6.js```. This is because we need to use our transpile, Babel, to
convert it to ES5 code so that the browser can understand it. To do this, we need to run the Babel CLI to transpile
our code down for us to the file our component wants to access, and expose it by bundling it using Browserify.

Since we will need to recompile the file a few times while testing out component, it's helpful to add commonly used
commands you type to your ```package.json```. Opening it up, you will see an object inside there labeled
```scripts``` with a sample test command already created for you.

Add the following to the ```scripts``` object:

```json
scripts : {
  "compile": "./node_modules/.bin/babel my-card.es6.js -o .my-card.js && ./node_modules/.bin/browserify .my-card.js -o my-card.js && rm .my-card.js"
}
```

Now, from your console, you will be able to run it easily with:

```bash
npm run compile
```

**What is going on with this compile command?**

A couple of things are occurring to give use the working file we need for the browser.

1. Babel is transpiling the JS into a temporary ES5 compatible file. Because ES6 is module based, the code isn't
usable directly in the browser just yet. By default, Babel compiles code to be in the CommonJS format (used by Node).
2. Browserify is being used to bundle the module and expose it globally, to make it browser friendly. This creates
the needed file in which our ```my-card.html``` template is targeting.
3. The temporary file is being removed to clean things up.

### Serving your Component

With the files in place, and our ES6 code ready to be used in browser, lastly we need to have a way to serve our
component. We're not able to simply open the ```index.html``` and view it, so we need to simulate a web server. This
thankfully is of Nodes specialises.

One of the NPM packages you installed above, ```browser-sync``` is a hands off, simple and
straightforward web server to host your project to test it.

To make this convenient to start on the fly, open up your ```package.json``` again to expand the scripts object with:

```json
scripts : {
  "compile": "./node_modules/.bin/babel my-card.es6.js -o .my-card.js && ./node_modules/.bin/browserify .my-card.js -o my-card.js && rm .my-card.js",
  "start": "npm run compile && ./node_modules/.bin/browser-sync start --server --files 'index.html'"
}
```

From you console now you serve your component. BrowserSync will automatically open the browser to port is launches on:

```bash
npm start
```

You should now see the my-card component displaying with the default label 'Web Components Rock!' in blue if
everything went successful.

**What is going on with this compile command?**

With this command, we're doing two things to get your component displaying in browser for you.

1. Running our compile command first, to ensure you component has it's latest definition.
2. BrowserSync is started, creating a virtual server for us to display and test out our component as we would on a
site. It automatically serves the ```index.html``` as the homepage, and launches your browser to the right url so you
 don't have to do anything extra.

**That seems like a lot of work to get things up and running doesn't it? O.o**

Haven't you ever hear good things come to those who wait? Without understanding the basics of how each part of the
process works, you'd have a harder time trusting a tool that just does everything for you. And fear not, there're
some awesome ways to tackle these build tasks efficiently we'll be exploring soon!

---

## [Continuing Reading Part 3](https://github.com/hence-io/hence-component-framework/tree/master/blogs/working-with-polymer-and-es6/3-exporing-components)
