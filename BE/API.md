# 0. 목차

### 목차

[TOC]



### 시작하기

```bash
$ python -m venv venv
$ source venv/Scripts/activate
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py runserver
```



# 1. 원무과

### 병동 등록

- 병동 번호는 101부터 시작

- POST

- URL

  ```
  http://127.0.0.1:8000/api/wards/ward
  ```

- Body

  | Key       | Type   | Description                 | Mandatory | Example       |
  | --------- | ------ | --------------------------- | --------- | ------------- |
  | username  | String | 병동 로그인 아이디          | O         | ward101       |
  | password1 | String | 병동 로그인 비밀번호        | O         | xptmxmdlqslek |
  | password2 | String | 병동 로그인 비밀번호 재확인 | O         | xptmxmdlqslek |
  | number    | String | 병동 번호                   | O         | 101           |

- Response

  ```
  {
      "result": {
          "id": 1,
          "user": {
              "id": 1,
              "is_superuser": false,
              "username": "ward101",
              "is_staff": false
          },
          "number": "101"
      }
  }
  ```



### 환자 등록

- 환자 번호는 `{연도 2자리}{병동 3자리}{병동 별 0001부터 1씩 증가}`

- POST

- URL

  ```
  http://127.0.0.1:8000/api/wards/patient
  ```

- Body

  | Key               | Type   | Description                              | Mandatory | Example       |
  | ----------------- | ------ | ---------------------------------------- | --------- | ------------- |
  | username          | String | 환자 이름 입력하면 환자 번호로 자동 변경 | O         | 이지수        |
  | password1         | String | 환자 로그인 비밀번호                     | O         | xptmxmdlqslek |
  | password2         | String | 환자 로그인 비밀번호 재확인              | O         | xptmxmdlqslek |
  | name              | String | 환자 이름                                | O         | 이지수        |
  | number            | String | 병동 번호 입력하면 환자 번호로 자동 변경 | O         | 101           |
  | doctor            | Int    | 의사 번호                                | O         | 1             |
  | hospitalized_date | String | 입원날짜                                 | O         | 2022-10-31    |
  | birth             | String | 생년월일                                 | O         | 1995-05-07    |
  | sex               | String | 성별                                     | O         | F             |
  | nok_name          | String | 보호자 이름                              | O         | 정진아        |
  | nok_phonenumber   | String | 보호자 연락처                            | O         | 01012345678   |

- Response

  ```
  {
      "result": {
          "id": 1,
          "user": {
              "id": 2,
              "is_superuser": false,
              "username": "221010001",
              "is_staff": false
          },
          "ward": {
              "id": 1,
              "number": "101",
              "user": 1
          },
          "doctor": {
              "id": 1,
              "name": "권경민"
          },
          "name": "이지수",
          "number": "221010001",
          "hospitalized_date": "2022-10-31",
          "discharged_date": null,
          "birth": "1995-05-07",
          "sex": "F",
          "nok_name": "정진아",
          "nok_phonenumber": "01012345678"
      }
  }
  ```
  



# 2. 간호사, 보호자

### 로그인

- **trailing slash 주의!**

- 보호자(환자)와 병동 모두 같은 api

- 재로그인시 access token, refresh token 모두 재발급

- POST

- URL

  ```
  http://127.0.0.1:8000/api/accounts/user/login/
  ```

- Body

  | Key      | Type   | Description     | Mandatory | Example       |
  | -------- | ------ | --------------- | --------- | ------------- |
  | username | String | 로그인 아이디   | O         | ward101       |
  | password | String | 로그인 비밀번호 | O         | xptmxmdlqslek |

- Response (200 성공)

  ```
  {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MjI4NzkwLCJpYXQiOjE2NjcyMjY5OTAsImp0aSI6IjA3YzNjMWZlNzE5ZTQ4NGU4ZDk1ZGZmN2M0OWY2NjRjIiwidXNlcl9pZCI6MX0.2cm0FcE3S82fuNv2JfoPf_2JWRWSFyR06qWsYpXYYqU",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2NzMxMzM5MCwiaWF0IjoxNjY3MjI2OTkwLCJqdGkiOiJiOGM1OGU5M2UwMjY0MTEyOGIxNTMzMWIwMjBjMTE1ZCIsInVzZXJfaWQiOjF9.DVNOxhZOZvQ0xCzsPbyN5laMQY5pfKGwQjTaG8KbQH0",
      "user": {
          "pk": 1,
          "username": "ward101",
          "email": "",
          "first_name": "",
          "last_name": ""
      }
  }
  ```



### 로그아웃: 수정 필요

- **trailing slash 주의!**

- 보호자(환자)와 병동 모두 같은 api

- DELETE

- URL

  ```
  http://127.0.0.1:8000/api/accounts/user/logout/
  ```

- Response

  ```
  {
      "detail": "로그아웃되었습니다."
  }
  ```



### access token 재발급

- **trailing slash 주의!**
- access token이 만료되었을 때 (401) 재발급

- 유효한 refresh token 필요, refresh token이 유효하지 않다면 재로그인

- POST

- URL

  ```
  http://127.0.0.1:8000/api/accounts/user/token/refresh/
  ```

- Body

  | Key     | Type   | Description   | Mandatory | Example                                                      |
  | ------- | ------ | ------------- | --------- | ------------------------------------------------------------ |
  | Refresh | String | refresh token | O         | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2NzMxMTQ4NCwiaWF0IjoxNjY3MjI1MDg0LCJqdGkiOiI3N2RjNzU5NTgzODY0ODZiODU4ZDk2ZGQ3N2JhNTg2ZCIsInVzZXJfaWQiOjF9.26Eb7s9wCe2k9P9AahXql0sakBqFrwm8fl4O4mAZQV8 |

- Response

  ```
  {
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MjI1NjAxLCJpYXQiOjE2NjcyMjUwODQsImp0aSI6IjU0YjgzNzRjOWI3NDQ0OThhOTAzZGU5Yjk2ODk1MGQzIiwidXNlcl9pZCI6MX0.RQ3Cf7ktwIvN06bsYHkWBfDCHCtZPLgLaJVjukl4Z4k",
      "access_token_expiration": "2022-10-31T23:13:21.572744"
  }
  ```



### 환자 정보 상세 조회

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/patients/<str:patientNumber>
  ```

- URL example

  ```
  http://127.0.0.1:8000/api/wards/patients/221010001
  ```

- Response

  ```
  {
      "id": 1,
      "user": {
          "id": 2,
          "username": "221010001"
      },
      "ward": {
          "id": 1,
          "number": "101",
          "user": 1
      },
      "doctor": {
          "id": 1,
          "name": "권경민"
      },
      "name": "이지수",
      "number": "221010001",
      "hospitalized_date": "2022-10-31",
      "discharged_date": null,
      "birth": "1995-05-07",
      "sex": "F",
      "nok_name": "정진아",
      "nok_phonenumber": "01012345678"
  }
  ```



### 환자 건강 정보 조회

- 실시간 + 기간

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/patients/<str:patientNumber>/health
  ```

- URL example

  ```
  http://127.0.0.1:8000/api/wards/patients/221010001/health
  ```

- Response

  ```
  
  ```



# 3. 간호사

### 병동 정보 조회

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards
  ```

- Response

  ```
  
  ```



### 환자 목록 조회



### 간호사 목록 조회



### 의사 목록 조회