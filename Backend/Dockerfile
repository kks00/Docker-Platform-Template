FROM node:latest

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json (있는 경우) 복사
COPY package*.json ./

# 필요한 패키지 설치
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# 포트 노출 (index.js의 기본 포트 3000)
EXPOSE 3000

# 서버 시작 커맨드 설정
CMD ["npm", "start"]
