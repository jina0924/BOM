# Trouble Shooting

[toc]

## FE

### axios 요청 구조

```js
// UserApi.js

import axios from "axios";

import ls from "helper/LocalStorage";

axios.defaults.withCredentials = true;

const UserApi = axios.create({
  baseURL: "https://thundervolt.co.kr/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

UserApi.interceptors.request.use(
  (config) => {
    const accessToken = ls.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default UserApi;
```

```js
// main.js

import UserApi from "api/UserApi";

function requestWardInfo(success, fail) {
  UserApi.get("wards/ward").then(success).catch(fail);
}

export { requestWardInfo };
```

#### interceptors

- 정의
  - `axios` 요청하기 직전, 응답을 받고 `then`, `catch`로 처리 직전에 가로챌 수 있는 기능
- 구성
  1. 인스턴스 : `const UserApi`
  2. request 설정 : `UserApi.interceptors.request.use`
  3. response 설정



#### withCredentials 옵션

- 정의
  - 다른 도메인(Cross Origin)에 요청을 보낼 때 요청에 인증(credential)정보를 담아서 보낼 지 결정하는 항목
  - 브라우저가 제공하는 요청 API들은 별도의 옵션 없이 브라우저의 쿠키와 같은 인증과 관련된 데이터를 함부로 요청 데이터에 담지 않도록 되어있음
  - 프론트와 백엔드 서버의 Origin이 다를 경우 백엔드에서 프론트에 쿠키를 생성하거나, 프론트에서 백엔드로 쿠키를 보내기 위해 추가 작업이 필요함 => `withCrecentials`
- 구성
  - 백엔드
    - `Access-Control-Allow-Credentials`헤더를 true로
  - 프론트엔드
    - `withCredentials`옵션을 true로



#### Content-Type

- 정의
  - API 연동시 reqest에 실어 보내는 데이터의 type 정보를 표현
  - `Contetn-Type`을 헤더에 명시하지 않으면 데이터를 받을 때 단순 텍스트 데이터로 인식함
- 종류
  - `application/json`
    - RestFul API에서 json 형태로 데이터가 오고갈 때 사용
  - `multipart/form-data`
    - 두 개 이상의 데이터를 구분해서 Request Body에 넣기 위해 사용
  - `image/png`
  - 등등



### useState 동기처리



### interval 요청



### React 컴포넌트 마운트 효과

