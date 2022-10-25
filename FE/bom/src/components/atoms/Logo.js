import React from "react";
import symbol from "assets/bom_symbol_50.png";

function Logo() {
  return (
    <div className="m-8 flex items-center">
      <img src={symbol} alt="BOM 심볼" className="inline mx-2 w-[42px]" />
      <span className="font-righteous text-main text-3xl tracking-wider">
        BOM
      </span>
    </div>
  );
}

export default Logo;
