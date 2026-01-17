import React, { useContext } from "react";
import styles from "./Header.module.css";
import { DataContext } from "../dataProvider/DataProvider";
import { Link, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { auth } from "../../Utility/firebase";
import { signOut } from "firebase/auth";
import { Type } from "../../Utility/action.type";

function Header() {
  const navigate = useNavigate();

  // Access global state and dispatch from context
  const [state, dispatch] = useContext(DataContext);
  const { basket, user } = state;

  // ✅ Extract username before @
  const username = user?.email ? user.email.split("@")[0] : null;

  // ✅ Sign out handler
  const handleSignOut = () => {
    signOut(auth);
    dispatch({
      type: Type.SET_USER,
      user: null,
    });
    navigate("/signin");
  };

  // ✅ Calculate total items in basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={styles.fixed}>
      <header className={styles.header}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          {/* Logo */}
          <Link to="/" className={styles.logoLink}>
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className={styles.logo}
            />
          </Link>

          {/* Delivery */}
          <div className={styles.delivery}>
            <span role="img" aria-label="location">
              📍
            </span>
            <div>
              <p className={styles.deliveryText}>Delivery to</p>
              <span className={styles.deliveryCountry}>Ethiopia</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <select className={styles.searchSelect}>
              <option value="all">All</option>
            </select>
            <input
              type="text"
              placeholder="Search product"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>🔍</button>
          </div>

          {/* Language */}
          <div className={styles.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="US Flag"
              className={styles.flag}
            />
            <select className={styles.languageSelect}>
              <option value="en">EN</option>
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightLinks}>
          {/* ✅ Account Section */}
          <div
            className={styles.link}
            onClick={() => (!user ? navigate("/signin") : handleSignOut())}
            style={{ cursor: "pointer" }}
          >
            <p className={styles.smallText}>
              Hello, {username ? username : "Sign In"}
            </p>
            <span className={styles.boldText}>
              {user ? "Sign Out" : "Account & Lists"}
            </span>
          </div>

          {/* Orders */}
          <Link to="/orders" className={styles.link}>
            <p className={styles.smallText}>Returns</p>
            <span className={styles.boldText}>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={`${styles.link} ${styles.cart}`}>
            <BiCart size={35} />
            <span className={styles.cartCount}>{totalItem}</span>
          </Link>
        </div>
      </header>

      {/* Lower nav bar */}
      <LowerHeader />
    </section>
  );
}

export default Header;
