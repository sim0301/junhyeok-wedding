/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { FaSubway, FaBus, FaShuttleVan } from "react-icons/fa";
import type { WeddingData } from "../types";
import { parseTransportation } from "../utils/transportationParser";

interface LocationProps {
  data: WeddingData;
}

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
  }
}

const KAKAO_MAP_APPKEY =
  import.meta.env.VITE_KAKAO_MAP_APPKEY ||
  "fa7ed00e26baaa5c841014401f3ee5e7";

export const Location: React.FC<LocationProps> = ({ data }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);

  const handleNaverMap = () => {
    window.open("https://map.naver.com/p/search/부천%20라비에벨%20웨딩홀/place/12945535?placePath=/home?abtExp=NEW-PLACE-SEARCH:4&bk_query=부천%20라비에벨%20웨딩홀&entry=pll&from=map&fromNxList=true&fromPanelNum=2&timestamp=202606272128&locale=ko&svcName=map_pcv5&searchText=부천%20라비에벨%20웨딩홀&searchType=place&c=15.00,0,0,0,dh");
  };

  const handleKakaoMap = () => {
    window.open("https://place.map.kakao.com/98780839");
  };

  const handleTmap = () => {
    const placeName = encodeURIComponent("라비에벨");
    const longitude = 126.754135;
    const latitude = 37.506391;

    const tmapUrl = `tmap://route?rGoName=${placeName}&rGoX=${longitude}&rGoY=${latitude}`;
    window.open(tmapUrl);
  };

  useEffect(() => {
    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    const initializeMap = () => {
      if (!mapContainer.current || !window.kakao?.maps) {
        setMapLoadError(true);
        return;
      }

      const { kakao } = window;
      const position = new kakao.maps.LatLng(
        37.506391,
        126.754135
      );

      const mapOption = {
        center: position,
        level: 3,
        scrollwheel: false,
      };

      const map = new kakao.maps.Map(mapContainer.current, mapOption);
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      const marker = new kakao.maps.Marker({
        position,
        map,
        text: "라비에벨 부천",
      });

      const infowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="padding:5px;font-size:12px;text-align:center;">라비에벨 부천</div>',
      });

      kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });

      setIsMapReady(true);
      setMapLoadError(false);
    };

    const waitForKakaoMaps = () => {
      let retries = 0;
      const maxRetries = 100;
      const interval = 100;

      const poll = () => {
        if (window.kakao?.maps?.load) {
          window.kakao.maps.load(initializeMap);
          return;
        }

        retries += 1;
        if (retries >= maxRetries) {
          setMapLoadError(true);
          return;
        }

        window.setTimeout(poll, interval);
      };

      poll();
    };

    if (window.kakao?.maps?.load) {
      window.kakao.maps.load(initializeMap);
      return;
    }

    const existingScript = document.getElementById("kakao-map-script");
    if (existingScript) {
      existingScript.addEventListener(
        "load",
        waitForKakaoMaps,
        { once: true }
      );
      existingScript.addEventListener(
        "error",
        () => {
          setMapLoadError(true);
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APPKEY}&autoload=false`;
    script.charset = "UTF-8";
    script.async = false;
    script.onload = () => {
      waitForKakaoMaps();
    };
    script.onerror = () => {
      setMapLoadError(true);
    };

    document.head.appendChild(script);

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="location-section">
      <h2 className="section-title">LOCATION</h2>
      <p className="section-subtitle">오시는 길</p>

      <div className="location-content">
        <div className="venue-info">
          <h3 className="venue-name">{data.venue.name}</h3>
          <p className="venue-address">{data.venue.address}</p>
          <p className="venue-detail">
            {data.venue.floor} {data.venue.hall}
          </p>
          <p className="venue-phone">Tel. {data.venue.phone}</p>
        </div>

        <div
          className="map-placeholder"
          style={{ position: "relative", minHeight: "300px" }}
        >
          <div
            ref={mapContainer}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
            }}
          />

          {!isMapReady && !mapLoadError && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(247,247,247,0.95)",
                color: "#666",
                padding: "16px",
                textAlign: "center",
                fontSize: "0.95rem",
                borderRadius: "10px",
              }}
            >
              <p>카카오 지도를 불러오는 중입니다...</p>
            </div>
          )}

          {mapLoadError && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(247,247,247,0.95)",
                color: "#666",
                padding: "16px",
                textAlign: "center",
                fontSize: "0.95rem",
                borderRadius: "10px",
              }}
            >
              <p>카카오 지도를 불러오지 못했습니다.</p>
              <p style={{ marginTop: "8px", fontSize: "0.85rem" }}>
                카카오 개발자 콘솔에서 앱키와 도메인 등록 상태를 확인해 주세요.
              </p>
            </div>
          )}
        </div>

        <div className="transportation-info">
          <h3 className="info-title">교통편 안내</h3>
          {data.venue.transportation.map((transport, index) => {
            const parsed =
              transport.type !== "shuttle"
                ? parseTransportation(transport.type, transport.description)
                : null;

            return (
              <div key={index} className="transport-item">
                <span className="transport-icon">
                  {transport.type === "subway" && <FaSubway />}
                  {transport.type === "bus" && <FaBus />}
                  {transport.type === "shuttle" && <FaShuttleVan />}
                </span>
                <div className="transport-description">
                  {parsed?.subwayLines && parsed.subwayLines.length > 0 && (
                    <div className="transport-badges">
                      {parsed.subwayLines.map((line, idx) => (
                        <span
                          key={idx}
                          className="line-badge"
                          style={{ backgroundColor: line.color }}
                        >
                          {line.line}
                        </span>
                      ))}
                    </div>
                  )}
                  {parsed?.busRoutes && parsed.busRoutes.length > 0 && (
                    <div className="transport-badges">
                      {parsed.busRoutes.map((route, idx) => (
                        <span
                          key={idx}
                          className="line-badge"
                          style={{ backgroundColor: route.color }}
                        >
                          {route.number}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="transport-text">{transport.text}</p>
                </div>
              </div>
            );
          })}

          <div className="parking-info">
            <h4 className="parking-title">주차 안내</h4>
            <p className="parking-description">{data.venue.parking}</p>
          </div>
        </div>

        <div className="map-buttons">
          <button className="map-btn naver-map" onClick={handleNaverMap}>
            <img
              src="/naver-map.png"
              alt="네이버 지도"
              className="map-btn-icon"
            />
            네이버 지도
          </button>
          <button className="map-btn kakao-map" onClick={handleKakaoMap}>
            <img src="/kakao-map.png" alt="카카오맵" className="map-btn-icon" />
            카카오맵
          </button>
          <button className="map-btn tmap" onClick={handleTmap}>
            <img src="/t-map.png" alt="티맵" className="map-btn-icon" />
            티맵
          </button>
        </div>
      </div>
    </section>
  );
};
