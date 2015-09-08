# Working with Polymer and ES6 - Introduction

In Part 1, we will be exploring what Polymer and ES6 are all about, and why working with them can be beneficial.

## Polymer
Google's [Polymer Project](https://www.polymer-project.org/1.0/) is a wonderful library helping to propel the adoption
of web components into your projects today! While the browsers work to support these natively, Polymer serves as tool to
help you build and create custom elements, but it is much more than a polyfill library.

> The Polymer library is designed to make it easier and faster for developers to create great, reusable components for
the modern web.

### Componentization

Working with Polymer, and getting the most out of it, first and foremost requires a healthy shift in the development
methodology. Gone are the days of unmaintainable monolithic applications and sites, an uncombatable level of
technical debt, and struggling to keep your tests and coverage manageable. Componentization as a methodology, a core
concept of Polymer, helps to isolate and specialize just about any of your front end/UX concerns, so that as your
project grows, there is always a level of sanity and focus kept in line.

As developers, we know full well what it's like to join a new established project, or return to one you worked on
months ago, and start to tiptoe through the mine field again until you're proficient.

### Learn Polymer

Here are some great resources of what Polymer offers if you're unfamiliar:
- [Polymer Project](https://www.polymer-project.org/1.0/) - The official Polymer library web site with a ton of
documentation to help get you going and versed in the particulars.
- [Polymer's Developer Guide](https://www.polymer-project.org/1.0/docs/devguide/feature-overview.html) - A full dev
guide on the ins and outs of Polymer, giving you great insight on what it is capable of and how to leverage it's
features.
- [Polymer Catalog](https://elements.polymer-project.org/) - An official collection of Polymer components to be
leveraged, and serve as practical examples of components in action.
- [WebComponents.org](http://webcomponents.org/) - A site dedicated to information, articles, and more on all things
web component related.

## ECMAScript 6 (ES6)
ES6, the next evolution of the Javascript language. If you haven't heard of it yet, clearly you've been living under a
rock, and it's fortunate you stumbled upon this article! It brings many new and improved concepts to JS world and
empowers developers to write cleaner native code that packs a punch.

From adding true class support, to improved variable scoping, native module support... there's no lack of amazing
and essential improvements to the language we **all** know and love (...well, most of us!). These are just a
few of the goodies waiting for you to make use of, but before you throw caution to the wind, there are some things to
 consider when taking on the task of diving into ES6.

### Transpiler

At present, browsers are still working to fully support ES6 natively, and while most modern browsers are getting very
 close to that point, older dated browsers (yup, as you guessed it, IE) aren't up to snuff with handling ES6s
 improvements. Fear not! While unlike a library like Polymer which can use simple polyfills to add support for wider
 cross browser support, ES6 must instead leverage a transpiler.  These tools allow you and your team to write all of
 the juice ES6 code you want, and it will covert (just about all of it) into fully functional ES5 code, which
 browsers are pleasantly happy to digest for you.

 [Babel JS](https://babeljs.io/) & [Traceur](https://github.com/google/traceur-compiler) are the most prevalent ES6
  transpilers out there in the community.

**Babel JS** https://babeljs.io/

Babel is the transpiler of choice used in this article. As well it is seemingly being the de facto transpiler of choice.

> By default, Babel ships with a set of ES2015 syntax transformers. These allow you to use new syntax, right now
without waiting for browser support.

Babel is very versatile whether you're leveraging it from the command line and from within your build and testing
tools, with detailed examples of how to accomplish this on their website.  Their site on the whole is actually quite
awesome, also providing you a full comprehensive summary of ES6 concepts, to experimental ES7 support (hell yes!),
and a sandbox for you to test code in.

### Native ES6 Support

**Will native ES6 browser support to do away with Transpilers?**

When native support in browsers has standardized, and we can throw away those dusty old ones, the theory is that these
 transpilers will go away. At the time of writing this, the modern browsers are getting quite close to full support.
 [ES6 Compatibility Support](http://kangax.github.io/compat-table/es6/)

While it's a possibility these could be phased out, from many tools like these which started by letting us use future
concepts sooner, they continue to push the edge of development given how slow language specification takes to change.
 Transpilers are a buffer for writing native code today for the future, and once you've had a taste, you will understand
 why having them stick around isn't a bad thing whatsoever!

**Where can I use ES6 native already?**

For browser support, again review the up to date [ES6 Compatibility Support](http://kangax.github.io/compat-table/es6/).
For support on the tooling and server side of things, there're a few options you may not yet know about.

- Gulp - The popular stream build system added Babel in their
[v3.9 release](https://github.com/gulpjs/gulp/blob/master/CHANGELOG.md)
  - To make use of it, simply rename your gulp file to ```gulpfile.babel.js```
  - While it make work off the bat, you may see some errors while it processes. It's recommended you install the
  bable-core to assist Gulp. ```npm i -D babel bable-core```
- NodeJs/IO.js - While IO.js began as a fork of Node with developers wanting keep improvements going without
hindrance, the have since reconciled with Node, and the official Node repo now serves the latest IO.js version. The
beautiful thing about this, **IO.js runs ES6 natively already!**

### Learn ES6

Here are some great resources of what ES6 brings to the plate for you to peruse if you're unfamiliar:
- [Babel JS's ES2015 Guide](http://babeljs.io/docs/learn-es2015/#ecmascript-6-features) - A solid API reference to the
features and strait forward code samples for each.
- [Maciej Rzepiński's' ES2015 Guides on Medium](https://medium.com/ecmascript-2015) - A detailed look at the different
topics in ES6, with code samples and comparisons to matching ES5 code.
- [Learn ES2015](http://learnharmony.org/#) - An interactive guide to learning and testing out the concepts.

**What's this ES2015 I keep seeing? I thought we were talking about ES6 here? O.o**

ES6 was officially agreed upon as a standard as of June 2015. The
[ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/6.0/) improvements were dubbed
ES2015 in lieu of this. Before ES6 it had been referenced as Harmony, but ES6 is still the widely adopted name, as
regardless of the extra labels, it is still ECMAScript 6 in the end.

## Package Managers

Package managers are an essential part of the build and development process, allowing teams of developers to work
together and add in or update project dependencies with ease (more often than not). Two essential dependencies
managers are used through out this article, allowing you to get up and running right away so you can follow along.

### Bower

Bower is a front end focused package manager. The packages found on this are targeted at code you would find
on the client side, dealing largely with ui/ux, and many other plugins and utilities. In addition, this is where
presently a large amount of Polymer components reside, include Polymer itself and the official components featured on
 the component catalog mentioned above.

 We will be using bower to include Polymer and supporting components.

### NPM

NPM is NodeJS's Package Manager. As long as you have Node installed, NPM comes along with it already for you to
leverage. While at times packages hosted on NPM can tend to be considered 'Node focused', more often than not the
code is native javascript that works just fine on the client side as well as server side. In fact, because of using
ES6, which has native module importing, you largely can use any NPM code package you want to help build your front
end components! This is especially helpful in building specific and isolated code.

### Leveraging Bower & NPM packages together in ES6
 A clear example of the power in ES6 is comparing the [Lodash](https://github.com/lodash/lodash) NPM package file vs.
  it's Bower package file. NPM allows you to specific a main file, which is leveraged when you ```import _ from
  'lodash';```, and additional to include specific sections or even singular methods from lodash with paths, such as
  ```import _clone from 'lodash/object/clone';``` giving you a specific lodash method to work with. Conversely, the
  Bower package only allows you to include the whole package, and if loaded in to your html by a script tag, with no
  way to isolate what code you actually need from it on the front end. This is one of the awesome benefits of
  leveraging ES6!

Need to include a slider or gallery plugin as well to your component? No problem, install it through bower and import
 just the same ```import d3 from 'd3';```, and you're golden! Mix and match packages as you deem fit to get the most
 benefit out of your tools.

---

## [Continuing Reading Part 2](https://github.com/hence-io/hence-component-framework/tree/master/blogs/working-with-polymer-and-es6/2-getting-started)
