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



### jwt

- Headers

  | Key           | Type   | Description    |
  | ------------- | ------ | -------------- |
  | Authorization | String | Bearer {token} |



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
  | username  | String | 병동 로그인 아이디          | O         | sw509         |
  | password1 | String | 병동 로그인 비밀번호        | O         | xptmxmdlqslek |
  | password2 | String | 병동 로그인 비밀번호 재확인 | O         | xptmxmdlqslek |
  | number    | String | 병동 번호                   | O         | 509           |

- Response

  ```
  {
      "result": {
          "id": 29,
          "user": {
              "id": 66,
              "username": "sw509"
          },
          "number": "509",
          "userType": "ward"
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
  | number            | String | 병동 번호 입력하면 환자 번호로 자동 변경 | O         | 507           |
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
          "id": 38,
          "ward": {
              "id": 27,
              "number": "507"
          },
          "user": {
              "id": 67,
              "username": "225070038"
          },
          "name": "이지수",
          "number": "225070038",
          "hospitalizedDate": "2022-10-31",
          "dischargedDate": null,
          "birth": "1995-05-07",
          "sex": "F",
          "nokName": "정진아",
          "nokPhonenumber": "01012345678",
          "userType": "patient",
          "doctor": {
              "id": 1,
              "name": "이대현"
          }
      }
  }
  ```
  



# 2. 병동, 환자

### 로그인

- **trailing slash 주의!**

- 환자와 병동 모두 같은 api

- 재로그인시 access token, refresh token 모두 재발급

- POST

- URL

  ```
  http://127.0.0.1:8000/api/accounts/user/login/
  ```

- Body

  | Key      | Type   | Description     | Mandatory | Example       |
  | -------- | ------ | --------------- | --------- | ------------- |
  | username | String | 로그인 아이디   | O         | sw507         |
  | password | String | 로그인 비밀번호 | O         | xptmxmdlqslek |

- Response: 200 성공

  ```
  {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NTM4NjAzLCJpYXQiOjE2NjczNjU4MDMsImp0aSI6IjgxNjM4OWFlMTIyODQ5ZDM4MGM2N2IzMTMyMDc1YjM2IiwidXNlcl9pZCI6Mjd9.RPW3606gr4Zqd09iGjpNi3Go53K53Xlq1Egxctj8-Es",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2ODU3NTQwMywiaWF0IjoxNjY3MzY1ODAzLCJqdGkiOiJjMTRiNWUzNTEzYTQ0NzU4OWVhM2Y1MjY0ODBiM2VlMCIsInVzZXJfaWQiOjI3fQ.BdG2dkkmvsX6ySMEg69ayB6H-oKYntGpA_a3EYtKQ6o",
      "user": {
          "pk": 27,
          "username": "sw507",
          "email": "",
          "first_name": "",
          "last_name": ""
      }
  }
  ```



### 로그아웃: 수정 필요

- **trailing slash 주의!**

- 환자와 병동 모두 같은 api

- POST

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
- 발급된 access token의 키 값이 `access`임에 주의
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



### 유저 타입

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/accounts/user/usertype
  ```

- Response: 병동

  ```
  {
      "userType": "ward",
      "number": "507"
  }
  ```

- Response: 환자

  ```
  {
      "userType": "patient",
      "number": "225070001"
  }
  ```



# 3. 병동

### 환자 정보 상세 조회

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/patients/<str:patientNumber>
  ```

- URL example

  ```
  http://127.0.0.1:8000/api/wards/patients/225070001
  ```

- Response

  ```
  {
      "id": 1,
      "ward": {
          "id": 27,
          "number": "507"
      },
      "user": {
          "id": 28,
          "username": "225070001"
      },
      "name": "이지수",
      "number": "225070001",
      "hospitalizedDate": "2022-10-31",
      "dischargedDate": null,
      "birth": "1995-05-07",
      "sex": "F",
      "nokName": "정진아",
      "nokPhonenumber": "01012345678",
      "userType": "patient",
      "doctor": {
          "id": 1,
          "name": "이대현"
      }
  }
  ```



### 환자 체온 조회

- 실시간(now) + 기간(period)

- 기간 데이터는 오래된 데이터부터 최신 데이터 순으로 

- 기본: 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/patients/<str:patientNumber>/temperature
  ```

- URL example

  ```
  http://127.0.0.1:8000/api/wards/patients/225070001/temperature
  ```

  ```
  http://127.0.0.1:8000/api/wards/patients/225070001/temperature?period=month
  ```

- Params

  | Key    | Type   | Description                                 | Mandatory | Example |
  | ------ | ------ | ------------------------------------------- | --------- | ------- |
  | period | String | month<br />week<br />day<br />now (default) |           | month   |

- Response: month

  ```
  {
      "now": {
          "temperature": null,
          "now": null
      },
      "period": [
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-02"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-03"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-04"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-05"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-06"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-07"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-08"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-09"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-10"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-11"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-12"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-13"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-14"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-15"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-16"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-17"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-18"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-19"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-20"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-21"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-22"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-23"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-24"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-25"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-26"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-27"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-28"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-29"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-30"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-01"
          }
      ]
  }
  ```

- Response: week

  ```
  {
      "now": {
          "temperature": null,
          "now": null
      },
      "period": [
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-26 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-26 12:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-27 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-27 12:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-28 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-28 12:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-29 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-29 12:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-30 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-09-30 12:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-01 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-01 12:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 12:00:00"
          }
      ]
  }
  ```

- Response: day

  ```
  {
      "now": {
          "temperature": null,
          "now": null
      },
      "period": [
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-01 22:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-01 23:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 00:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 01:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 02:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 03:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 04:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 05:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 06:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 07:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 08:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 09:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 10:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 11:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 12:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 13:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 14:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 15:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 16:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 17:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 18:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 19:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 20:00:00"
          },
          {
              "maxTemperature": 0.0,
              "minTemperature": 0.0,
              "now": "2022-10-02 21:00:00"
          }
      ]
  }
  ```

- Response: now

  ```
  {
      "now": {
          "temperature": null,
          "now": null
      },
      "period": [
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:30:30"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:30:35"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:30:40"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:30:45"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:30:50"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:30:55"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:31:00"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:31:05"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:31:10"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:31:15"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:31:20"
          },
          {
              "temperature": 0.0,
              "now": "2022-10-02 22:31:25"
          }
      ]
  }
  ```



### 환자 심박수 조회

- 실시간(now) + 기간(period)

- 기간 데이터는 오래된 데이터부터 최신 데이터 순으로 

- 기본: 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/patients/<str:patientNumber>/bpm
  ```

- URL example

  ```
  http://127.0.0.1:8000/api/wards/patients/225070001/bpm
  ```

  ```
  http://127.0.0.1:8000/api/wards/patients/225070001/bpm?period=month
  ```

- Params

  | Key    | Type   | Description                                 | Mandatory | Example |
  | ------ | ------ | ------------------------------------------- | --------- | ------- |
  | period | String | month<br />week<br />day<br />now (default) |           | month   |



### 환자 산소포화도 조회

- 실시간(now) + 기간(period)

- 기간 데이터는 오래된 데이터부터 최신 데이터 순으로 

- 기본: 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/patients/<str:patientNumber>/oxygen-saturation
  ```

- URL example

  ```
  http://127.0.0.1:8000/api/wards/patients/225070001/oxygen-saturation
  ```

  ```
  http://127.0.0.1:8000/api/wards/patients/225070001/oxygen-saturation?period=month
  ```

- Params

  | Key    | Type   | Description                                 | Mandatory | Example |
  | ------ | ------ | ------------------------------------------- | --------- | ------- |
  | period | String | month<br />week<br />day<br />now (default) |           | month   |



### 병동 정보 조회: 수정 필요

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/<str:wardNumber>
  ```

- URL example

  ```
  http://127.0.0.1:8000/api/wards/507
  ```

- Response

  ```
  
  ```



### 환자 목록 조회: 수정 필요

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/patients
  ```

- Response

  ```
  
  ```



### 간호사 목록 조회

- 해당 병동에서 근무하는 간호사만 조회

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/nurse
  ```

- Response

  ```
  [
      {
          "id": 1,
          "name": "임진경",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/nurse/default.jpg",
          "phonenumber": "01012341234",
          "email": "nurse@gmail.com",
          "position": "간호과장"
      },
      {
          "id": 12,
          "name": "임진경",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/nurse/default.jpg",
          "phonenumber": "01012341234",
          "email": "nurse@gmail.com",
          "position": "수간호사"
      },
      {
          "id": 13,
          "name": "임진경",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/nurse/default.jpg",
          "phonenumber": "01012341234",
          "email": "nurse@gmail.com",
          "position": "책임간호사"
      },
      {
          "id": 22,
          "name": "임진경",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/nurse/default.jpg",
          "phonenumber": "01012341234",
          "email": "nurse@gmail.com",
          "position": "주임간호사"
      },
      {
          "id": 32,
          "name": "임진경",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/nurse/default.jpg",
          "phonenumber": "01012341234",
          "email": "nurse@gmail.com",
          "position": "평간호사"
      }
  ]
  ```



### 의사 목록 조회

- 해당 병동에 입원한 환자를 담당하는 의사만 조회

- access token 필요

- GET

- URL

  ```
  http://127.0.0.1:8000/api/wards/doctor
  ```

- Response

  ```
  [
      {
          "id": 1,
          "name": "이대현",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/doctor/default.jpg",
          "phonenumber": "01056785678",
          "email": "doctor@gmail.com",
          "department": "신경외과"
      },
      {
          "id": 2,
          "name": "이대현",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/doctor/default.jpg",
          "phonenumber": "01056785678",
          "email": "doctor@gmail.com",
          "department": "정형외과"
      },
      {
          "id": 4,
          "name": "이대현",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/doctor/default.jpg",
          "phonenumber": "01056785678",
          "email": "doctor@gmail.com",
          "department": "소아청소년과"
      },
      {
          "id": 7,
          "name": "이대현",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/doctor/default.jpg",
          "phonenumber": "01056785678",
          "email": "doctor@gmail.com",
          "department": "산부인과"
      },
      {
          "id": 21,
          "name": "이대현",
          "image": "https://thundervolt.s3.ap-northeast-2.amazonaws.com/doctor/default.jpg",
          "phonenumber": "01056785678",
          "email": "doctor@gmail.com",
          "department": "흉부외과"
      }
  ]
  ```

  

### BMS



### 알림 조회



### 알림 확인