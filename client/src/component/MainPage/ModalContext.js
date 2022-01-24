import { useState, createContext, useContext } from "react";
import { OrderContext } from "../../OrderContext";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const order = useContext(OrderContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    order.copyToTempOrder();
  };

  const closeModal = () => {
    setOpen(false);
  };

  const value = { open, handleOpen, closeModal };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
