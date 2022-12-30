import React from "react";
import SideNavigation from "./SideNavigation";

function Layout({ children }: any) {
  return (
    <>
      <SideNavigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
