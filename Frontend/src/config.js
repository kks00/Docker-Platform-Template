// .env에서 로드된 백엔드 포트를 config로 중앙 관리
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 3000;

// 개발 환경(localhost)에서 Nginx를 거치지 않고 직접 API를 호출할 경우를 대비한 URL
// Docker 내부 네트워크가 아닌 브라우저(Host) 기준의 주소입니다.
export const API_BASE_URL = `http://localhost/api`;
