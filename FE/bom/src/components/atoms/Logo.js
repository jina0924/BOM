import React from "react";
import symbol from "assets/bom_symbol_50.png";

function Logo({ size = "l" }) {
  return (
    <>
      {size === "s" && (
        <div className="p-8 flex items-center">
          <img src={symbol} alt="BOM 심볼" className="inline mx-2 w-[30px]" />
          <span className="font-righteous text-main text-xl tracking-wider">
            BOM
          </span>
        </div>
      )}
      {size === "l" && (
        <div className="p-8 flex items-center">
          <img src={symbol} alt="BOM 심볼" className="inline mx-2 w-[35px]" />
          <span className="font-righteous text-main text-2xl tracking-wider">
            BOM
          </span>
        </div>
      )}
    </>
  );
}

export default Logo;
