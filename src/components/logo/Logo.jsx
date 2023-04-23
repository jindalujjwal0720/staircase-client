import React from "react";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.letter}>S</div>
      <div className={styles.letter}>T</div>
      <div className={styles.letter}>A</div>
      <div className={styles.letter}>I</div>
      <div className={styles.letter}>R</div>
      <div className={styles.letter}>C</div>
      <div className={styles.letter}>A</div>
      <div className={styles.letter}>S</div>
      <div className={styles.letter}>E</div>
    </div>
  );
};

export default Logo;
