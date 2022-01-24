import "./MainPage.css";
import TablesSide from "./TablesSide/TablesSide";
import OrderSide from "./OrderSide/OrderSide";
import { useState, useEffect, useContext } from "react";
import { ModalProvider } from "./ModalContext";
import { OrderContext } from "../../OrderContext";
import axios from "axios";

const MainPage = () => {
  const [table, setTable] = useState([]);
  const order = useContext(OrderContext)
  useEffect(() => {
    const getTables = async () => {
      const response = await axios.get(
        "http://localhost:2000/staff/returnAllTables"
      );
      setTable(response.data.resources[0]);
    };
    getTables();
  }, []);

  const [currentTable, setCurrentTable] = useState({
    number: null,
    status: true,
  });

  const changeTableHandler = (tempTable, number, status) => {
    setTable([...tempTable]);
    table.forEach((element, index) => {
      if (element.number === number) {
        order.updateCurrentTableId(element._id)
      }
    })
    setCurrentTable({ ...currentTable, number: number, status: status });
  };

  const updateStatusHandler = () => {
    let tempStatus = currentTable.status;
    let tempTable = table;
    tempTable.forEach((element) => {
      if (element.number === currentTable.number) {
        element.isActive = !tempStatus;
      }
    });
    setCurrentTable({ ...currentTable, status: !tempStatus });
    setTable(tempTable);
  };

  return (
    <div className="main-bg">
      <TablesSide onChangeTable={changeTableHandler} table={table} />
      <ModalProvider>
        <OrderSide
          tableNumber={currentTable.number}
          status={currentTable.status}
          updateStatus={updateStatusHandler}
        />
      </ModalProvider>
    </div>
  );
};

export default MainPage;
