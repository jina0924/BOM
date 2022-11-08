import React from "react";

import ProfileImage from "components/atoms/ProfileImage";
import ContactBtn from "components/atoms/ContactBtn";

function ProfileCard({ person }) {
  return (
    <div className="profile-card bg-white rounded-[20px] h-full">
      <div className="profile-img-box h-1/2 w-full flex justify-center items-center">
        <div className="profile-img h-2/3 aspect-square">
          <ProfileImage imageURL={person.image} person={person.name} />
        </div>
      </div>
      <div className="profile-name-grade-box h-1/4 flex flex-col justify-center">
        <div className="name-box flex justify-center text-lg font-extrabold text-main">
          <span>{person.name}</span>
        </div>
        <div className="grade-box flex justify-center text-sm text-main">
          <span>{person.position || person.department}</span>
        </div>
      </div>
      <div className="profile-contact-box h-1/5 flex justify-center items-center">
        <div className="phone-box h-3/4 aspect-square mr-5">
          <ContactBtn iconTag="UilPhone" person={person} />
        </div>
        <div className="mail-box h-3/4 aspect-square ">
          <ContactBtn iconTag="UilEnvelope" person={person} />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
