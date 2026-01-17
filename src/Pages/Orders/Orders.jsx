import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import OrderCard from "../Orders/OrderCard";
import { useLocation } from "react-router-dom";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  const successMsg = location.state?.msg;

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Layout>
      <div className={classes.orders__container}>
        <h2>Your Orders</h2>

        {successMsg && <p className={classes.success}>{successMsg}</p>}

        {orders.length === 0 ? (
          <p className={classes.empty}>You have no orders yet.</p>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </Layout>
  );
}

export default Orders;
