import React, { useContext, useEffect, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import ClipLoader from "react-spinners/ClipLoader";
import { axiosInstance } from "../../Api/axios";

import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      setClientSecret(response.data.clientSecret);
    };

    if (basket.length > 0) getClientSecret();
  }, [basket, total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (!paymentIntent) {
        setError("Payment failed. Please try again.");
        setProcessing(false);
        return;
      }

      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({ type: "CLEAR_BASKET" });

      navigate("/orders", {
        state: { msg: "You have placed your order" },
      });
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={classes.payment__header}>
        Checkout ({basket.length}) items
      </div>

      <div className={classes.payment__grid}>
        <section className={classes.payment__left}>
          <div className={classes.payment__section}>
            <h3>Review Items</h3>
            <div className={classes.reviewItems}>
              {basket.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  flex={true}
                  hideButton
                />
              ))}
            </div>
          </div>

          <div className={classes.payment__section}>
            <h3>Delivery Address</h3>
            <div className={classes.payment__address}>
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Silver Spring, MD</p>
            </div>
          </div>

          <div className={classes.payment__section}>
            <h3>Payment Method</h3>

            <div className={classes.payment__details}>
              <form onSubmit={handleSubmit}>
                <CardElement
                  className={classes.cardElement}
                  onChange={handleChange}
                />

                {cardError && <p className={classes.error}>{cardError}</p>}

                <button
                  disabled={processing || !clientSecret}
                  className={classes.payButton}
                >
                  {processing ? (
                    <div className={classes.loaderWrapper}>
                      <ClipLoader color="gray" size={12} />
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </button>

                {error && <p className={classes.error}>{error}</p>}
              </form>
            </div>
          </div>
        </section>

        <aside className={classes.summary}>
          <div className={classes.summaryBox}>
            <h3>Order Summary</h3>

            <p>Items: {basket.length}</p>
            <p>Shipping: FREE</p>

            <hr />

            <p className={classes.summaryTotal}>
              Order Total: <strong>${total.toFixed(2)}</strong>
            </p>

            <button
              disabled={processing || !clientSecret}
              onClick={(e) => handleSubmit(e)}
              className={classes.placeOrderButton}
            >
              {processing ? (
                <div className={classes.loaderWrapper}>
                  <ClipLoader color="gray" size={12} />
                  <span>Please wait...</span>
                </div>
              ) : (
                "Place your order"
              )}
            </button>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default Payment;
