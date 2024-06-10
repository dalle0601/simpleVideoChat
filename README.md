# Simple Video Chat 📹
SimpleVideoChat은 WebRTC와 Socket.IO를 이용하여 실시간 화상 채팅 기능을 제공하는 웹 애플리케이션입니다.<br/>
---

## 개요
- 프로젝트 명칭 : Simple Video Chat
- 개발 인원 : 1명
- 주요 기능
  
  |기능|설명|
  |-|-|
  |로그인 입장|google 로그인을 이용한 로그인 기능 (랜덤채팅, 스터디룸 사용가능)|
  |비로그인 입장|NickName만을 입력하여 입장 (랜덤채팅만 사용 가능)|
  |랜덤채팅|랜덤채팅에 입장해 있는 유저와 랜덤으로 채팅하기 기능 (기존 랜덤채팅 Room이 없는 경우 생성)|
  |스터디룸 생성/입장|여러 사람들과 화상채팅이 가능한 스터디룸을 생성/입장 (Google 로그인 후 이용 가능)|
  |로그아웃|현재 로그인 되어있는 경우 로그아웃 가능|
  
- 개발 
  Frontend: React, TypeScript, WebRTC
  Backend: Node.js, Express, Socket.IO
  Database: Firestore Database

## 요구사항 분석
- 사용자 요구사항:<br/>
  - Google 로그인을 통한 편리한 접근 <br/>
  - 비로그인 상태에서도 랜덤 채팅 기능 사용 가능<br/>
  - 여러 사용자와 동시에 화상 채팅할 수 있는 스터디룸 기능<br/>
  - 안정적이고 끊김 없는 화상 채팅 경험<br/>

- 시스템 요구사항:<br/>
  - Node.js와 Express를 이용한 서버 구축<br/>
  - Socket.IO를 이용한 실시간 통신<br/>
  - WebRTC를 이용한 브라우저 간 실시간 화상 통화<br/>
  - Firebase의 Firestore database을 이용한 데이터 저장 <br/>
  - Firebase Authentication를 이용한 사용자 인증<br/>

## 설치 및 실행 방법
  - Node.js (v14 이상)
  - npm (v6 이상)
  - 설치 단계

    |||
    |-|-|
    |Repository 클론|``` git clone https://github.com/dalle0601/simpleVideoChat.git > cd simpleVideoChat```|
    |Dependencies 설치|```cd socket > npm install ``` ```cd videochat > npm install```|
    |Firebase 설정| - Firebase 콘솔에서 프로젝트를 생성하고 Firestore와 Authentication을 설정 <br/> - Firebase 프로젝트의 설정 파일(firebase/firebase.ts)을 생성, 다음과 같은 내용을 추가. 이 파일은 .gitignore에 포함 혹은 .env 로 apiKey, authDomain 등 관리 <br />
    |서버 실행|```cd socket > npm start``` ```cd videochat > npm run dev```|
    |브라우저 확인|``` http:localhost:3000 ```|
                
## 사용법
  - 로그인
    - Google 계정으로 로그인하거나 NickName을 입력하여 비로그인 상태로 입장합니다.
  - 랜덤채팅
    - 랜덤채팅 버튼을 클릭하여 랜덤 채팅에 참여합니다. 기존 랜덤채팅 방이 없는 경우 자동으로 생성됩니다.
  - 스터디룸
    - Google 로그인 후 스터디룸을 생성하거나 기존 스터디룸에 입장할 수 있습니다.
  - 로그아웃  
    - 로그인 상태에서 로그아웃 버튼을 클릭하여 로그아웃합니다.
   
## 문제 해결
