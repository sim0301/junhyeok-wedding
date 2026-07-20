// Cloudflare R2 Configuration
// R2 Base URL과 폴더 경로를 설정합니다.

export const R2_CONFIG = {
  baseUrl: "https://pub-c9db72bafd5c492e9e9d4d4d11ef6ed8.r2.dev",
  folder: "wedding",
};

// 이미지 파일명 설정
export const IMAGE_FILES = {
  gallery: [
    "CSC_4145-.jpg",
    "CSC_4199-20x30.jpg",
    "CSC_4270-.jpg",
    "CSC_4841-.jpg",
    "CSC_4929-.jpg",
    "CSC_5214-.jpg",
  ],
  mainHero: "CSC_4199-20x30.jpg",
};

// Helper function to build R2 image URL
export const getImageUrl = (filename: string): string => {
  return `${R2_CONFIG.baseUrl}/${R2_CONFIG.folder}/${filename}`;
};

// 갤러리 이미지 URL들을 미리 생성
export const getGalleryImages = () => {
  return IMAGE_FILES.gallery.map((filename, index) => ({
    id: String(index + 1),
    url: getImageUrl(filename),
    alt: `웨딩 사진 ${index + 1}`,
  }));
};

// 메인 히어로 이미지 URL
export const getMainHeroImageUrl = (): string => {
  return getImageUrl(IMAGE_FILES.mainHero);
};
