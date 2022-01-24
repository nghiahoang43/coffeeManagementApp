import "./OrderedItemList.css";
import OrderedItem from "./OrderedItem/OrderedItem";
import { Divider } from "@mui/material";
import {useContext} from 'react'
import { OrderContext } from "../../../../../OrderContext";
import { ModalContext } from "../../../ModalContext";

const OrderedItemList = () => {
    const order = useContext(OrderContext)
    const modal = useContext(ModalContext)  
    const OrderHandler = () => {
      order.copyToTableOrder(order.tempOrder)
      modal.closeModal()
    }
  return (
    <div className="ordered-item-side">
      <div className="ordered-header">
        <div className="ordered-header-name">Name</div>
        <div className="ordered-header-price">Price</div>
        <div className="ordered-header-quantity">Quantity</div>
      </div>
      <Divider />
      <div className="ordered">
        {order.tempOrder.map((element, index) => (
          <div key={index}>
            <OrderedItem
              name={element.name}
              price={element.price}
              quantity={element.quantity}
            />
            <Divider></Divider>
          </div>
        ))}
      </div>
      <div className="ordered-btn-container">
        <button className="ordered-btn" onClick={OrderHandler}>Order</button>
      </div>
    </div>
  );
};

export default OrderedItemList;
