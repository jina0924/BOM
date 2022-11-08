import React from "react";

import { UilPhone, UilEnvelope } from "@iconscout/react-unicons";

function ContactBtn({ iconTag, person }) {
  return (
    <>
      {iconTag === "UilPhone" && (
        <div
          className="w-full h-full tooltip tooltip-bottom"
          data-tip={person.phonenumber.replace(
            /^(\d{2,3})(\d{3,4})(\d{4})$/,
            `$1-$2-$3`
          )}
          // style={{ color: "#000000" }}
        >
          <div className="contact-box rounded-full w-full h-full aspect-square text-main bg-white shadow-dark hover:text-white hover:bg-main flex justify-center items-center">
            <UilPhone size={20} />
          </div>
        </div>
      )}
      {iconTag === "UilEnvelope" && (
        <div
          data-tip={person.email}
          className="contact-box rounded-full w-full h-full aspect-square text-main bg-white shadow-dark hover:text-white hover:bg-main flex justify-center items-center tooltip tooltip-bottom"
        >
          <UilEnvelope size={20} />
        </div>
      )}
    </>
  );
}

export default ContactBtn;
