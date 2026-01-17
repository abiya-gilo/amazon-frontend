import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51SgTDURx02gaMVJgliV4WJINaEUzBVxJwWmD5C0JfmX13dIP4QbFacX8ZmXKWNORwjQcdM3Xzkr9P68PfnlxxVEm003s6Tx0MP"
);

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/signin" element={<Auth />} />

      <Route
        path="/payments"
        element={
          <ProtectedRoute
            msg="Please sign in to complete your purchase"
            redirect="/payments"
          >
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute
            msg="Please sign in to view your orders"
            redirect="/orders"
          >
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productid" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
