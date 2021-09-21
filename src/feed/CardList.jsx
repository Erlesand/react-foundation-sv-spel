import Card from "./Card";

const CardList = ({ items }) => {
  return items.map((item, index) => (
    <Card key={index} {...item} size="large" />
  ));
};

export default CardList;
