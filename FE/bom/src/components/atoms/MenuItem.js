import React from "react";

function MenuItem({ children }) {
  return (
    <div>
      <span>아이콘 자리</span>
      <span className="text-font2 text-lg">{children}</span>
    </div>
  );
}

export default MenuItem;
