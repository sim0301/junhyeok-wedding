import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination } from "swiper/modules";

// // Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

export const Information: React.FC = () => {
  const infoCards = [
    {
      title: "포토테이블",
      content: "포토테이블에 놓인 카메라를 보시고 \n'축하 메시지'를 남겨주세요!",
    },
    {
      title: "연회 안내",
      content: "식사는 뷔페로 진행됩니다.\n예식 전후로 식사 가능합니다.",
    },
  ];

  return (
    <section className="information-section">
      <h2 className="section-title">INFORMATION</h2>
      <p className="section-subtitle">예식 정보</p>

      <div className="info-swiper-container">
        <Swiper
          effect={"cube"}
          grabCursor={true}
          loop={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCube, Pagination]}
          className="info-swiper"
        >
          {infoCards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="info-card">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-content">{card.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
