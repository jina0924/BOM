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

```js
// src/pages/Main.js

...
  useEffect(() => {
    requestPatientList(now, 8, patientListSuccess, patientListFail);
    return () => {
      for (let timer of patientListTimerID.current) {
        clearTimeout(timer);
      }
      patientListTimerID.current = [];
    };
  }, [now]);

  const patientListTimerID = useRef([]);

  function patientListSuccess(res) {
    setPatientList(res.data.results);
    setCount(res.data.count);
    for (let timer of patientListTimerID.current) {
      clearTimeout(timer);
    }
    patientListTimerID.current = [];
    if (now === res.data.now) {
      const timerID = setTimeout(
        requestPatientList,
        10000,
        now,
        8,
        patientListSuccess,
        patientListFail
      );
      patientListTimerID.current = [...patientListTimerID.current, timerID];
    }
  }
...
```

- 방법
  1. `useEffect`에 `API`요청 함수를 호출함
  2. 응답을 성공적으로 받아오면 `setTimeout`을 걸어 요청 주기를 생성함
     - `setInterval`을 사용하지 않은 이유 : 요청의 응답이 오기 전에 요청을 보내는 중복을 막기 위해
  3. 재요청을 보내기 전 중복요청을 막기 위해 이전에 있던 타이머 초기화
  4. 페이지를 벗어나면 요청을 보내지 않기 위해 `useEffect`의 `return`값으로 `clearTimeout`함수를 걸어둠

#### useRef

- 정의
  - 동적으로 상태관리를 할 수 있게 함
  - `.current` 프로퍼티에 변경 가능한 값을 담고 있는 "상자"
- `useState`와의 차이
  - `useState` : 값이 변경되면 리렌더링
  - `useRef` : 상태가 변해도 리렌더링x -> 렌더링이 필요하지 않은 상태값의 경우 `useRef`쓰는 것이 나을수도

#### unmount 효과

- 방법
  - `useEffect`에서 함수를 반환(`cleanup`함수)
  - 의존성 배열에 걸린 값이 변경되면 `useEffect`는 다시 콜백을 실행하는데, 실행하기 전 콜백의 리턴값을 실행함



### React 컴포넌트 마운트 효과

