import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavourite } from "../store/favouritesSlice";
import Loader from "./Loader";

const FavouriteItem = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);

  const handleRemoveFavourite = (id) => {
    dispatch(removeFavourite(id));
  };

  return (
    <>
      {favourites.length < 0 ? (
        <Loader />
      ) : (
        <div className="w-full">
          <h1 className="text-3xl text-gray-800 text-center uppercase font-bold py-5">
            Favourite Items
          </h1>
          <div className="flex flex-wrap justify-center">
            {favourites.length > 0 ? (
              favourites.map((product) => (
                <div
                  key={product.id}
                  className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white relative"
                >
                  <Link to={`/item/${product.id}`} className="block px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      {product.title}
                    </div>
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
                  <button
                    onClick={() => handleRemoveFavourite(product.id)}
                    className="absolute top-2 right-2 text-red-500 text-4xl"
                  >
                    ★
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 py-12 text-2xl">
                No favourite items.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavouriteItem;
