import type { WeddingData } from "../types";
import { getGalleryImages } from "../config/r2";

export const mockWeddingData: WeddingData = {
  groom: {
    name: "심준혁",
    englishName: "Sim junhyeok",
    phone: "010-2665-5995",
    father: "심상근",
    mother: "송현숙",
    relation: "장남",
  },
  bride: {
    name: "전혜진",
    englishName: "Jeon ",
    phone: "010-4522-5685",
    father: "전정석",
    mother: "서영순",
    relation: "막내",
  },
  weddingDate: "2026.10.31 (토요일)",
  weddingTime: "오전 11시",
  venue: {
    name: "라비에벨 웨딩",
    address: "경기도 부천시 길주로 105 라비에벨 9층",
    phone: "032-325-2000",
    floor: "9층",
    hall: "라비에벨 단독홀",
    mapUrl: "https://map.naver.com/v5/search/라비에벨",
    transportation: [
      {
        type: "subway",
        description: "7호선 상동역 7번, 8번 출구와 바로 연결",
        text: "상동역 7번, 8번 출구와 바로 연결",
      },
      {
        type: "subway",
        description: "1호선 송내역 2번출구 버스로 15분정도 소요",
        text: "송내역 2번출구 버스로 15분정도 소요 / 송내역 버스노선 : 16, 37, 83, 87",
      },
      {
        type: "bus",
        description:
          "상동역7번출구.세이브존 하차 - [일반]5-4, 16, 33, 50-1, 83",
        text: "상동역7번출구.세이브존 하차",
      },
      {
        type: "bus",
        description:
          "상동역8번출구.세이브존 하차 - [간선]24, 37, 87, [일반]6-2, 23-2, 50-1, 52, 59, 59-1, 66, 70",
        text: "상동역8번출구.세이브존 하차",
      },
      {
        type: "bus",
        description: "[광역]300(강남역), 8906(범계역), 8106(분당), 1001(고양교통), 1601(홍대)",
        text: "상동역8번출구.세이브존 하차",
      },
    ],
    parking: "세이브존 B2~B4 주차장 / 하이파킹 주차장",
  },
  parents: {
    groom: {
      father: "심상근",
      mother: "송현숙",
    },
    bride: {
      father: "전정석",
      mother: "서영순",
    },
  },
  gallery: getGalleryImages(),
  interview: [
    {
      question: "결혼을 결심한 이유는?",
      groomAnswer:
        "서로를 있는 그대로 존중하며 함께 웃을 수 있는 사람이기 때문입니다.",
      brideAnswer:
        "함께 있을 때 가장 행복하고 편안해서 평생 함께하고 싶었습니다.",
    },
    {
      question: "신혼여행은 어디로 가시나요?",
      groomAnswer: "자연이 아름다운 포르투갈/스페인 떠날 예정입니다!",
      brideAnswer: "포르투갈의 멋진 자연 속에서 여유롭게 여행할 계획이에요.",
    },
  ],
  guestbook: [
    
  ],
  accounts: {
    groom: [
      {
        holder: "심준혁",
        bank: "신한은행",
        accountNumber: "110-405-016910",
      },
      {
        holder: "송현숙",
        bank: "기업은행",
        accountNumber: "296-049208-02-011",
      },
      {
        holder: "심상근",
        bank: "하나은행",
        accountNumber: "217-890166-97-307",
      },
    ],
    bride: [
      {
        holder: "전혜진",
        bank: "카카오뱅크",
        accountNumber: "3333-10-7742377",
      },
      {
        holder: "서영순",
        bank: "기업은행",
        accountNumber: "010-4729-5685",
      },
      {
        holder: "전정석",
        bank: "농협",
        accountNumber: "1167-02-172150",
      },
    ],
  },
};
