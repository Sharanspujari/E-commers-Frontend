import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductsList from "../features/product-list/ProductsList";

const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductsList />
      </Navbar>
    </div>
  );
};

export default Home;
