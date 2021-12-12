import React from "react";
import { Spin } from "antd";
import "./FullComponentLoading.sass";

const FullComponentLoading = ({ bgColor = `rgba(255,255,255,1)` }) => {
  return (
    <div
      className="full-page-loading"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Spin size="large" />
    </div>
  );
};
export default FullComponentLoading;
