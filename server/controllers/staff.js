import { User } from "../models/user.js";
import { Table } from "../models/table.js";
import { Drink } from "../models/drink.js";
import { Bill } from "../models/bill.js";
import { OK, NOT_FOUND, FAIL } from "../shared/response.js";
import mongoose from "mongoose";

const getStaffScreen = async (req, res) => {
  return res.json({
    message: "This is the staff screen!",
  });
};

const returnAllTables = async (req, res) => {
  const allTables = await Table.find();

  return res.json(OK([allTables]));
};

const chooseTable = async (req, res) => {
  const bodyData = req.body;
  const tableId = bodyData.tableId;

  const table = await Table.findOne({ _id: tableId });

  return res.json(OK([table]));
};

const changeTableStatus = async (req, res) => {
  const bodyData = req.body;
  const tableId = bodyData.tableId;

  const oldTable = await Table.findOne({ _id: tableId });

  const updateTable = await Table.findOneAndUpdate(
    { _id: tableId },
    { isActive: !oldTable.isActive },
    { new: true }
  );

  const isActive = updateTable.isActive;

  return res.json({ isActive });
};

const printInvoice = async (req, res) => {
  const bodyData = req.body;
  const tableId = bodyData.tableId;
  const time = bodyData.time;
  const staffId = bodyData.staffId;

  const table = await Table.findOne({ _id: tableId });
  const payList = table.orderList;

  var bill = 0;

  const payDetails = await Promise.all(
    payList.map((drink) => {
      const drinkId = drink.drink;
      return Drink.findOne({ _id: drinkId });
    })
  );

  var index = 0;

  payList.forEach((drink) => {
    const drinkQuantity = drink.quantity;
    const drinkPrice = payDetails[index].price;
    bill = bill + drinkQuantity * drinkPrice;
    index = index + 1;
  });

  const newBill = new Bill({
    table: tableId,
    time: time,
    total: bill,
    staff: staffId,
  });
  newBill.save();

  const resetTable = await Table.findOneAndUpdate(
    { _id: tableId },
    { isActive: !table.isActive, orderList: [] },
    { new: true }
  );

  const staff = await User.findOne({ _id: staffId });
  const staffName = staff.name;
  const result = { payList, staffName, billDetails: newBill };
  return res.json(OK([result]));
};

const showTableOrderList = async (req, res) => {
  const bodyData = req.body;
  const tableId = bodyData.tableId;

  const table = await Table.findOne({ _id: tableId });

  const orderList = table.orderList;

  return res.json(OK([orderList]));
};

const updateTableOrderList = async (req, res) => {
  const bodyData = req.body;
  const tableId = bodyData.tableId;
  const newOrderList = bodyData.newOrderList;

  const updateTable = await Table.findOneAndUpdate(
    { _id: tableId },
    { orderList: newOrderList },
    { new: true }
  );

  const orderList = updateTable.orderList;

  return res.json(OK([orderList]));
};

const getDrinkInfo = async (req, res) => {
  const bodyData = req.body;
  const drinkId = bodyData.drinkId;

  const drink = await Drink.findOne({ _id: drinkId });

  return res.json(OK([drink]));
};

const createNewDrink = async (req, res) => {
  const bodyData = req.body;
  const { name, type, price, imgUrl, available } = bodyData;
  const newDrink = new Drink({
    name: name,
    type: type,
    price: price,
    imgUrl: imgUrl,
    available: available,
  });

  try {
    const result = await Drink.create(newDrink);
    return res.json(OK([result]));
  } catch (e) {
    return res.json(FAIL([]));
  }
};

const getAllDrinks = async (req, res) => {
  const allDrinks = await Drink.find();

  return res.json(OK([allDrinks]));
};

const createNewTable = async (req, res) => {
  const bodyData = req.body;
  const tableNumber = bodyData.tableNumber;

  const newTable = new Table({
    isActive: false,
    isChosen: false,
    orderList: [],
    number: tableNumber,
  });
  newTable.save();

  return res.json(OK([newTable]));
};

const addDrinkToTable = async (req, res, next) => {
  const bodyData = req.body;
  let { tableId, drinkId, count } = bodyData;
  // console.log(count);

  try {
    const findTable = await Table.findById(tableId);
  //   console.log(findTable);
    if (!findTable) {
      return res.json(NOT_FOUND([]));
    }
    const findDrink = await Drink.findById(drinkId);
  //   console.log(findDrink);
    if (!findDrink) {
      return res.json(NOT_FOUND([]));
    }

    let drinkIndex = findTable.orderList.findIndex((p) => p.drinkId == drinkId);
  //   console.log(drinkIndex);

    if (drinkIndex > -1) {
      let drink = findTable.orderList[drinkIndex];
      drink.quantity += count;
      findTable.orderList[drinkIndex] = drink;
      findTable.save();
    } else {
      const newDrink = Object({
        name: findDrink.name,
        type: findDrink.type,
        price: findDrink.price,
        imgUrl: findDrink.imgUrl,
        available: findDrink.available,
        quantity: count,
      });
      // console.log(typeof(newDrink));
      // console.log(findTable.orderList);
      // console.log(findDrink);
      const test = { name: 'hello'};
      findTable.orderList.push(test);
      // const updateTable = await Table.findOneAndUpdate(
      //     { _id: tableId },
      //     { $push: { orderList: newDrink } }
      // );
      console.log('afadsf');
      findTable.save();
    }
    return res.json(OK([findTable]));
  } catch (e) {
    return res.json(FAIL([]));
  }
};

export {
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
};
