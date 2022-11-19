import React from "react";
import symbol from "assets/bom_symbol_50.png";

function Logo({ size = "l", logoClassName }) {
  return (
    <>
      {size === "s" && (
        <div className={`flex items-center ${logoClassName}`}>
          <img src={symbol} alt="BOM 심볼" className="inline mr-2 w-[30px]" />
          <span className="font-righteous text-main text-xl tracking-wider">
            BOM
          </span>
        </div>
      )}
      {size === "l" && (
        <div className={`flex items-center ${logoClassName}`}>
          <img src={symbol} alt="BOM 심볼" className="inline mr-2 w-[35px]" />
          <span className="font-righteous text-main text-2xl tracking-wider">
            BOM
          </span>
        </div>
      )}
    </>
  );
}

export default Logo;
