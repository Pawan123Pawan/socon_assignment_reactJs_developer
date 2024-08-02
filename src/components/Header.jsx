// Header.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setItems, setAllItems } from "../store/itemsSlice";
import { fetchItems } from "../features/api";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const allItems = useSelector((state) => state.items.allItems);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItems();
      dispatch(setAllItems(items));
    };
    getItems();
  }, [dispatch]);

  function handleChangeInput(e) {
    const value = e.target.value;
    setSearchInput(value);
    const filteredItems = allItems.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(setItems(filteredItems));
  }

  return (
    <header className="bg-gray-800 p-4 text-white sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={()=>navigate("/")}>Item Finder</h1>
        <nav>
          <ul className="flex space-x-4 flex-wrap justify-end items-center">
            <li>
              <Link to="/" className="hover:underline">
                All Items
              </Link>
            </li>
            <li>
              <Link to="/favourites" className="hover:underline">
                Favourites
              </Link>
            </li>
            <li>
              <input
                type="text"
                value={searchInput}
                onChange={handleChangeInput}
                placeholder="Search items..."
                className="text-black p-1 rounded"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
