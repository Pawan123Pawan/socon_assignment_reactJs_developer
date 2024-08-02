import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[50vh] ">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-s-4 border-gray-800 border-solid"></div>
    </div>
  );
};

export default Loader;
