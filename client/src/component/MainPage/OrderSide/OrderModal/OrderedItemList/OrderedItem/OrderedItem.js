import "./OrderedItem.css";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext } from "react";
import { OrderContext } from "../../../../../../OrderContext";
const OrderedItem = ({ name, price, quantity }) => {
  const order = useContext(OrderContext);

  const addItemHandler = (event) => {
    const item = { name: name, price: price };
    order.addOrder(item);
  };
  const minusItemHandler = (event) => {
    const item = { name: name, price: price };
    order.minusOrder(item);
  };

  const removeItemHandler = (event) => {
    const item = { name: name, price: price };
    order.removeOrder(item);
  };
  return (
    <div className="ord-item">
      <div className="ord-item-name">{name}</div>
      <div className="ord-item-body">
        <div className="ord-item-price">${price}</div>
        <div className="ord-item-count-modify">
          <ArrowDropDownIcon
            className="count-down"
            onClick={minusItemHandler}
          />
          <div className="ord-item-count">{quantity}</div>

          <ArrowDropUpIcon className="count-up" onClick={addItemHandler} />
        </div>
      </div>
      <div className="ord-delete-btn">
        <ClearIcon onClick={removeItemHandler} />
      </div>
    </div>
  );
};

export default OrderedItem;
