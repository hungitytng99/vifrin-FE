import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./MainLayout.module.sass";

export default function MainLayout({ children, hasFooter }) {
  return (
    <>
      <Header />
      <div className={styles.content}>{children}</div>
    </>
  );
}
