import "./Menu.css";
import ItemOption from "./ItemOption/ItemOption";

const Menu = ({ items }) => {
  return (
    <div className="menu">
      {items.map((item, index) => {
        const { name, price, category, imgUrl, available } = item;
        return (
          <ItemOption
            key={index}
            name={name}
            price={price}
            category={category}
            imgUrl={imgUrl}
            available={available}
          ></ItemOption>
        );
      })}
    </div>
  );
};

export default Menu;
