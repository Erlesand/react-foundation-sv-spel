import CardList from "./CardList";
import { ErrorBoundary } from "./ErrorBoundary";
import "./style.css";

const items = [
  {
    title: "first item",
    image: "http://via.placeholder.com/350x150",
  },
  {
    // comment out the title property to generate an error while rendering a Card component.
    title: "second item",
    image: "http://via.placeholder.com/350x150",
  },
];

function getItems() {
  return Math.random() > 0.5 ? items : null;
}

export const App = () => {
  return (
    <ErrorBoundary>
      {(error, retry) =>
        error ? (
          <button onClick={retry}>Retry</button>
        ) : (
          <CardList items={getItems()} size="large" />
        )
      }
    </ErrorBoundary>
  );
};
