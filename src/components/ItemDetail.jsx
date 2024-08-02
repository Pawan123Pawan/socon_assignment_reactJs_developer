import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addFavourite } from "../store/favouritesSlice.js";
import { fetchItemById } from "../features/api.js";
import Loader from "./Loader.jsx";

const ItemDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState({});

  useEffect(() => {
    const getItem = async () => {
      const item = await fetchItemById(id);
      setItem(item);
    };
    getItem();
  }, []);

  const handleAddFavourite = () => {
    dispatch(addFavourite(item));
    navigate("/");
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold py-6 uppercase text-gray-800 text-center">
        Item Details
      </h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl p-4">
        <div className="md:flex">
          {!item ? (
            <div className="flex justify-center items-center w-full">
              <Loader />
            </div>
          ) : (
            <>
              <div className="md:shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-[250px]"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                  {item.category}
                </div>
                <h1 className="block mt-1 text-2xl leading-tight font-medium text-black">
                  {item.title}
                </h1>
                <p className="mt-2 text-gray-500">{item.description}</p>
                <p className="mt-2 text-gray-500">Price: ${item.price}</p>
                <p className="mt-2 text-gray-500">
                  Discount: {item.discountPercentage}%
                </p>
                <p className="mt-2 text-gray-500">Rating: {item.rating}</p>
                <p className="mt-2 text-gray-500">Stock: {item.stock}</p>
                <button
                  onClick={handleAddFavourite}
                  className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:opacity-90 transition-all delay-200 ease-in-out"
                >
                  Add to Favourites
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
