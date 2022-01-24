import "./OrderModal.css";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "@mui/material/Modal";
import ItemsList from "./ItemsList/ItemsList";
import OrderedItemList from "./OrderedItemList/OrderedItemList";
import { useContext } from "react";
import { ModalContext } from "../../ModalContext";

const OrderModal = ({ isOpen }) => {
  // const order = useContext(OrderContext)
  const modal = useContext(ModalContext);
  const handleClose = () => {
    modal.closeModal();
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <button className="modal-close-btn" onClick={handleClose}>
          <ClearIcon></ClearIcon>
        </button>
        <div className="modal-body">
          <ItemsList />
          <OrderedItemList />
        </div>
      </Box>
    </Modal>
  );
};

export default OrderModal;
