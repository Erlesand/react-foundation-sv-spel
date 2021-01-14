# Exercise: todo
In this exercise you will implement a "todo" React application, comprised of components with styling for displaying a form (to create new todos) and rendering a list of todos and their details.

## Part 1: Styling
In this part of the exercise, a couple of components are to be created with proper styling applied.

### TodoForm
The _TodoForm_ component (in `TodoForm.jsx`) allows the user to enter a title and create a new todo.

__Inline styling__ is to be used, with the following CSS properties:

```javascript
{
  width: '100%',
  backgroundColor: '#FFF',
  padding: 16,
  fontSize: 24,
  fontStyle: 'italic',
  fontWeight: 300,
  border: 'none'
}
```

The component's markup:

```html
<form>
  <input
    placeholder="What do you need to do?"
  />
</form>
```

Apply the styling to the _input_ element.

(Render _TodoForm_ in _App_)

### Todo
The _Todo_ component (in `Todo.jsx`) renders a todo object.

> See `todos.json` for the structure of a todo object.

Import styled-components:

```javascript
import styled from 'styled-components';
```

_Todo_ accepts the following (required) props:

*   id: `number`
*   title: `string`
*   completed: `boolean`

It returns the following markup:

```html
<Container>
  <div>
    <Checkbox
      id={id}
      type="checkbox"
    />
    <Label
      htmlFor={id}
    >
      Todo title goes here...
    </Label>
  </div>
  <Button />
</Container>
```

Notice that the markup seemingly contains other React components; these are so-called _styled components_, which render just as regular components.

Create the following styled components:

*   _Container_: a `div` styled with:

    ```css
    padding: 8px 16px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    ```

*   _Checkbox_: an `input` styled with:

    ```css
    appearance: none;
    ```

*   _Label_: a `label` styled with:

    ```css
    background-position: center left;
    background-repeat: no-repeat;
    padding: 15px 15px 15px 60px;
    display: inline-block;
    ```

    In addition, add the CSS properties below; their values should adapt based on the _completed_ prop passed to _Todo_:

    ```css
    background-image: url(/* checked if completed, otherwise unchecked; see Todo.snippet */);
    color: /* '#d9d9d9' if completed, otherwise 'initial' */;
    text-decoration: /* 'line-through' if completed, otherwise 'none' */
    ```

    > See [Adapting based on props](https://styled-components.com/docs/basics#adapting-based-on-props) in the styled-components documentation.

*   _Button_: a `button` styled with:

    ```css
    font-size: 22px;
    color: #cc9a9a;
    
    &:after {
      content: /* value is a character passed as a prop, e.g. 'x'. */;
    }
    
    &:hover {
      color: #af5b5e;
    }
    ```

Render the list of todos (_initialTodos_ in _App_) below _TodoForm_. 

### Optional
Currently, all properties on a todo object are passed as props to the _Todo_ component. This includes _userId_, which is unused in _Todo_.

Transform the _initialTodos_ list by removing the _userId_ property for each todo object.

## Part 2: Component state and event handling
In this part, the list of todos will be managed as component state (in _App_).

### Creating a todo
In order to create a todo with a user-entered title, the following must be implemented:

*   Add a _handleSubmit_ event handler that is bound to the _onSubmit_ form event.

    > To prevent default form submission, call _event.preventDefault()_; ensure that the event handler is properly typed.

    Verify that the event handler is called upon submitting the form (pressing Enter) by logging the title.

*   In order to support rerendering the application when a new todo is added, the list of todos must be managed as component state in _App_.

    Ensure that todos are now handled by the _useState_ hook (passing the _initialTodos_ list as initial state).

    > Note: You'll now render the list of todos managed by _useState_ instead of the previous _initialTodos_!

*   Create a callback function _createTodo_ in the _App_ component:

    ```javascript
    const createTodo = (title: string) => {
      // update the state (= list of todos) by adding a new todo object - with the passed title - first in the list:
      const newTodo = {
        id: Date.now(),
        completed: false,
        title
      };

      // Important! You must update the state (= list of todos) as a completely NEW list of todos, containing the new todo object as the first element followed by all the elements of the current todos list.
    }
    ```

    > See [this link](https://www.samanthaming.com/tidbits/14-combine-multiple-arrays-using-spread/) for how to create/combine arrays using the spread operator.
    
    Pass the _createTodo_ callback function as a prop to _TodoForm_.

    Invoke the callback function upon form submission; verify that a new todo is added (first) to the list.

### Deleting a todo

*   Create a callback function _deleteTodo_ in the _App_ component.

    This function should receive a todo id, remove the corresponding todo object and update the list of todos.

    > Hint: Use [array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to remove a todo and get a new list as a result.

*   Pass this function as a prop to the _Todo_ component.

*   Bind an event handler function to the _onClick_ event on the _Button_ styled component; the event handler should 
    invoke the _deleteTodo_ callback with the todo's id.

### Update a todo

*   Create a callback function _updateTodo_ in the _App_ component.

    This function should receive a todo id, locate the corresponding todo object and flip the _completed_ flag of that todo.

    > Hint: Use [array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to iterate over the todos, update the target todo object and get a new list as a result.

*   Pass this function as a prop to the _Todo_ component.

*   Bind an event handler function to the _onClick_ event on the _Checkbox_ styled component; the event handler 
    should invoke the _updateTodo_ callback with the todo's id.

### Optional: Set document title
As the user interacts with the list of todos, the number of uncompleted todos should be displayed in the document title.

It's best practice to perform this type of calculation - a typical _side effect_ - in a _useEffect_ callback, meaning the code will run __after__ the component has rendered . See the first code snippet [explaining effects in the React docs](https://reactjs.org/docs/hooks-overview.html#effect-hook) for how the hook _useEffect_ may be utilized.

Add a call to _useEffect_ to the _App_ component that updates _document.title_ with the number of uncompleted todos.

> Hint: Try to use _array.reduce()_ to calculate the uncompleted count!

## Part 3: Data fetching
Instead of embedding static (mock) todos as part of the application bundle, the _App_ component should fetch todos from a remote API.

*   To differentiate between whether todos have been fetched or not, change the _useState_ hook call for the todos to:

    ```javascript
    const [todos, setTodos] = useState(null)
    ```

    __Question__: Why is this better than simply having an empty array as the initial value?

*   Update the _useEffect_ for setting the document title - if no todos are yet available, display `Todos (N/A)`.

*   If the todos have not yet been fetched, _only_ display `Loading todos...` as the render output.

*   Finally, add the following code to a _useEffect_ callback:

    ```javascript
    const fetchTodos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos = await response.json();

      setTodos(todos.map(
        ({ userId, ...todo }) => todo
      ));
    };

    fetchTodos();
    ```

    __Important__: Ensure that the todos are only fetched once!

### Optional: Fetching status 
Fetching data typically involves a number of stages:

*   `idle`

    Data fetching has not yet begun.

*   `loading`

    Data fetching has begun.

*   `success`

    Data was fetched successfully.

*   `failure`

    An error occurred while fetching data.

    __Hint__: To simulate a fetching error, change the API URL to something invalid.

A better way to differentiate whether or not data has been fetched, as well as to handle any errors, is to introduce state in the component which tracks these data fetching stages.

*   Add a state variable (suitably called _status_) with _useState_ that is parameterized by the new type. Let the initial state be a status of `idle`.

*   Add error handling to the data fetching code as follows:

    ```javascript
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos = await response.json();

      setTodos(todos.map(
        ({ userId, ...todo }) => todo
      ));
    } catch (error) {
      
    }
    ```

    In the code above, update the status where appropriate to reflect the various data fetching stages.

*   If the status is `idle`, return null as the render output.

*   If the status is `loading`, return `Loading todos...` as the render output.

*   If the status is `failure`, return `An error occurred while loading todos!` as the render output.

*   Add a "Refetch" button to allow the user to refetch / refresh the list of todos. 

    __Hints__

    *   In order for data to be refetched, the _useEffect_ must add the status state variable as a dependency. 

        Inside the _useEffect_ callback, first check if the status is `idle`; if it's not, return immediately.

    *   Set the status to the appropriate value when clicking the "Refetch" button.

