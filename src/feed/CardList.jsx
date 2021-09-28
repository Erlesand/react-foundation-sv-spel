import Card from "./Card";
import { ErrorBoundary } from "./ErrorBoundary";

const CardList = ({ items }) => {
  return items.map((item, index) => (
    <ErrorBoundary key={index}>
      {(error) =>
        error ? (
          <Card
            title="Oops, an error occurred"
            image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
          />
        ) : (
          <Card key={index} {...item} size="large" />
        )
      }
    </ErrorBoundary>
  ));
};

export default CardList;
