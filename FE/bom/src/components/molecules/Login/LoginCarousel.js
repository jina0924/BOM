import React from "react";

import loginCarousel1 from "assets/login_carousel_1.png";
import loginCarousel2 from "assets/login_carousel_2.png";

function LoginCarousel() {
  return (
    <>
      <div className="carousel-item flex flex-col pb-6">
        <div className="service-info-image">
          <img
            src={loginCarousel1}
            alt="병동 상황 그래프 소개 이미지"
            className="px-7"
          />
        </div>
        <div className="carousel-text p-3">
          <span className="text-white text-sm font-light">
            병동 상황을 한 눈에 파악할 수 있습니다.
          </span>
        </div>
      </div>
      <div className="carousel-item flex flex-col pb-6">
        <div className="service-info-image">
          <img
            src={loginCarousel2}
            alt="환자 테이플 소개 이미지"
            className="px-7"
          />
        </div>
        <div className="carousel-text p-3">
          <span className="text-white text-sm font-light">
            환자의 상태 이상을 파악할 수 있습니다.
          </span>
        </div>
      </div>
      <div className="carousel-item flex flex-col pb-6">
        <div className="service-info-image">
          <img src="https://placeimg.com/150/100/animals" alt="더미이미지" />
        </div>
        <div className="carousel-text p-3">
          <span className="text-white text-sm font-light">
            환자의 상태를 그래프로 확인할 수 있습니다.
          </span>
        </div>
      </div>
      <div className="carousel-item flex flex-col pb-6">
        <div className="service-info-image">
          <img src="https://placeimg.com/150/100/animals" alt="더미이미지" />
        </div>
        <div className="carousel-text p-3">
          <span className="text-white text-sm font-light">
            배터리 상태를 확인할 수 있습니다.
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginCarousel;
