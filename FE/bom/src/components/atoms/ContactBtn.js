import React from "react";

import { UilPhone, UilEnvelope } from "@iconscout/react-unicons";

function ContactBtn({ iconTag, person }) {
  return (
    <>
      {iconTag === "UilPhone" && (
        <div
          data-tip={person.phonenumber}
          className="tooltip-bottom tooltip tooltip-primary contact-box rounded-full w-full h-full aspect-square text-main bg-white shadow-dark hover:text-white hover:bg-main flex justify-center items-center"
        >
          <UilPhone size={20} />
        </div>
      )}
      {iconTag === "UilEnvelope" && (
        <div
          data-tip={person.email}
          className="tooltip-bottom tooltip tooltip-primary contact-box rounded-full w-full h-full aspect-square text-main bg-white shadow-dark hover:text-white hover:bg-main flex justify-center items-center"
        >
          <UilEnvelope size={20} />
        </div>
      )}
    </>
  );
}

export default ContactBtn;
