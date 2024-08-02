import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/api";
import { Link } from "react-router-dom";
import { setItems } from "../store/itemsSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import Loader from "./Loader";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const favourites = useSelector((state) => state.favourites.favourites);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItems();
      dispatch(setItems(items));
      if (items) {
        setLoading(false);
      }
    };
    getItems();
  }, [dispatch]);

  const handleAddFavourite = (item) => {
    if (
      favourites.length < 5 &&
      !favourites.some((fav) => fav.id === item.id)
    ) {
      dispatch(addFavourite(item));
    }
  };

  const handleRemoveFavourite = (id) => {
    dispatch(removeFavourite(id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-red-300 w-full">
          <h1 className="text-center text-3xl font-bold uppercase py-5 text-gray-800">
            All Items
          </h1>
          <div className="flex flex-wrap justify-center">
            {currentItems?.map((product) => (
              <div
                key={product.id}
                className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white relative"
              >
                <Link to={`/item/${product.id}`} className="block px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.title}</div>
                  <p className="text-gray-700 text-base mb-2">
                    {product.description}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Category: {product.category}
                  </p>
                  <p className="text-gray-900 font-bold text-lg mb-2">
                    ${product.price}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    Discount: {product.discountPercentage}%
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Rating: {product.rating}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Stock: {product.stock}
                  </p>
                </Link>
                {favourites.some((fav) => fav.id === product.id) ? (
                  <button
                    onClick={() => {
                      handleRemoveFavourite(product.id);
                      console.log("remove_favourite");
                    }}
                    className="absolute top-2 text-4xl right-2 text-red-500"
                  >
                    ★
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleAddFavourite(product);
                      console.log("add_favourite");
                    }}
                    className="absolute top-2 right-2 text-gray-300 text-4xl"
                  >
                    ☆
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-5">
            {Array.from(
              { length: Math.ceil(items.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 border rounded-full ${
                    currentPage === i + 1
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
          {items.length === 0 && (
            <p className="text-gray-600 py-12 text-2xl text-center capitalize">
              No items found
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ItemList;
