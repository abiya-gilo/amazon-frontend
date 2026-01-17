import React, { useEffect, useState, useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import classes from "./Results.module.css";
import { productUrl } from "../../Api/EndPoints";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

/* Helper function to clean descriptions */
function getCleanDescription(product) {
  // Special case: Lock and Love jacket
  if (
    product.title.includes(
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket"
    )
  ) {
    return "Stylish faux leather biker jacket with removable hood.";
  }

  // Truncate long descriptions
  return product.description.length > 120
    ? product.description.slice(0, 120) + "..."
    : product.description;
}

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.product__container}>
            {results?.map((product) => (
              <div key={product.id} className={classes.product__row}>
                {/* Product image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className={classes.product__image}
                />

                {/* Product info */}
                <div className={classes.product__info}>
                  <h3 className={classes.product__title}>{product.title}</h3>
                  {/* <p className={classes.product__desc}>
                    {getCleanDescription(product)}
                  </p> */}

                  {/* Rating + reviews + price */}
                  <div className={classes.product__stats}>
                    <span className={classes.product__rating}>⭐⭐⭐⭐☆</span>
                    <span className={classes.product__reviews}>
                      {product.rating?.count} reviews
                    </span>
                    <span className={classes.product__price}>
                      ${product.price}
                    </span>
                  </div>

                  {/* Add to Cart button pinned at bottom */}
                  <div className={classes.product__actions}>
                    <button
                      className={classes.product__button}
                      onClick={() =>
                        dispatch({
                          type: Type.ADD_TO_BASKET,
                          item: product,
                        })
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
