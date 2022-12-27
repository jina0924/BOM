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



### JWT

#### JWT

- `JSON Web Token`
- 모바일이나 웹의 사용자 인증을 위해 사용하는 암호화된 토큰
- 인증 과정
  1. 유저가 로그인함
  2. 서버가 인증 정보를 보내줌
     - 암호화나 시그니처 추가가 가능한 데이터 패키지(=JWT) 안에 인증 정보를 담아 보냄
  3. 담기는 정보 중 `accessToken`과 `refreshToken`이 이후 유저 인증에 사용됨
     - `accessToken` : 일정 시간이 지나면 만료됨
     - `refreshToken` : 새로운 `accessToken`을 서버에 요청하는 토큰값. `refreshToken`사용은 옵션
  4. 이 정보를 클라이언트에 저장해둠
  5. `accessToken`을 유저에게만 보여줄 수 있는 정보에 접근할 때 서버에 보냄
  6. 서버는 해당 토큰이 유효한지 확인



#### XSS(Cross Site Scripting)

- `code injection attack`
- 공격자가 의도하는 악의적인 js 코드를 피해자 웹 브라우저에서 실행시키는 것
- 대부분의 웹 해킹 공격 기법과는 다르게 클라이언트를 대상으로 한 공격



#### CSRF(Cross Site Request Forgery)

- 정상적인 request를 가로채 피해자인척 하고 백엔드 서버에 변조된 request를 보내 악의적인 동작을 수행하는 공격
- 공격 과정
  1. 공격자는 유저가 `img`를 열람하도록 하거나 `link`를 클릭하도록 유도
  2. 이 action은 사용자 의도와는 관계없이 http request를 보냄
  3. 유저가 로그인 되어있는 상태라면 이 request는 정상적으로 서버에 동작을 수행



#### Cookie

- 클라이언트가 서버에 방문한 정보를 클라이언트에 저장하는 작은 파일
- 클라이언트의 브라우저 메모리 혹은 하드디스크에 저장
- 매번 서버에 전송되므로 크기가 클 경우 서버에 부담이 갈 수 있음
- 대략 4KB까지의 데이터를 저장할 수 있음
- 유효 기간이 존재



**장점**

- 대부분의 브라우저가 지원
- 데이터 유효기간 지정 가능
- XSS (사이트 간 악성 Js 코드를 심는 행위)로부터 안전
  - 서버에서 쿠키의 httpOnly 옵션을 설정하면, Js에서 쿠키에 접근 자체 불가능



#### Web Storage

- 클라이언트에 데이터를 저장할 수 있도록 HTML5부터 새롭게 지원하는 저장소
- 키(Key)와 값(Value)의 쌍 형태로 데이터를 저장
- 서버에 전송되지 않으므로 서버에 부담x
- 대략 5MB까지의 데이터를 저장할 수 있음
- 유효 기간이 존재하지 않음



**장점**

- 서버에 불필요하게 데이터 저장x
- 넉넉한 데이터 저장 용량
- 문자열 외에도 자바스크립트의 모든 원시형 데이터와 객체 저장 가능
- 도메인 단위로 접근이 제한되는 CORS 특성 덕분에 CSRF로부터 안전

https://velog.io/@hs0217/%EC%BF%A0%ED%82%A4-%EB%A1%9C%EC%BB%AC-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%84%B8%EC%85%98-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80

https://it-eldorado.tistory.com/90

https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0#-%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-%ED%85%8C%EC%8A%A4%ED%8C%85%ED%95%98%EB%A0%A4%EB%A9%B4

https://velog.io/@0307kwon/JWT%EB%8A%94-%EC%96%B4%EB%94%94%EC%97%90-%EC%A0%80%EC%9E%A5%ED%95%B4%EC%95%BC%ED%95%A0%EA%B9%8C-localStorage-vs-cookie

