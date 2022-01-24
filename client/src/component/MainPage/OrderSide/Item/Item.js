import "./Item.css";
import Divider from "@mui/material/Divider";

const Item = ({ name, category, price, quantity }) => {
  return (
    <div className="item">
      <div className="item-name">{name}</div>
      <div className="item-body">
        <div className="item-price">${price}/each</div>
        <div className="item-quantity">{quantity}</div>
        <div className="item-total">${price * quantity}</div>
      </div>
      <Divider orientation="vertical" flexItem />
    </div>
  );
};

export default Item;
