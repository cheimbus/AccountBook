# 개인 프로젝트
## 1. 서비스 개요
- 본 서비스는 사용 제약이 없는 가계부 API 서비스입니다.
## 2. 프로젝트 환경 및 설치, 업데이트
> 로컬 환경에서 실행
- 사용버전
  - `NestJS v9.1.2`
  - `MySQL v8.028`
  - `Node v16.17.0`
  - `npm v8.15.0`
  - `TypeORM v0.39`
> Node install
- 차례대로 입력합니다. 이미 설치하였다면 update를 진행합니다. 참조 https://github.com/nvm-sh/nvm#installing-and-updating
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
```
`export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm`
```
```
nvm install node
```
```
sudo apt install npm
```
> Node & npm update
```
sudo npm install -g n
```
```
sudo n 16.17.0
```

## 3. 설치 및 실행 방법
> 아래를 차례로 실행시킵니다.
- 해당 프로젝트를 clone합니다.
```
git clone https://github.com/nicesiu/AccountBook
```
- 모듈을 설치합니다.
```
npm install
```
- 직접 작성한 모델과 데이터베이스를 동기화시기키 위해 아래 명령어를 실행합니다.
```
npm run typeorm schema:sync
```
- 서버를 실행합니다.
```
npm run start
```
- 무중단 서버를 배포하기 위해서는 아래의 명령어를 사용합니다.
```
npm run start:prod
```

## 4. .env 생성
> 다음과 같이 작성합니다.
```
TEST=false
// DB
HOST=localhost
DB_PORT= "write here"
USER_NAME=root
PASSWORD= "write here"
DATABASE= "write here"

// swagger
SWAGGER_PATH=api
SWAGGER_USER=siu
SWAGGER_PASSWORD=123123

// port
PORT=3000

// JWT
JWT_ACCESS_SECRET=djddjdh123
JWT_ACCESS_EXPIRESIN=60m
JWT_REFRESH_SECRET=siuAAA!@fd
JWT_REFRESH_EXPIRESIN=720m
```

## 5. 데이터베이스 다이어그램
<img width="1035" alt="스크린샷 2022-10-06 오후 7 12 30" src="https://user-images.githubusercontent.com/87293880/194287389-b3b37685-3b28-400a-bf9e-e1956f33172b.png">



## 6. API 사용법
> 아래 주소로 이동해 swagger를 사용합니다.
```
http://localhost:3000/api
password : 123123
```
> 사용법은 다음과 같습니다.
- 사용자는 회원가입을 해야합니다.   
- 사용자는 회원가입 한 아이디를 가지고 로그인을 합니다.
  - accessToken과 RefreshToken이 생성되어 쿠키로 전송됩니다.   
- 발급한 accessToken을 가지고 Authorization합니다.
  - 제한시간 1시간
- 제한시간이 만료가 되었다면 RefreshToken로 새로 발급합니다.   
  - 제한시간 하루
- 사용자의 정보를 가져옵니다.   
- 사용자의 정보를 수정할 수 있습니다.   
- 사용자는 로그아웃 할 수 있습니다.   
- 사용자는 회원탈퇴를 할 수 있습니다.   
- AccountBook을 생성합니다.
  - 한 계정당 한개만 생성가능합니다.   
- AccountBook을 수정합니다.   
- AccountBook을 삭제합니다.
  - soft delete를 하여 언제든지 복구 가능합니다.   
- AccountBook을 불러옵니다.
  - 이때까지 지출한 지출 내역들을 불러옵니다.
  - 페이징을 하여 원하는 수 만큼 불러올 수 있습니다.   
- 지출내역을 생성합니다.   
- 지출내역을 수정합니다.   
- 특정 지출내역을 불러옵니다.   
- 특정 지출내역을 삭제합니다.
  - hard delete.  
## 7. 저작권
- Copyright 2022 [Siu Hwang.](https://github.com/cheimbus) All rights reserved.
