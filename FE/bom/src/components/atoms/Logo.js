import React from "react";

import { Link } from "react-router-dom";

import symbol from "assets/bom_symbol_50.png";

function Logo({ disabled = false, size = "l", logoClassName }) {
  return (
    <>
      {disabled && (
        <>
          {size === "s" && (
            <div className={`flex items-center ${logoClassName}`}>
              <img
                src={symbol}
                alt="BOM 심볼"
                className="inline mr-2 w-[30px] h-[30px]"
              />
              <span className="font-righteous text-main text-xl tracking-wider">
                BOM
              </span>
            </div>
          )}
          {size === "l" && (
            <div className={`flex items-center ${logoClassName}`}>
              <img
                src={symbol}
                alt="BOM 심볼"
                className="inline mr-2 w-[35px] h-[35px]"
              />
              <span className="font-righteous text-main text-2xl tracking-wider">
                BOM
              </span>
            </div>
          )}
          {size === "xl" && (
            <div className={`flex items-center ${logoClassName}`}>
              <img
                src={symbol}
                alt="BOM 심볼"
                className="inline mr-4 w-[60px] h-[60px]"
              />
              <span className="font-righteous text-main text-4xl tracking-wider">
                BOM
              </span>
            </div>
          )}
        </>
      )}
      {!disabled && (
        <>
          <Link to="/" className="outline-none">
            {size === "s" && (
              <div className={`flex items-center ${logoClassName}`}>
                <img
                  src={symbol}
                  alt="BOM 심볼"
                  className="inline mr-2 w-[30px] h-[30px]"
                />
                <span className="font-righteous text-main text-xl tracking-wider">
                  BOM
                </span>
              </div>
            )}
            {size === "l" && (
              <div className={`flex items-center ${logoClassName}`}>
                <img
                  src={symbol}
                  alt="BOM 심볼"
                  className="inline mr-2 w-[35px] h-[35px]"
                />
                <span className="font-righteous text-main text-2xl tracking-wider">
                  BOM
                </span>
              </div>
            )}
          </Link>
        </>
      )}
    </>
  );
}

export default Logo;
