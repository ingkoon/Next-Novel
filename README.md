# 🎲 그림이 소설이 되는, Next Novel

![logo](docs/img/logo.png)
## ⌛️ 프로젝트 진행 기간
2023.02.27(월) ~ 2023.04.07(금) (40일간 진행)<br>
SSAFY 8기 2학기 특화 프로젝트

## ✨ Next Novel 서비스 개요
### 기획 배경
- AI 생성 모델 중 GPT 를 활용한 서비스 개발
- 인공지능 영상 도메인으로써 그림을 활용

## 🏃 Next Novel 의 이용 목적
- 그림만으로 간단하게 소설을 작성할 수 있습니다.
- AI의 상상력을 빌려 생각치도 못한 소설을 볼 수 있습니다.
- 친구들과 그림 실력을 뽐내며 서비스를 즐길 수 있습니다.

## 🌞 팀원 소개
### Six God
프론트, 백엔드, AI 신 여섯이 모인 서울 5반 2조

- 이정범 - 팀장, BackEnd, 배포
- 김수빈 - FrontEnd
- 소지현 - FrontEnd
- 서철원 - FrontEnd
- 이명규 - AI, 서버, 배포
- 강은진 - AI, 배포

## ✔️ 아키텍처 구성도
![architecture](docs/img/architecture.png)

## ✔️ 주요 기능
### 1) ChatGPT API
- OpenAI 의 ChatGPT API 를 활용하여 소설(이야기)을 생성합니다.
- 영어를 한글로 번역하여 화면에 보여줍니다.

### 2) Image Captioning
- 이미지를 설명하는 문장 추출
- [CoCa : Contrastive Captioners](https://huggingface.co/spaces/laion/CoCa) 모델을 사용하였습니다.
- CoCa는 Vision&Language 계열의 논문에서 여러 task를 해결하기 위해 제안되었던 여러가지 모델 구조를 하나의 구조로 통합한 모델

### 3) Stable Diffusion
- Image to Image 생성 모델
- 표지 그림을 그리면 더 생동감 있는 그림으로 변환합니다.
- [ControlNet 의 Canny Edge 를 이용한 Stable Diffusion](https://colab.research.google.com/drive/19rp4QUjAlf0L7UOOeE6eZCjnbUpq6duf?usp=sharing) 모델을 사용하였습니다.
- ControlNet 은 추가 조건을 추가하여 확산 모델을 제어하는 신경망 구조입니다.
- Canny Edge 는 윤곽을 가장 잘 찾아내는 에지 찾기 알고리즘 입니다.

### 4) 캔버스 페인팅
- 다양한 색과 펜 크기로 캔버스에 그림을 그릴 수 있습니다.
- 지우개, 뒤로가기, 삭제 기능을 추가로 제공합니다.
- 마우스 클릭 이벤트와 터치 이벤트로 페인팅할 수 있으며, 웹 및 태블릿 환경에서 즐길 수 있습니다.
- 제출한 그림들은 저장하였고 이를 재사용할 수 있습니다.

### 5) MZ스러운 디자인과 친절한 이용 가이드
- GSAP 애니메이션 효과와 주황빛 컬러
- 사용자를 위한 이용가이드 페이지 제공
  ![sample_guideline.png](/docs/img/sample_guideline.png)

## ✔️ 주요 기술
### 1) ChatGPT API
- OpenAI 의 ChatGPT API 를 활용하여 소설(이야기)을 생성합니다.
- 영어를 한글로 번역하여 화면에 보여줍니다.

### 2) Image Captioning
- 이미지를 설명하는 문장 추출
- [CoCa : Contrastive Captioners](https://huggingface.co/spaces/laion/CoCa) 모델을 사용하였습니다.
- CoCa는 Vision&Language 계열의 논문에서 여러 task를 해결하기 위해 제안되었던 여러가지 모델 구조를 하나의 구조로 통합한 모델

### 3) Stable Diffusion
- Image to Image 생성 모델
- 표지 그림을 그리면 더 생동감 있는 그림으로 변환합니다.
- [ControlNet 의 Canny Edge 를 이용한 Stable Diffusion](https://colab.research.google.com/drive/19rp4QUjAlf0L7UOOeE6eZCjnbUpq6duf?usp=sharing) 모델을 사용하였습니다.
- ControlNet 은 추가 조건을 추가하여 확산 모델을 제어하는 신경망 구조입니다.
- Canny Edge 는 윤곽을 가장 잘 찾아내는 에지 찾기 알고리즘 입니다.

### 4) 캔버스 페인팅
- 바닐라 자바스크립트에 canvas API를 이용
- 웹 소켓 기술을 활용하여 같은 세션에 있는 사용자에게 그림판을 공유할 수 있는 기능

## ✔️ 프로젝트 파일 구조
```
Repository
 ├─ README.md
 │
 ├─ docs
 │     │
 │     ├── DB
 │     │    ├── ...
 │     │
 │     ├── Jira
 │     │    ├── ...
 │     │
 │     ├── img
 │          ├── ...
 │
 │
 ├─ backend
 │     │
 │     ├── gradle
 │     │     ├──wrapper
 │     │     	   ├── gradle-wrapper.jar
 │     │     	   ├── gradle-wrapper.properties
 │     │
 │     ├── src
 │     │     ├── main
 │     │     	    ├── generated
 │     │     	    ├── resources
 │     │     	    │           ├── static
 │     │     	    │                ├── img
 │     │     	    │	                    ├── ...
 │     │     	    ├── java
 │     │                ├── com
 │     │     	               ├── a505
 │     │                           ├── hobby
 │     │                                 ├── article
 │     │     	                           ├── common
 │     │     	                           ├── hobby
 │     │     	                           ├── hobbyarticle
 │     │     	                           ├── hobbyarticlecomment
 │     │     	                           ├── hobbyarticleimg
 │     │     	                           ├── hobbyarticlelike
 │     │     	                           ├── hobbymember
 │     │     	                           ├── hobbypostit
 │     │     	                           ├── hobbypostitrecord
 │     │     	                           ├── item
 │     │     	                           ├── jwt
 │     │     	                           ├── member
 │     │     	                           ├── pending
 │     │     	                           ├── security
 │     │     	                           ├── HobbyitApplication.java
 │     │
 │     ├── .gitignore
 │     ├── build.gradle
 │     ├── gradlew
 │     ├── gradlew.bat
 │     ├── settings.gradle
 │
 │ 
 ├─ HobbyIT(FE)
 │     ├─ README.md
 │     │
 │     ├─ public
 │     │      ├─ assets
 │     │              ├─ fonts
 │     │              │    ├─ ...
 │     │              │
 │     │              ├─ gif
 │     │              │    ├─ ...
 │     │              │
 │     │              ├─ postit
 │     │              │    ├─ ...
 │     │              │
 │     │              ├─ ...
 │     │
 │     ├── src
 │     │       ├── api
 │     │       │       ├── common
 │     │       │       │      ├── ...
 │     │       │       │
 │     │       │       ├── ...
 │     │       │
 │     │       ├── components
 │     │       │       ├── VideoChat
 │     │       │       │      ├── ...
 │     │       │       │
 │     │       │       ├── modals
 │     │       │       │      ├── ...
 │     │       │       │
 │     │       │       ├── no-content
 │     │       │       │      ├── ...
 │     │       │       │
 │     │       │       ├── ...
 │     │       │
 │     │       ├── layouts
 │     │       │       ├── default
 │     │       │              ├── ...
 │     │       │
 │     │       ├── plugins
 │     │       │       ├── index.js
 │     │       │       ├── vuetify.js
 │     │       │       ├── webfontloader.js
 │     │       │
 │     │       ├── router
 │     │       │       ├── index.js
 │     │       │
 │     │       ├── store
 │     │       │       ├── app.js
 │     │       │       ├── index.js
 │     │       │       ├── message.js
 │     │       │       ├── user.js
 │     │       │
 │     │       ├── styles
 │     │       │       ├── settings.scss
 │     │       │
 │     │       ├── views
 │     │       │       ├── ...
 │     │       │
 │     │       ├── App.vue
 │     │       ├── main.js
 │     │
 │     ├── ...
 │     │
``` 


## ✔️ 협업 툴
- GitLab
- Notion
- Figma
- JIRA
- MatterMost
- Webex

## ✔️ 협업 환경
- GitLab
    - 코드의 버전 관리
    - 개발 이슈 관리 및 해결을 위한 회의
    - MR과 팀원의 코드리뷰
- Notion
    - 기획 단계에서 도출된 아이디어 정리
    - 회의록과 팀미팅을 기록하여 의견과 해결사항을 정리
    - 팀 그라운드 룰을 정리
    - Jira 일정 계획 수립
    - Git Commit 컨벤션 정리
    - 참고자료 정리
    - Back-end, Front-end, AI 별 개발 이슈 정리
    - API 상태 코드 정리
- Figma
    - UI/UX에 초점을 둔 실시간 협업
    - Next Novel 만의 디자인과 메인 컬러 지정
    - 애니메이션, gif 이미지 활용
    - 목업과 와이어프레임 정리
- Jira
    - 일주일 단위로 프로젝트 일정 관리
    - 23.02.27 ~ 23.04.07 기간의 일정 관리
    - 기획, 설계, 개발, 발표, 회의, 내부 행사 등

## ✔️ 프로젝트 산출물
- [기능 명세서](https://chipped-cart-851.notion.site/a96e0e004e4c4f39bab65fa821f4825f?v=f77e4329cc5e4b4fbb3a73894ba13c8c)
- [API 명세서](https://chipped-cart-851.notion.site/838d5959ec264671ac3dc8410c0983fa?v=56e9cb334ec14ee4a3634693dba9cced)
- 와이어 프레임
- ER-Diagram

## ✔️ 프로젝트 결과물
- 포팅메뉴얼
- 중간발표 자료
- 최종 발표 자료

## 🎲 Next Novel 서비스 화면


<hr>
