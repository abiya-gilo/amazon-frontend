import React from "react";
import styles from "./LowerHeader.module.css";
import { Link } from "react-router-dom";

function LowerHeader() {
  return (
    <nav className={styles.lowerHeader}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${styles.all}`}>
          <span className={styles.menuIcon}>☰</span>
          <p>All</p>
        </li>
        <li className={styles.navItem}>
          <Link to="/deals">Today's Deals</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/customer-service">Customer Service</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/registry">Registry</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/gift-cards">Gift Cards</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/sell">Sell</Link>
        </li>
      </ul>
    </nav>
  );
}

export default LowerHeader;
