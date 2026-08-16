// Cloudflare R2 Configuration
// R2 Base URL과 폴더 경로를 설정합니다.

export const R2_CONFIG = {
  baseUrl: "https://pub-c9db72bafd5c492e9e9d4d4d11ef6ed8.r2.dev",
  folder: "wedding-resize",
  imageTransform: {
    format: "auto",
    quality: 72,
    width: 900,
  },
};

// 이미지 파일명 설정
export const IMAGE_FILES = {
  gallery: [
    // 흰 드레스
    "CSC_3961.jpg",
    "CSC_3909.jpg",
    "CSC_3968.jpg",
    "CSC_3932.jpg",
    "CSC_3787.jpg",
    "CSC_4145.jpg",
    // 분홍 드레스
    "CSC_4199.jpg",
    "CSC_4552.jpg",
    "CSC_4270.jpg",
    "CSC_4306.jpg",
    "CSC_4339.jpg",
    "CSC_4407.jpg",
    // 파랑 드레스
    "CSC_4670.jpg",
    "CSC_4687.jpg",
    "CSC_5047.jpg",
    "CSC_5140.jpg",
    "CSC_5171.jpg",
    "CSC_5214.jpg",
  ],
  mainHeroOriginal: "CSC_4199.jpg",
  mainHeroOptimized: "CSC_4199-hero.jpg",
};

export const getImageUrl = (filename: string): string => {
  return `${R2_CONFIG.baseUrl}/${R2_CONFIG.folder}/${filename}`;
};

// 썸네일 파일명 규칙: "CSC_3787.jpg" -> "CSC_3787-thumb.jpg"
// (그리드용 작은 이미지와 확대보기용 큰 이미지를 별도 파일로 R2에 업로드해서 사용)
const getThumbFilename = (filename: string): string => {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return `${filename}-thumb`;
  return `${filename.slice(0, dotIndex)}-thumb${filename.slice(dotIndex)}`;
};

export const getGalleryImages = () => {
  return IMAGE_FILES.gallery.map((filename, index) => ({
    id: String(index + 1),
    url: getImageUrl(getThumbFilename(filename)), // 그리드용 썸네일 (약 480px, 가볍게)
    fullUrl: getImageUrl(filename), // 확대(모달)용 (약 1600px, 선명하게)
    alt: `웨딩 사진 ${index + 1}`,
  }));
};

export const getMainHeroImageUrl = (): string => {
  const preferredFilename = IMAGE_FILES.mainHeroOptimized || IMAGE_FILES.mainHeroOriginal;

  return getImageUrl(preferredFilename);
};
