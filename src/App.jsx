import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";
import FavouriteItem from "./components/FavouriteItem";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouriteItem />} />
        <Route path="/item/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
