# Working with Polymer and ES6 - Enhancing Functionality

In Part 4, we are now ready to start expanding and featurizing our new component to make it a practical component we
could see ourselves using in a site or web application.

- [Digging in Deeper](#digging-in-deeper)
  - [Embedded Content](#embedded-content)
    - [The Golden Rules of ```<content>```](#the-golden-rules-of-content)
    - [Versatility](#versatility)
  - [Child Components](#child-components)
    - [Isolating Child Components](#isolating-child-components)
  - [Styling and CSS Variables](#styling-and-css-variables)
    - [CSS Variables](#css-variables)
  - [Componentization Pro Tips](#componentization-pro-tips)

---

## Digging in Deeper

We've created our component, flush out how it gets created, and given it some basic properties and behaviour. From hear
we can start to delve into how we can build a handy reusable element.

Also well, there will be a focus on how to start taking all these concepts we've been covering, and truly making the
best use out of them. There's so much to leverage that you really need to spend the time think of the right components
to build for the right reasons.

> With great power comes great responsibility. - Ben Parker

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
<my-card title="My Card Sample" details="Some details..."></my-card>

<!-- raw content, text -->
<my-card title="My Card Sample">
  Some details...
</my-card>

<!-- raw content, html -->
<my-card title="My Card Sample">
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
<my-card title="My Card Sample">
  <header>
    Header notice
  </header>
  Some details...
</my-card>
```

Run you component and watch what happens! The content didn't all get displayed as details, and the new content we added
shows up in the header. Anything now targeted by a content tag in your component will flow through to the nonspecific
content.

**Where ```content``` starts to fail... and how to avoid issues!**

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
<my-card title="My Card Sample">
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

#### The Golden Rules of ```<content>```

1. On simple components only needing the nonspecific content tag, use it!
  ```html
  <template>
    <div class="details">
      My html:
      <content></content>
    </div>
  </template>
  ```

2. On more complex components, add select attributes to every single use of the content tag to ensure that no html
shows up in unexpected ways on your component. **Never use the nonspecific tag in this case!** This will mean html
padded not matching a target will get ignored, but you can be confident it won't lead your component astray and
cause abnormal
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

And don't forget to update our sample to render our component with the details class:

```html
<my-card title="My Card Sample">
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

#### Versatility

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

---

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
    <paper-button raised on-tap="readMore" id="readmore">Read More</paper-button>
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

**So what's next?**

Well, we do have a read more button waiting to be useful, so why don't we look at implementing a
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

Now that we have a collapse control in place on the details, it's time to update our readMore on-tap function tied
into our button.

```js
const config = {
  ...
  readMore(e) {
    // Display the details, and will hide the button
    this.$.collapse.show();

    // Ensure to remove the condensed flag and class on the details
    this.condensed = false;
    this.displayAllDetails(e);
  },
  ...
};
```

With this in place, now lets take a look at our component again. The details will be hidden initially, and display
the button, and once pressed, the details will scroll into view while hiding the button.

#### Isolating Child Components

**When are enough components enough already?**

Components within components within components... It seems like this could quickly and easily turn into a rabbits hole,
spiralling you all the way to Wonderland. Well, not really, but the concept of web components can become intoxicating,
and you stop making progress to only build components for the sake of building them, a similarity to writing to many
tests.

This goes back to needing to be responsible with what you're doing. The key thing comes down to, *drum roll*,
**PLANING!** You've probably heard it a hundred times, and likely a hundred more if it hasn't sunk in yet. ;)

There is a point where having to many components inside each other becomes a disadvantage when you're trying to cram
them into a single component. The core concept of compartmentalization requires use to think twice before doing this.
 Lets look at an example to highlight when things could go astray.

Below is an advanced sample, but we will just be looking at it to draw a conclusion on how to avoid over doing child
components.

```html
<dom-module is="list-view">
  <template>
    <template is="dom-if" if="{{loaded}}">
      <template is="dom-repeat" items="{{list}}" as="entry">
        <h3>{{entry.title}}</h3>
        <template is="dom-if" if="{{entry.details}}">
          <p><b>Details:</b></p>

          <p>{{entry.details}}</p>
        </template>
        <template is="dom-if" if="{{!entry.details}}">
          Secret sauce.
        </template>
        <template is="dom-repeat" items="{{entry.flights}}" as="flight">
          <div class="flight-card">
            <div class="title">
              <span>{{flight.departureCode}}</span>
              <iron-icon class="flights" icon="device:airplanemode-active"></iron-icon>
              <span>{{flight.arrivalCode}}</span>
            </div>
            <div class="description">
              <header class="review fullWidth">
                <div class="price">
                  $<span>{{flight.price}}</span>
                </div>
                <div class="duration">
                  Flight duration<br>
                  <b>{{flight.duration}}</b>
                </div>
              </header>
              <div class="clear"></div>
              <div class="checkIn fullWidth">
                Check In
                <paper-fab class="checkInButton" icon="icons:check"></paper-fab>
              </div>
              <div class="details">
                <hence-html class="flightNumber" content="{{flight.flightNumber}}"></hence-html>
                <div class="confirmation">
                  <span>{{flight.confirmationDate}}</span>,
                  Confirmation #<span>{{flight.confirmationNumber}}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </template>
    <template is="dom-if" if="{{!loaded}}">
      Your content is loading...
    </template>
  </template>
  <script>Polymer({is:'list-view',properties:{list:Array,loaded:Boolean}});</script>
</dom-module>
```

Here we have a list component, which will display some entries. Each entry has some logic on what to display, and
then has a list of it's on for flights. Each flight then has quite a complex display of content, which in turn has more
child components...

So how do we turn this around to make is more effective and esacpe the rabbits hole? Encapsulation works best when
starting from the inside out, and the ```<div class="flight-card">``` is looking pretty obvious for us to pull out
into a component of it's own.  Breaking that out into it's own component could look something like this:

```html
<dom-module is="list-view">
  <template>
    <template is="dom-if" if="{{loaded}}">
      <template is="dom-repeat" items="{{list}}" as="entry">
        <h3>{{entry.title}}</h3>
        <template is="dom-if" if="{{entry.details}}">
          <p><b>Details:</b></p>

          <p>{{entry.details}}</p>
        </template>
        <template is="dom-if" if="{{!entry.details}}">
          Secret sauce.
        </template>
        <template is="dom-repeat" items="{{entry.flights}}" as="flight">
          <!-- Now we're targeting a dedicated flight-card compoent -->
          <flight-card flight="{{flight}}"></flight-card>
        </template>
      </template>
    </template>
    <template is="dom-if" if="{{!loaded}}">
      Your content is loading...
    </template>
  </template>
  <script>Polymer({is:'list-view',properties:{list:Array,loaded:Boolean}});</script>
</dom-module>

<dom-module is="flight-card">
  <tempalte>
    <div class="title">
      <span>{{flight.departureCode}}</span>
      <iron-icon class="flights" icon="device:airplanemode-active"></iron-icon>
      <span>{{flight.arrivalCode}}</span>
    </div>
    <div class="description">
      <header class="review fullWidth">
        <div class="price">
          $<span>{{flight.price}}</span>
        </div>
        <div class="duration">
          Flight duration<br>
          <b>{{flight.duration}}</b>
        </div>
      </header>
      <div class="clear"></div>
      <div class="checkIn fullWidth">
        Check In
        <paper-fab class="checkInButton" icon="icons:check"></paper-fab>
      </div>
      <div class="details">
        <hence-html class="flightNumber" content="{{flight.flightNumber}}"></hence-html>
        <div class="confirmation">
          <span>{{flight.confirmationDate}}</span>,
          Confirmation #<span>{{flight.confirmationNumber}}</span>
        </div>
      </div>
    </div>
  </tempalte>
  <script>Polymer({is:'flight-card',properties:{flight:Object}});</script>
</dom-module>
```

Taking it one step further, whenever possible it's best to encapsulate anything complex inside a dom-repeater, so
lets take out the entry display and warp that into it's own component too!

```html
<dom-module is="list-view">
  <template>
    <template is="dom-if" if="{{loaded}}">
      <template is="dom-repeat" items="{{list}}" as="entry">
        <!-- Now we're targeting a dedicated list-entry compoent -->
        <list-entry entry={{entry}}></list-entry>
      </template>
    </template>
    <template is="dom-if" if="{{!loaded}}">
      Your content is loading...
    </template>
  </template>
  <script>Polymer({is:'list-view',properties:{list:Array,loaded:Boolean}});</script>
</dom-module>

<dom-module is="list-entry">
  <template>
    <h3>{{entry.title}}</h3>
    <template is="dom-if" if="{{entry.details}}">
      <p><b>Details:</b></p>

      <p>{{entry.details}}</p>
    </template>
    <template is="dom-if" if="{{!entry.details}}">
      Secret sauce.
    </template>
    <template is="dom-repeat" items="{{entry.flights}}" as="flight">
      <flight-card flight="{{flight}}"></flight-card>
    </template>
  </template>
  <script>Polymer({is:'list-entry',properties:{entry:Object}});</script>
</dom-module>

<dom-module is="flight-card">
  <tempalte>
    <div class="title">
      <span>{{flight.departureCode}}</span>
      <iron-icon class="flights" icon="device:airplanemode-active"></iron-icon>
      <span>{{flight.arrivalCode}}</span>
    </div>
    <div class="description">
      <header class="review fullWidth">
        <div class="price">
          $<span>{{flight.price}}</span>
        </div>
        <div class="duration">
          Flight duration<br>
          <b>{{flight.duration}}</b>
        </div>
      </header>
      <div class="clear"></div>
      <div class="checkIn fullWidth">
        Check In
        <paper-fab class="checkInButton" icon="icons:check"></paper-fab>
      </div>
      <div class="details">
        <hence-html class="flightNumber" content="{{flight.flightNumber}}"></hence-html>
        <div class="confirmation">
          <span>{{flight.confirmationDate}}</span>,
          Confirmation #<span>{{flight.confirmationNumber}}</span>
        </div>
      </div>
    </div>
  </tempalte>
  <script>Polymer({is:'flight-card',properties:{flight:Object}});</script>
</dom-module>
```

Keeping concerns isolated to their own component helps ensure your efforts don't go to waste! The more
you get into the habit of keeping things small, the more uses you might find for components you're encapsulating, and
help you stay DRY. When this kind of consideration becomes second nature to you, you'll be zipping through your
component architecting in no time.

---

### Styling and CSS Variables

Now that're we getting to flesh out how the component displays content and functions, it's time we go back to address
the style and layout of our component. A big thing to get your head wrapped around with styles in web components is
that they are all isolated and cannot bleed out into your global style sheet! This means the the ```#title``` in our
component will never have or affect the styles of a ```#title``` in a different component, each one is in charge of
it's own styling.

If you haven't already reviewed [Polymers Styling Guide](https://www.polymer-project.org/1.0/docs/devguide/styling.html)
, you should take a glimpse at it before continuing.

Lets start adding some styles and see how they work inside our component.

```css
/* A specialized selector which applies base styles to your component. */
:host {
  border: 1px solid #eee;
  color: #00f;
  display: inline-block;
  padding: 1em;
  margin: 1em;
}

#title {
  border-bottom: 1px solid #eee;
  font-size: 2em;
  line-height: 1;
}

#details {
  font-style: italic;
  padding: 0.5em 0;
}

#details b, #details .bold {
  color: #f00;
  font-weight: 700;
}

/* Custom content passed through may have it's own styling, negate the italics here */
#details ::content .details {
  font-style: normal;
  font-weight: normal;
}

/* We can still style child components as we would expect */
paper-button {
  margin-bottom: 1em;
}

/* A conditional class to reduce the amount of copy visible with an ellipsis for overflow. */
.condensed {
  width: 100%;
  max-height: 50px;
  text-overflow: ellipsis;
}
```

As well, let us update our sample in the ```index.html``` to show case how the styling is being effected.

```html
<my-card title="My Card Sample">
  <div class="details">
    Some details...<br>
    <b>To be boldly go</b><br>
    <span class="bold">Can I get a bold too?</span><br>
    <span style="font-weight: bold">I'm formally bold...</span>
  </div>
</my-card>
```

Fire up your component, click the read more button, and lets review what's taking place!

1. To start off, the ```:host``` tag is the root style for your component. If we didn't have isolated CSS, we've be
typing ```my-card { ...``` but this is already managed by the host tag for us.  Any styles we apply to this tag will
handle the overall wrapper that is applied to our components when rendered on page.

2. Moving down to the ```#details``` styles, we see that some base styles are being applied to this selector, which is a
 P tag, setting the text to italic. The style after that is something entirely new however. ```#details ::content
 .details```.

    We updated our component to use the ```<content select=".details"></content>``` inside the ```p#details```, and if we
    wanted to isolate styles on html passed in through the content tag, Polymer's got you covered with the
    ```::content``` selector. This special one lets us dive into and access things inside any of our content tags used
    throughout our component, giving use very exact and precise control over how we want it display.  In this case, we're
    telling our component any raw content passed in, we'll negate the italics effect on with
    ```#details ::content .details``` setting our font-style to normal.

3. Something you will notice is with the styling being applied to the ```#details b, #details .bold``` selector setting
   the colour red. This is occurring inside ```p#details```` seen on the 'Details:' label, however the b tag within the
   raw content we've added does not come out red. This highlights a key difference in how the embedded content gets
   styled from the outer container.

     Anything that you apply to the main contain ```#details``` will be applied to the elements inside your content
     yield, yet any tag specific style you do to selectors inside as with ```#details b``` will never take effect
     inside, nor does the ```#details .bold``` apply any styling to the ```span.bold``` inside our content tag.

     As well, with the ```#details ::content .details``` selector attempting to set the font-weight to normal, is
     overridden by the b tag, and the span which is explicitly styled as bold, which is how we expect the styles
     should work.

#### CSS Variables

Styles defined within our component are isolated, and since they won't affect other elements on your page, neither
will you be able to just override any of it's styles at will.  For the first time, you have direct control on exactly
 what styles your want to expose for others to override and customize when leveraging these components. Let that
 truly sink in for a second... not only can you design your component to have a solid and consistent design and
 layout, you can define what makes sense to be overridden.

We've all been there before. We craft some crazy cool element, have it working well, and then someone comes along
and starts 'improving it' to the point where it no longer resembles the elegant sculpture you worked on. If you had
the power to give them only what they needed, good by headache and regressions!

So how do we tap into this wonderful feature? Instead of Polymer working to create this feature from scratch, they've
taken a step forward in leveraging the variable & mixin updates poses to the css3/4 specification in hopes this will
become another native aspect of your web components as time goes on.

Lets take a look at how we can start to leverage these:

```css
/* A specialized selector which applies base styles to your component. */
:host {
  /* Variables -- Specify our components custom variables to expose, while providing our defaults */
  --my-card-border-color: #eee;
  --my-card-color: #00f;
  --my-card-margin: 1em;

  /* Base Styles */
  /* Keep the border size and style fixed, but flexible colouring */
  border: 1px solid var(--my-card-border-color);
  /* Open up the copy colour */
  color: var(--my-card-color);
  display: inline-block;
  padding: 1em;
  /* While we want a default, we shouldn't restrict it to manipulation */
  margin: var(--my-card-margin);
}

#title {
  /* Make sure this colour matches our custom set variable */
  border-bottom: 1px solid var(--my-card-border-color);
  font-size: 2em;
  line-height: 1;
}

...

/* While we've defined some defaults, allow the users to completely override this one section. */
#details, #details ::content .details {
  @apply(--my-card-details);
}

```

Run your component again, and as expected, nothing has changed. While we added some new variables to manage how our
component can get styled, running out component will only leverage the defaults for us until we wish to make use of it.

So lets play around with the variables. In order to do this, we need to place a style component onto our ```index
.html```. Lets add the following style tag to the end of our ```<head>``` tag.

```html
<head>
  ...
  <!-- Styling overrides -->
  <style is="custom-style">
   /* Some override variables to give our component some flare*/
   my-card {
     --my-card-border-color: #f00;

     --my-card-details: {
       font-size: 1.5em;
       padding: 2em;
     }
   }
  </style>
</head>
```

If you preview your component now, you will see that the overrides have taken effect giving us the alterations we
anticipated. If you were using your ```my-card``` component from within another component, the same style syntax
above could be used within another components isolated style block, allowing you to now segment how your component
looks and customize it across any number of other components it will be utilized inside.


This is really powerful stuff, and it helps to drive home again what can be accomplished with thorough planning and
forethought into how and where you plan on using the components you start to build. When you start to recognize that
every element on your page might be reusable, the flood gate opens and the sky is your limit.

### Componentization Pro Tips

- Components are everywhere, and you have the power to chose how specific and granular they become.
- Considering the flexibility you will need in the functionality, layout, and styling gives you the chance to create
 open versatile components that do one thing well.
- If a component is getting to large, it's likely you can split it out into it's own child component(s) to
handle its various concerns.
- Think clearly on what aspects of the component you want exposed, from variables and functions accessible outside,
to style variables open to be overridden.