import React from "react";
import classes from "./OrderCard.module.css";
import ProductCard from "../../Components/Product/ProductCard";

function OrderCard({ order }) {
  const date = new Date(order.created * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={classes.order}>
      <div className={classes.order__header}>
        <div>
          <p className={classes.label}>ORDER PLACED</p>
          <p>{date}</p>
        </div>

        <div>
          <p className={classes.label}>TOTAL</p>
          <p>${(order.amount / 100).toFixed(2)}</p>
        </div>

        <div>
          <p className={classes.label}>ORDER ID</p>
          <p className={classes.orderId}>{order.id}</p>
        </div>
      </div>

      <div className={classes.deliveryStatus}>
        <p>Delivered</p>
        <span className={classes.greenDot}></span>
      </div>

      <div className={classes.order__items}>
        {order.basket.map((item) => (
          <div key={item.id} className={classes.orderItemRow}>
            <ProductCard product={item} flex={true} hideButton />

            <button className={classes.buyAgainButton}>Buy it again</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;
