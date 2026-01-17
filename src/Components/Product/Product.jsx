import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader"; //  make sure this path is correct


function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //  fixed syntax

  useEffect(() => {
    setIsLoading(true); // start loading
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); //  stop loading
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); //  stop loading even if error
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product__container}>
          {products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
