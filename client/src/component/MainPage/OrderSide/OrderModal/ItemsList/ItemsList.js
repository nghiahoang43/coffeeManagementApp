import "./ItemsList.css";
import SearchBar from "./SearchBar/SearchBar";
import Categories from "./Categories/Categories";
import { useState, useEffect } from "react";
import Menu from "./Menu/Menu";
import axios from "axios";

const ItemsList = () => {
  const [orderList, setOrderList] = useState([])
  

  const categoryList = ["All", ...new Set(orderList.map((item) => item.category))];

  const [activeCategory, setActiveCategory] = useState("All");
  const [menu, setMenu] = useState(orderList);

  useEffect(() => {
    const getTables = async () => {
      const response = await axios.post(
        "http://localhost:2000/staff/getAllDrinks"
      );
      setOrderList(response.data.resources[0]);
      setMenu(response.data.resources[0])
    };
    getTables();
  }, []);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setMenu(orderList);
      return;
    }
    const newOrderList = orderList.filter((order) => order.category === category);
    setMenu(newOrderList);
  };

  const filterOrders = (menu, query) => {
    if (!query) {
      return menu;
    }

    return menu.filter((order) => {
      const orderName = order.name.toLowerCase();

      return orderName.includes(query);
    });
  };
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredMenu = filterOrders(menu, searchQuery);

  return (
    <div className="items-side">
      <Categories
        categories={categoryList}
        activeCategory={activeCategory}
        filterItems={filterItems}
      ></Categories>
      <div className="search-bar">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <Menu items={filteredMenu}></Menu>
    </div>
  );
};

export default ItemsList;
