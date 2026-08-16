// Cloudflare R2 Configuration
// R2 Base URL과 폴더 경로를 설정합니다.

export const R2_CONFIG = {
  baseUrl: "https://pub-c9db72bafd5c492e9e9d4d4d11ef6ed8.r2.dev",
  folder: "wedding",
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

// Helper function to build R2 image URL
export const getImageUrl = (filename: string): string => {
  return `${R2_CONFIG.baseUrl}/${R2_CONFIG.folder}/${filename}`;
};

// Cloudflare R2/Images 기반으로 작은 변형 이미지를 받을 수 있게 해주는 함수
// 실제로는 메인 이미지를 최적화된 파일로 올려두면 가장 빠르며,
// 업로드가 안 된 경우에는 원본 파일에 transform 파라미터만 적용해서 우선 동작하게 한다.
export const getOptimizedImageUrl = (
  filename: string,
  width = R2_CONFIG.imageTransform.width,
  quality = R2_CONFIG.imageTransform.quality,
): string => {
  const url = getImageUrl(filename);
  return `${url}?format=${R2_CONFIG.imageTransform.format}&quality=${quality}&width=${width}`;
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
// 1) 최적화된 전용 파일이 있으면 그것을 우선 사용
// 2) 없으면 원본 이미지에 크기/품질 파라미터만 적용해 fallback
export const getMainHeroImageUrl = (): string => {
  const preferredFilename = IMAGE_FILES.mainHeroOptimized || IMAGE_FILES.mainHeroOriginal;

  return getOptimizedImageUrl(preferredFilename, 900, 72);
};
