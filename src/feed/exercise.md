# Exercise: feed
In this exercise you will implement a number of component to render a simple "feed".

## Part 1 - Feed components
Implement the components listed below. 

*   `App.jsx`

    Should render a _CardList_ component, passing a list of items as a prop.

*   `CardList.jsx`

    Should accept a list of items as a prop and render corresponding _Card_ components.

    Ensure that the list is rendered without any warnings! [Read about rendering lists](https://reactjs.org/docs/lists-and-keys.html), up to the section named _Keys_.

    > Hint: Use the array index of an item as the value for the _key_ prop.

*   `Card.jsx`

    Return the following markup from the _Card_ component:

    ```html
    <div className="Card Card__medium">
      <p className="Card__title">{title.toUpperCase()}</p>
      <div><img className="Card__image" src={image} alt="" /></div>
    </div>
    ```

    This component renders the _title_ prop with uppercase letters.

    > Note that CSS classes are added to an element using the attribute _className_ instead of _class_.
    
*   OPTIONAL:

    Currently, a _Card_ is rendered with a default width of 350px (see the CSS class _Card__medium_ in `style.css`). 

    Make the _Card_ component more flexible by passing an additional _size_ prop with one of the following (string) values: __small__, __medium__ and __large__. 
    
    The component should __not__ contain logic for determining the actual width values, these are set in the CSS file. The component should combine the _size_ prop with the CSS classes contained in `style.css` in a generic fashion. 

    If the _size_ prop is not provided the component should default to __medium__. 

# Part 2 - Error handling
Create an _ErrorBoundary_ component with the following implementation, in a file named `ErrorBoundary.jsx`:

```javascript
import React from 'react';

export class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  render() {
    // TODO: Check if error has been caught, and render a fallback UI.

    return this.props.children;
  }
}
```

1. In _CardList_, wrap the rendering of items in an error boundary. Also add logic in the ErrorBoundary component for checking if an error has been caught and if so, render the following fallback UI:

```
<p>An error occurred while rendering the feed</p>
```

2. A React application should strive for maximum _fault tolerance_, i.e. to continue function even if errors occur. In our case, if rendering a single feed item throws an error, the other feed items should still be displayed, while rendering a fallback _Card_ for the faulty feed item.

Change _CardList_ to wrap each _Card_ in an error boundary instead. In the _ErrorBoundary_ component, render the following fallback UI:

```
<Card
  title="Oops, an error occurred"
  image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
/>
```

### Render Props
Currently, the _ErrorBoundary_ component contains logic for rendering specific fallbacks related to feed items and _Card_ components; this makes _ErrorBoundary_ less reusable in other contexts. 

In order to build a reusable _ErrorBoundary_ component, the logic for rendering a fallback UI must be __externalized__. Imagine if _ErrorBoundary_ were to be used as follows:

```
<ErrorBoundary>
  {(error) => {
    if (error) {
      return 'An error occurred while trying to render SomeComponent';
    }

    return <SomeComponent />
  }}
</ErrorBoundary>
```

Notice that we're passing a _function_ as the value for the `children` prop; this is an example of the [Render Props patterns](https://reactjs.org/docs/render-props.html) and helps us to share logic across components.

Change _ErrorBoundary_ to support the Render Props pattern, and change _CardList_ from step 2 accordingly.

### Optional
Currently, if a component throws an error while rendering, _ErrorBoundary_ does not allow for retrying rendering the component.

E.g., if a _CardList_ is passed a list of items which is `null` or `undefined`, it will throw an error. Handle this error as follows:

1. Add a (top-level) error boundary which wraps the rendering of _CardList_ in the _App_ component.

2. In _ErrorBoundary_, add logic for "resetting" the error state in a `retry` method. 

    > A method which updates (in this case, resets) the state in a class component typically looks as follows:
    >
    >    ```
    >    retry = () => {
    >      this.setState({
    >        // ...
    >      });
    >    }
    >    ```

3. Render a _Retry_ button (which calls the above `retry` method when clicked) if an error occurs while rendering _CardList_, to allow the user to retry rendering the feed if it fails.

In `App.jsx`, add the following function:

```
function getItems() {
  return Math.random() > 0.5 ? items : null;
}
```

and render _CardList_ as follows:

```
<CardList items={getItems()} />
```