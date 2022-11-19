import React from "react";

function ProfileImage({ imageURL, person }) {
  return (
    <div className="profile-image-box w-full aspect-square shadow-box">
      <img src={imageURL} alt={`${person}의 프로필 이미지입니다.`} />
    </div>
  );
}

export default ProfileImage;
