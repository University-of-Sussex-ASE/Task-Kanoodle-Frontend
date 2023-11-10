import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const Main = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Space size="middle">
        <Spin size="large" indicator={antIcon} />
      </Space>
    </div>
  );
};

export default Main;
