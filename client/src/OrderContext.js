import { useState, createContext } from "react";
import axios from "axios";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [tableOrder, setTableOrder] = useState([]);
  const [tempOrder, setTempOrder] = useState([]);
  const [currentTableId, setCurrentTableId] = useState()


  const updateCurrentTableId = (id) => {
    setCurrentTableId(id)
  }

  const updateNewTable = (order) => {
    setTableOrder([...order]);
  };


  const copyToTempOrder = () => {
    setTempOrder([...tableOrder]);
  };

  const copyToTableOrder = (newOrderList) => {
    const data = {tableId: currentTableId, newOrderList: newOrderList}
    const getTables = async () => {
      await axios.post(
        "http://localhost:2000/staff/updateTableOrderList", data
      );
    };
    getTables();
    setTableOrder([...tempOrder]);
  };

  const addOrder = (item) => {
    let isNew = false;
    let tempTable = [...tempOrder];
    tempTable.forEach((element, index) => {
      if (element.name === item.name) {
        let temp_element = { ...tempTable[index] };
        temp_element.quantity += 1;
        tempTable[index] = temp_element;
        setTempOrder([...tempTable]);
        isNew = true;
      }
    });
    if (!isNew) {
      const newItem = { name: item.name, category: item.category, price: item.price, imgUrl:item.imgUrl, available:item.available, quantity: 1 };
      setTempOrder([...tempOrder, newItem]);
    }
  };

  const minusOrder = (item) => {
    let tempTable = tempOrder.slice();
    tempTable.forEach((element, index) => {
      if (element.name === item.name) {
        if (element.quantity !== 1) {
          let temp_element = { ...tempTable[index] };
          temp_element.quantity -= 1;
          tempTable[index] = temp_element;
          setTempOrder([...tempTable]);
        }
      }
    });
  };

  const removeOrder = (item) => {
    let tempTable = [...tempOrder];
    tempTable.forEach((element, index) => {
      if (element.name === item.name) {
        tempTable.splice(index, 1);
        setTempOrder([...tempTable]);
      }
    });
  };

  const updateStatus = () => {
    const data = {tableId: currentTableId}
    const changeStatus = async () => {
      await axios.post(
        "http://localhost:2000/staff/changeTableStatus", data
      );
    };
    changeStatus();
  }

  const value = {
    tableOrder,
    tempOrder,
    currentTableId,
    updateNewTable,
    addOrder,
    minusOrder,
    removeOrder,
    copyToTempOrder,
    copyToTableOrder,
    updateCurrentTableId,
    updateStatus
  };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
