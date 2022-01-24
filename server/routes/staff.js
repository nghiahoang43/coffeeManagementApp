import express from "express";
import {
  getStaffScreen,
  returnAllTables,
  chooseTable,
  changeTableStatus,
  printInvoice,
  showTableOrderList,
  updateTableOrderList,
  getDrinkInfo,
  createNewDrink,
  getAllDrinks,
  createNewTable,
  addDrinkToTable
} from "../controllers/staff.js";
const router = express.Router();

router.get("/", getStaffScreen);

router.get("/returnAllTables", returnAllTables);

router.post("/chooseTable", chooseTable);

router.post("/changeTableStatus", changeTableStatus);

router.post("/printInvoice", printInvoice);

router.post("/showTableOrderList", showTableOrderList);

router.post("/updateTableOrderList", updateTableOrderList);

router.post("/getDrinkInfo", getDrinkInfo);

router.post("/createNewDrink", createNewDrink);

router.post("/getAllDrinks", getAllDrinks);

router.post("/createNewTable", createNewTable);

router.post("/addDrinkToTable", addDrinkToTable)

export default router;
