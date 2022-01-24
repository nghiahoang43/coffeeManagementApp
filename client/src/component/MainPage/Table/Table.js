import "./Table.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { OrderContext } from "../../../OrderContext";

const Table = ({ tableId, tableNumber, isActive, chooseTable, isChosen }) => {
  const order = useContext(OrderContext);
  const tableChosen = async () => {
    const table = {
      tableId: tableId,
    };
    const response = await axios.post(
      "http://localhost:2000/staff/chooseTable",
      table
    );
    chooseTable(response.data.resources[0].number);
    order.updateNewTable(response.data.resources[0].orderList);
  };
  const [chosen, setChosen] = useState(isChosen);
  useEffect(() => {
    setChosen(isChosen);
  }, [isChosen]);

  if (isActive) {
    return (
      <div
        className={chosen ? "table active chosen" : "table active"}
        onClick={tableChosen}
      >
        <div className="table-number">{tableNumber}</div>
        <div className="table-status">In Use</div>
      </div>
    );
  } else {
    return (
      <div
        className={chosen ? "table inactive chosen" : "table inactive"}
        onClick={tableChosen}
      >
        <div className="table-number">{tableNumber}</div>
        <div className="table-status">Available</div>
      </div>
    );
  }
};

export default Table;
