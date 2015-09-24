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

// insert code sample showing the content tag used near details.

With the ```<content></content>``` tag residing where we expect to output the card's details, it allows us to make more
varied use of how that section of our component will display.

// code sample showing a few dom uses of using varied yields passed into the component

Running your component again, you will see this is a pretty powerful tool, and it's usage doesn't just stop there. Being
able to pass in a blob of content to render as needed is great, but what about when there may be different areas I want
unique pieces of content to end up? Polymer has got you covered already!

Lets extend out template to support a footer in which will leverage the ```content``` tag again with some specifics on
what should show up there from the yield.

// show the updated template with a footer, and the content tag targeting a ".footer"

Now lets update our component we're previewing to access this new control.

// show updated dom with a div class footer in the yield

Run you component and watch what happens! The content didn't all get displayed as details, and the new content we added
shows up in the footer. Anything now targeted by a content tag in your component will flow through to the nonspecific
```<content></content>```. This shows you how versatile the content yield can be, allowing you to expose specific areas
of your component to render content as you desire right along side your properties as well.

Using the placement of the details property and the content tag, we have provided various ways in which we can make use
of placing content there.

1. Through code when dynamically constructing a new component.
2. As an attribute on the component tag itself.
3. From adding content inside of the component.

**Exemplifying DRY - Don't Repeat Yourself'**

Getting the hang of these concept is really beneficial to designing any new component, because with very little
complexity, you've made the component very flexible in its implementation, giving whoever consumes this component more
power. Keeping things DRY is a pillar of building reusable components, going back to the concept of compartmentalization
as a whole. The more thought you put into the varied ways even a simple component could be leveraged that would benefit
others, you'll be saving time down the road in extending its functionality later on.

### Child Components

**When are enough components enough already?**

Components within components within components... It seems like this could quickly and easily turn into a rabbits hole,
spiralling you all the way to Wonderland. Well, not really, but the concept of web components can become intoxicating,
and you stop making progress to only build components for the sake of building them, a similarity to writing to many
tests.

This goes back to needing to be responsible with what you're doing. The key thing comes down to, **drum roll*, PLANING!
You've probably heard it a hundred times, and likely a hundred more if it hasn't sunk in yet

### Styling and Overrides
