import "./OrderSide.css";
import Item from "./Item/Item";
import { useContext } from "react";
import OrderModal from "./OrderModal/OrderModal";
import { OrderContext } from "../../../OrderContext";
import { ModalContext } from "../ModalContext";

const OrderSide = ({ tableNumber, status, updateStatus }) => {

  
  const order = useContext(OrderContext);
  const modal = useContext(ModalContext);

  let total = 0
  order.tableOrder.forEach(element => {
    total = total + (element.price * element.quantity)
  });
  
  const statusClickHandler = () => {
    order.updateStatus()
    updateStatus();
  };
  if (tableNumber === null) {
    return( <div className="initial-order-side"><div className="initial-announce">Please Choose A Table To Start</div></div>)
  }
  return (
    <div className="order-side">
      <OrderModal isOpen={modal.open}></OrderModal>
      <div className="order-header">
        <div className="order-num">Table: {tableNumber}</div>
        {status ? (
          <button className="add-button" onClick={modal.handleOpen}>
            Add Order
          </button>
        ) : (
          <></>
        )}
        <div
          className={status ? "order-active" : "order-inactive"}
          onClick={statusClickHandler}
        >
          {status ? "In Use" : "Available"}
        </div>
      </div>
      {status ? (
        <div>
          <div className="order-main">
            <div className="order-list-header">
              <div className="order-list-header-name">Name</div>
              <div className="order-list-header-price">Price</div>
              <div className="order-list-header-quantity">Quantity</div>
              <div className="order-list-header-total">Total</div>
            </div>
            <div className="order-list">
              {order.tableOrder.map((element, index) => {
                return (
                  <Item
                    key={index}
                    name={element.name}
                    category={element.category}
                    price={element.price}
                    quantity={element.quantity}
                  ></Item>
                );
              })}
            </div>
            <div className="total-price-container">
              <div className="total-label">Total</div>
              <div className="total-price">${total}</div>
              {/* Total <span className="total-price">${total}</span> */}
            </div>
          </div>
          <div className="order-footer">
            <div className="print-invoice">Print Invoice</div>
          </div>
        </div>
      ) : (
        <div className="status-announce">This table is not in use</div>
      )}
    </div>
  );
};

export default OrderSide;
