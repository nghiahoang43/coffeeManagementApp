import "./ItemOption.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { OrderContext } from "../../../../../../../OrderContext";

const ItemOption = ({ name, price, category, imgUrl, available }) => {
  const order = useContext(OrderContext);

  const addItemHandler = (event) => {
    const item = { name: name, price: price, category: category, imgUrl: imgUrl, available: available  };
    order.addOrder(item);
  };
  return (
    <div className="item-option">
      <div className="item-image">
        <img src={imgUrl} alt="coffee-img"></img>
      </div>
      <div className="option-info">
        <div className="option-name">{name}</div>
        <div className="option-type">{category}</div>
        <div className="option-price">${price}</div>
      </div>
      <button className="add-order-btn" onClick={addItemHandler}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default ItemOption;
