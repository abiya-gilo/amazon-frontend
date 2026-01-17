import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { useData } from "../dataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex }) {
  const [, dispatch] = useData(); // ✅ correct destructure if provider returns [state, dispatch]

  const addToBasket = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...product },
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      {flex ? (
        <img
          src={product.image}
          alt={product.title}
          className={classes.card__image}
        />
      ) : (
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className={classes.card__image}
          />
        </Link>
      )}

      <div className={classes.card__details}>
        <h3 className={classes.card__title}>{product.title}</h3>
        {flex && (
          <p className={classes.card__description}>{product.description}</p>
        )}
        <div className={classes.rating}>
          <Rating
            name="interactive-rating"
            value={product.rating?.rate || 0}
            precision={0.5}
            readOnly={!flex}
            sx={{
              "& .MuiRating-iconFilled": { color: "#FFD814" },
              "& .MuiRating-iconHover": { color: "#F7CA00" },
              "& .MuiRating-iconEmpty": { color: "#ccc" },
            }}
          />
          <small className={classes.rating__count}>
            {product.rating?.count}
          </small>
        </div>
        <CurrencyFormat amount={product.price} />
        <button className={classes.button} onClick={addToBasket}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
