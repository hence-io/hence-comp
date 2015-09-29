# Working with Polymer and ES6 - Enhancing Functionality

In Part 4, we are now ready to start expanding and featurizing our new component to make it a practical component we
could see ourselves using in a site or web application.

## Digging in Deeper

We've created our component, flush out how it gets created, and given it some basic properties and behaviour. From hear
we can start to delve into how we can build a handy reusable element.

Also well, there will be a focus on how to start taking all these concepts we've been covering, and truly making the
best use out of them. There's so much to leverage that you really need to spend the time think of the right components
to build for the right reasons.

> With great power comes great responsibility. - Ben Parker

In this section we will be looking into the following advanced aspects:

- [Embedded Content](#embedded-content)
- [Child Components](#child-components)
- [Styling and Overrides](#stylying-and-overrides)

### Embedded Content

Content is an important part of ui, and at its core is the reason why we even have websites and apps to begin with. In
one form or another, we are presenting content to our users in a variety of ways, so it's only natural that being able
to control content is a core aspect of the Polymer template.

In the previous post, we've seen how we can start to use our components properties to sent content through to the
template, and now we're going to look at a specialized tag, ```content```. The content tag is a built in helper to
allow you to pass in a yield, and output it in a desirable location. This allows you to make use of the components in a
much more declarative way.

Let's update our components template to show where we want this t9 happen.

```html
<template>
  ...
  <p id="details" class="condensed">
    <b>Details:</b> <span>{{details}}</span>

    <!-- Display the nonspecific raw content provided -->
    <content></content>
  </p>
  ...
</template>
```
With the ```<content></content>``` tag residing where we expect to output the card's details, it allows us to make more
varied use of how that section of our component will display. Back in our ```index.html``` we can add some varied
ways to leverage the new content section:

```html
<!-- parameter details -->
<my-card details="Some details..."></my-card>

<!-- raw content, text -->
<my-card>
  Some details...
</my-card>

<!-- raw content, html -->
<my-card>
  <div>
    Details <b>and</b> <i>html</i>!
  </div>
</my-card>
```

Running your component again, you will see this is a pretty powerful tool, and it's usage doesn't just stop there. Being
able to pass in a blob of content to render as needed is great, but what about when there may be different areas I want
unique pieces of content to end up? Polymer has got you covered already!

Lets extend out template to support a header in which will leverage the ```content``` tag again with some
specifics on what should show up where from the yield.

```html
<template>
  <!-- Display the content header if provided, denoted by the select attribute -->
  <content select="header"></content>
  ...
</template>
```

Now lets update our component we're previewing to access this new control.

```html
<my-card>
  <header>
    Header notice
  </header>
  Some details...
  <footer>
    Footer notice
  </footer>
</my-card>
```

Run you component and watch what happens! The content didn't all get displayed as details, and the new content we added
shows up in the header. Anything now targeted by a content tag in your component will flow through to the nonspecific
```<content></content>```.

**Where ```content``` starts to fail... and how to avoid issues!***

Now lets try and also put a footer selector in our element too.

```html
<template>
  ...
  <!-- Display the content footer if provided, denoted by the select attribute  -->
  <content select="footer"></content>
</template>
```

Now lets update our component to include the footer.

```html
<my-card>
  <header>
    Header notice
  </header>
  Some details...
  <footer>
    Footer notice
  </footer>
</my-card>
```

If we preview our component after adding the footer, initially it looks like things turned out ok. The footer is
displayed at the end of the details block. If you take a peek however at the rendered page source in your browser's
inspector, you'll see that the footer ended up being pulled into the details section, and wasn't actually placed in
the footer tag on our component. By why is that? We wanted it to show at the end, and likely style/handle it
differently. This here highlights a subtle got'cha on how this is handled by Polymer.

Before you use a nonspecific content tag ```<content></content>``` in your component, you can use as many content
select tags to put targeted content wherever you want, but once Polymer sees that open tag, anything left that you've
 provided in the yield will forcibly be pulled straight into that section on the component.

But, wait a minute... what's the point of using this tag at all then? Don't fret! This doesn't make the feature less
useful, but rather requires you to be mindful in how you plan on leveraging it.

Some best practice around using the content tag are:

1. On simple components, only need the nonspecific content tag.

```html
<template>
  <div class="details">
    My html:
    <content></content>
  </div>
</template>
```

2. Or, on more complex components, add select attributes to every single use of the content tag to ensure that no html
shows up in unexpected ways on your component. Never use the nonspecific tag in this case. This will mean html not
within the targets will get ignored, but you can be confident it won't lead your component astray and cause abnormal
behaviour.

```html
<template>
  <content select="header"></content>
  <div class="details">
    My html:
    <content select=".details"></content>
  </div>
  <content select="footer"></content>
</template>
```

Let's just finish updating our sample to follow the 2nd method, and target the details content tag:

Now lets try and also put a footer selector in our element too.

```html
<template>
  ...
  <p id="details" class="condensed">
    <b>Details:</b> <span>{{details}}</span>

    <!-- Display the nonspecific raw content provided -->
    <content select=".details"></content>
  </p>
  ...
</template>
```

And our sample to render our component:

```html
<my-card>
  <header>
    Header notice
  </header>
  <div class="details">
    Some details...
  </div>
  <footer>
    Footer notice
  </footer>
</my-card>
```

**Versatility**
This shows you just how versatile the content yield can be, allowing you to expose specific areas
of your component to render content as you desire right along side your properties as well.

Using the placement of the details property and the content tag, and now we have provided many ways in which we can
make use of placing content into our component.

1. Through code when dynamically constructing a new component.
2. As an attribute on the component tag itself.
3. From adding content inside of the component, optionally targeted by classes/tags.

**Exemplifying DRY - Don't Repeat Yourself'**

Getting the hang of these concept is really beneficial to designing any new component, because with very little
complexity, you've made the component very flexible in its implementation, giving whoever consumes this component more
power. Keeping things DRY is a pillar of building reusable components, going back to the concept of compartmentalization
as a whole. The more thought you put into the varied ways even a simple component could be leveraged that would benefit
others, you'll be saving time down the road in extending its functionality later on.

### Child Components

We've explored some ways to provide content to our components using the content tag. Now, we will start to explore
another way to help vary and extend the content inside components by adding other components inside our sample!

The wonderful concept of web components on the whole is that they can be used interchangeably with each other off the
 bat. You don't need to jump through any hoops to start using them together. All that is required is to include
 another component dependency (through Bower), and to import that component into ours to start working with it.

Lets start off with a simple one to work with.  Since we have a button on our component to handle some read more/less
 toggle of the details which needs to be implemented, why don't we use a nicer button for it?  Looking over the
 [Polymer Component library](https://elements.polymer-project.org/browse), there's a clear choice on which component
 we can leverage for this: [Paper Button](https://elements.polymer-project.org/elements/paper-button)

To add this to our project, we can install the dependency with bower typing the following:

```bash
bower i --save PolymerElements/paper-button
```

And, at the top of our component file we need to include the import tag:

```html
<link rel="import" href="bower_components/paper-button/paper-button.html">
```

Now lets go and update our read more button to make it snazy!

```html
<template>
  ...
  <!-- If condensed is set on the component, display this button. -->
  <template is="dom-if" if="{{condensed}}">
    <!-- lets raise the button to make it stand out more -->
    <paper-button raised on-tap="displayAllDetails" id="readmore">Read More</paper-button>
  </template>
  ...
</template>
```

Setting the button as a paper-button element, and with the boolean flag raised, preview our updated element to see
the result. It's just that easy!

The key thing to note is that the paper-button element is well documented to help
ensure you can get right in an make use of it. While some components get more complex, following Polymers example
isn't important to keep in mind actively documenting our component (as the examples have been), so we can provide
others who will end up consuming our component to know how to get in an use it just as easiliy.

So what's next? Well, we do have a read more button waiting to be useful, so why don't we look at implementing a
collapsible control around the details and tie in a toggle to the button. Sounds fun! Once again Polymer has a handy
basic component which will suit our needs to achieve this functionality:
[iron-collapse](https://elements.polymer-project.org/elements/iron-collapse)

To add this to our project, we can install the dependency with bower typing the following:

```bash
bower i --save PolymerElements/iron-collapse
```

And, at the top of our component file we need to include the import tag:

```html
<link rel="import" href="bower_components/iron-collapse/iron-collapse.html">
```

Now lets go and update our read more button to make it snazy!

```html
<template>
  ...
  <!-- manage the details display via a collapse control -->
  <iron-collapse id="collapse">
    <p id="details" class="condensed">
      <b>Details:</b> <span>{{details}}</span>

      <!-- Display the nonspecific raw content provided -->
      <content select=".details"></content>
    </p>
  </iron-collapse>
  ...
</template>
```

**When are enough components enough already?**

Components within components within components... It seems like this could quickly and easily turn into a rabbits hole,
spiralling you all the way to Wonderland. Well, not really, but the concept of web components can become intoxicating,
and you stop making progress to only build components for the sake of building them, a similarity to writing to many
tests.

This goes back to needing to be responsible with what you're doing. The key thing comes down to, **drum roll*, PLANING!
You've probably heard it a hundred times, and likely a hundred more if it hasn't sunk in yet

### Styling and Overrides
