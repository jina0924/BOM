import React from "react";

function ProfileImage({ imageURL, person }) {
  return (
    <img
      src={imageURL}
      alt={`${person}의 프로필 이미지입니다.`}
      className="rounded-full object-cover overflow-hidden w-full h-full shadow-box"
    />
  );
}

export default ProfileImage;
