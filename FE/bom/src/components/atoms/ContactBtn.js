import React from "react";

import { UilPhone, UilEnvelope } from "@iconscout/react-unicons";

function ContactBtn({ iconTag }) {
  return (
    <>
      {iconTag === "UilPhone" && (
        <div className="contact-box rounded-full w-full h-full aspect-square text-main bg-white shadow-dark hover:text-white hover:bg-main flex justify-center items-center">
          <UilPhone size={20} />
        </div>
      )}
      {iconTag === "UilEnvelope" && (
        <div className="contact-box rounded-full w-full h-full aspect-square text-main bg-white shadow-dark hover:text-white hover:bg-main flex justify-center items-center">
          <UilEnvelope size={20} />
        </div>
      )}
    </>
  );
}

export default ContactBtn;
