import React from "react";
import Link from "next/link";

const SideNavigation = () => {
  return (
    <nav style={{ backgroundColor: "#dea76d" }} className="py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">Administration</div>
        <div className="flex space-x-4">
          <Link className="text-white" href="/">
            Home
          </Link>
          <Link className="text-white" href="/upload">
            Upload
          </Link>
          <Link className="text-white" href="/manage">
            Manage
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
