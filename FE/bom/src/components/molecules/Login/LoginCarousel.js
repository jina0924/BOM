import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import loginCarousel1 from "assets/login_carousel_1.png";
import loginCarousel2 from "assets/login_carousel_2.png";
import loginCarousel3 from "assets/login_carousel_3.png";
import loginCarousel4 from "assets/login_carousel_4.png";

function LoginCarousel() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      interval={5000}
    >
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
            병동 환자 목록을 볼 수 있습니다.
          </span>
        </div>
      </div>
      <div className="carousel-item flex flex-col pb-6">
        <div className="service-info-image">
          <img
            src={loginCarousel3}
            alt="환자 상태 그래프 소개 이미지"
            className="px-7"
          />
        </div>
        <div className="carousel-text p-3">
          <span className="text-white text-sm font-light">
            환자의 상태를 그래프로 확인할 수 있습니다.
          </span>
        </div>
      </div>
      <div className="carousel-item flex flex-col pb-6">
        <div className="service-info-image">
          <img
            src={loginCarousel4}
            alt="배터리 상태 화면 소개 이미지"
            className="px-7"
          />
        </div>
        <div className="carousel-text p-3">
          <span className="text-white text-sm font-light">
            배터리 상태를 확인할 수 있습니다.
          </span>
        </div>
      </div>
    </Carousel>
  );
}

export default LoginCarousel;
