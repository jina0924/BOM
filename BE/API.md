# 0. 목차

### 목차

[TOC]



### 시작하기

```bash
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
  | birth             | String |                                          | O         | 1995-05-07    |
  | sex               | String |                                          | O         | F             |
  | nok_name          | String |                                          | O         | 정진아        |
  | nok_phonenumber   | String |                                          | O         | 01012345678   |

- Response

  ```
  ```

  