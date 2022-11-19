# BOM

![BOM 로고 심볼](README.assets/BOM_l.jpg)

**BOM**은 메디컬 웨어러블 서비스로, **보다**라는 의미와 환자의 **봄**을 이중적으로 표현하고자 하였습니다. 본 프로젝트는 환자의 건강 정보를 모니터링해 실시간으로 위험을 감지할 수 있게 합니다. 또한 웨어러블 디바이스에서 필수적인 배터리 관리를 제공하며, 이 모든 정보를 웹을 통해 통합 관리할 수 있는 **웹 IoT 서비스**입니다.

<br>

---

[toc]

<br>

---

## 설치

> 자세한 내용은 [포팅 메뉴얼]() 참고

- FE

> 파일 위치 : ./FE/bom

```bash
// 로컬에서 이용시 설치
$ npm i
$ npm start
```

- BE

> 파일 위치 : ./BE

```bash
$ python manage.py runserver
```

<br>

---

## 사용 방법

사이트 주소 : https://thundervolt.co.kr

병동 로그인

```tex
ID : sw507
PASSWORD : xptmxmdlqslek
```

환자(보호자) 로그인

```tex
ID : 225070001
PASSWORD : xptmxmdlqslek
```

<br>

---

## Embeded

[boms 코드정보]()

[health 코드 정보]()

외관

<br>

---

## WEB

BOM은 크게 두가지 웹 서비스를 제공합니다.

1. 병동에서 사용하는 환자 모니터링 웹 서비스
2. 보호자 및 가족을 위한 환자 모니터링 모바일 웹 서비스

<br>

> 병동 웹서비스

<details>
<summary>로그인</summary>
<div markdown="1">
<img src="README.assets\login_gif.gif">
<br>
<br>
</div>
</details>
<details>
<summary>메인페이지</summary>
<div markdown="1">
<img src="README.assets\main.jpg">
<p>이곳에서 병동에 대한 정보를 확인할 수 있습니다.</p>
<span>- 상단부터 우측 하단까지 병동에 대한 데이터를 한눈에 파악하게 도와줍니다.</span><br>
<span>- 좌측 하단의 리스트를 통해 입원 환자들의 정보를 간략하게 살펴볼 수 있습니다.</span>
<br>
<br>
</div>
</details>
<details>
<summary>환자 목록 페이지</summary>
<div markdown="1">
<img src="README.assets\patients.jpg">
<img src="README.assets\patients_gif.gif">
<p>이곳에서 환자들에 대한 정보를 확인할 수 있습니다.</p>
<span>- 환자들의 정보를 검색하여 파악할 수 있고, 위험한 환자의 경우 따로 표시해줍니다.</span><br>
<span>- 또한 우측의 화살표 버튼을 통해 자동으로 넘어가는 캐로젤로 관제탑의 역할을 하는 페이지로 이동이 가능합니다.</span>
<br>
<br>
</div>
</details>
<details>
<summary>환자 상세 페이지</summary>
<div markdown="1">
<img src="README.assets\patient_detail_gif.gif">
<p>이곳에서 환자에 대한 상세 정보를 확인할 수 있습니다.</p>
<span>- 환자의 입원 정보와 생체신호(체온/심박수/산소포화도) 및 BMS정보(전압/온도 등) 을 파악할 수 있습니다..</span><br>
<span>- 또한 우측 상단의 버튼을 통해 기간 별로 데이터를 조회할 수 있고, 엑셀 다운로드 기능을 제공합니다.</span>
<br>
<br>
</div>
</details>
<details>
<summary>의사/간호사 목록 페이지</summary>
<div markdown="1">
<img src="README.assets\doctors.jpg">
<img src="README.assets\nurses.jpg">
<p>이곳에서 의사/간호사 목록을 확인할 수 있습니다.</p>
<span>- 툴팁을 통해 버튼에 마우스 오버하면 비상연락망을 확인할 수 있습니다.</span>
<br>
<br>
</div>
</details>

<br>

> 가족 모바일 웹서비스

<details>
<summary>환자 정보 조회</summary>
<div markdown="1">
<img src="README.assets\nok_mobile.gif">
<br>
<br>
</div>
</details>

<br>

### BE

[코드정보](./BE/)

[API.md](./BE/API.md) 참고

<br>

### FE

[코드정보](./FE/bom/)

> bom폴더에서 vscode 실행 후 api 연결 포트 선택

```bash
// ./FE/bom/src/api/UserApi.js

// 로컬에서 실행할 경우
baseURL: "http://127.0.0.1:8000/api/"

// 배포용 API 주소
baseURL: "https://thundervolt.co.kr/api/",
```

<br>

---

## Docs

[문서 모음](./Docs)

<br>

---

## ERD

[ERD]()

<br>

---

## Convention

[🔗 깃 컨벤션](./GitConvention.md)
[🔗 지라 컨벤션](./JiraConvention.md)

<br>

---

## 팀원

권경민(팀장)

- 담당 파트 : HW, FE
- 기타 : onshape (3D), 발표

김유민

- 담당 파트 : HW, BE
- 기타 : 회로 설계

문요성

- 담당 파트 : FE
- 기타 : Figma, PPT, 멘토링일지 관리, Readme

이지수

- 담당 파트 : BE
- 기타 : UCC

정진아

- 담당 파트 : FE
- 기타 : Figma, PPT
