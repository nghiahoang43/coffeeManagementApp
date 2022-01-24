import "./TablesSide.css";
import Table from "../Table/Table";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import { useState, useEffect } from "react";

const TablesSide = ({ onChangeTable, table }) => {
  const chooseTableHandler = (tableNumber) => {
    let tempTable = table;
    let number = 1;
    let status = true;
    tempTable.forEach((element) => {
      if (element.number === tableNumber) {
        element.isChosen = true;
        number = element.number;
        status = element.isActive;
      } else {
        element.isChosen = false;
      }
    });
    onChangeTable(tempTable, number, status);
  };

  return (
    <div className="table-side">
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={0} columnSpacing={0}>
          {table.map((element) => {
            return (
              <Grid key={"gridId" + element.number} item sm={6} md={3}>
                <Table
                  tableId={element._id}
                  tableNumber={element.number}
                  isActive={element.isActive}
                  chooseTable={chooseTableHandler}
                  isChosen={element.isChosen}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default TablesSide;
