// Layout.js
import React from "react";
import Menu from "./Menu";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="left-sidebar">
        <Menu />
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
