import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import type { WeddingData } from "../types";
import { IoClose } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface GalleryProps {
  data: WeddingData;
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pinchStateRef = useRef<{ startDistance: number; startZoom: number } | null>(null);
  const zoomLevelRef = useRef(1);
  const animationFrameRef = useRef<number | null>(null);

  const openModal = (index: number) => {
    setInitialSlide(index);
    setActiveSlideIndex(index);
    setIsModalOpen(true);
    setZoomLevel(1);
    setZoomedImageIndex(null);
    setIsPinching(false);
    // 스크롤 막기
    document.body.style.overflow = "hidden";
    // 히스토리에 상태 추가 (뒤로가기 대응)
    window.history.pushState({ modalOpen: true }, "");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSlideIndex(0);
    setZoomLevel(1);
    zoomLevelRef.current = 1;
    setIsPinching(false);
    setZoomedImageIndex(null);
    // 스크롤 복원
    document.body.style.overflow = "unset";
  };

  const handleImageTouchStart = (event: React.TouchEvent<HTMLImageElement>, index: number) => {
    if (event.touches.length !== 2 || activeSlideIndex !== index) return;

    setZoomedImageIndex(index);
    setIsPinching(true);

    const [firstTouch, secondTouch] = Array.from(event.touches);
    pinchStateRef.current = {
      startDistance: Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY),
      startZoom: zoomLevelRef.current,
    };
  };

  const handleImageTouchMove = (event: React.TouchEvent<HTMLImageElement>, index: number) => {
    if (event.touches.length !== 2 || activeSlideIndex !== index || !pinchStateRef.current) return;

    event.preventDefault();

    const [firstTouch, secondTouch] = Array.from(event.touches);
    const currentDistance = Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY);

    if (pinchStateRef.current.startDistance <= 0) return;

    const scaleFactor = currentDistance / pinchStateRef.current.startDistance;
    const nextZoom = pinchStateRef.current.startZoom * scaleFactor;
    const clampedZoom = Math.min(3, Math.max(1, Number(nextZoom.toFixed(2))));

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      zoomLevelRef.current = clampedZoom;
      setZoomLevel(clampedZoom);
      animationFrameRef.current = null;
    });
  };

  const handleImageTouchEnd = () => {
    pinchStateRef.current = null;
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    zoomLevelRef.current = 1;
    setZoomLevel(1);
    setIsPinching(false);
    setZoomedImageIndex(null);
  };

  // 뒤로가기 버튼 처리
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isModalOpen) {
        event.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isModalOpen]);

  // 갤러리 섹션이 뷰포트 근처에 오면 이미지 로드 시작
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartLoading(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // 200px 전에 미리 로드 시작
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // 모든 이미지 미리 로드
  useEffect(() => {
    if (!startLoading || data.gallery.length === 0) return;

    // let loadedCount = 0;
    // const totalImages = data.gallery.length;

    const preloadImage = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // 에러가 나도 계속 진행
        img.src = url;
      });
    };

    // 모든 이미지를 병렬로 로드
    Promise.all(data.gallery.map((image) => preloadImage(image.url))).then(
      () => {
        setImagesLoaded(true);
      }
    );
  }, [startLoading, data.gallery]);

  return (
    <section className="gallery-section" ref={sectionRef}>
      <h2 className="section-title">GALLERY</h2>
      <p className="section-subtitle">우리의 소중한 순간들</p>

      <div
        className="gallery-grid"
        style={{
          opacity: imagesLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {data.gallery.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openModal(index)}
          >
            <img src={image.url} alt={image.alt} className="gallery-image" />
          </div>
        ))}
      </div>

      {/* 로딩 중 placeholder */}
      {!imagesLoaded && (
        <div
          className="gallery-grid"
          style={{ minHeight: "300px", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div className="loading-spinner" />
            <span style={{ color: "#8b7355", fontSize: "14px" }}>
              사진을 불러오는 중...
            </span>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <button
            className="modal-close"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <IoClose />
          </button>
          <div className="gallery-swiper-wrapper">
            <Swiper
              initialSlide={initialSlide}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="gallery-modal-swiper"
              allowTouchMove={!isPinching}
              onSlideChange={(swiper) => {
                if (isPinching) return;
                setActiveSlideIndex(swiper.activeIndex);
                zoomLevelRef.current = 1;
                setZoomLevel(1);
                setZoomedImageIndex(null);
              }}
            >
              {data.gallery.map((image, index) => (
                <SwiperSlide key={image.id}>
                  <div
                    className={`modal-image-container${index === 0 || index === 4 ? " modal-image-container-landscape" : ""}`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className={`modal-image${index === 0 || index === 4 ? " modal-image-landscape" : ""}`}
                      onTouchStart={(event) => handleImageTouchStart(event, index)}
                      onTouchMove={(event) => handleImageTouchMove(event, index)}
                      onTouchEnd={handleImageTouchEnd}
                      onTouchCancel={handleImageTouchEnd}
                      style={{
                        transform: activeSlideIndex === index && zoomedImageIndex === index ? `scale(${zoomLevel})` : "scale(1)",
                        transition: activeSlideIndex === index && zoomedImageIndex === index && zoomLevel > 1 ? "none" : "transform 0.16s ease-out",
                        willChange: "transform",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
};
