import React, { useEffect, useState, useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import classes from "./ProductDetail.module.css";
import { productUrl } from "../../Api/EndPoints";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductDetail() {
  const { productid } = useParams();
  const navigate = useNavigate();
  const [{}, dispatch] = useContext(DataContext);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${productUrl}/products/${productid}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [productid]);

  // ⭐ BUY NOW HANDLER
  const handleBuyNow = () => {
    // Clear basket first
    dispatch({
      type: Type.CLEAR_BASKET,
    });

    // Add ONLY this product
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...product, amount: 1 },
    });

    // Redirect to payment page
    navigate("/payments");
  };

  return (
    <LayOut>
      <div className={classes.detail__container}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.detail__content}>
            <ProductCard product={product} flex={true} />

            {/* ⭐ BUY NOW BUTTON */}
            <button className={classes.buyNowButton} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}
      </div>
    </LayOut>
  );
}

export default ProductDetail;
