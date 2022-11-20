## FE Components 구조 및 설명

[TOC]

### Atoms

#### common

##### Btn.js

##### Input.js

##### MenuItem.js

- 메뉴 아이콘 + 텍스트

##### Title.js

- 아이콘 + 텍스트

##### Logo.js

##### LiveInfo.js

- 실시간 체온, 심박수 등등 실시간 정보들

##### Graph.js

- 선 두개 쓰이는 그래프만

##### DonutGraph.js

##### DownloadBtn.js

##### BMSIcon.js

- BMS 상세 조회에서 보여지는 실시간 정보 좌측의 동그라미 아이콘

##### ProfileImage.js

##### ContactBtn.js

##### PatientListInfo.js

- 환자 정보 한줄

##### PaginationNumber.js

##### Select.js



---

### Molecules

#### Common

##### SideBar.js

##### HeadBar.js

##### Pagination.js

##### PatientList.js

##### ProfileCard.js



#### Login

##### LoginCarousel.js

##### LoginForm.js



#### Main

##### HospitalInfoCard.js

- 병동정보, 입원 환자 수 등 카드 컴포넌트

##### PatientProgress.js

##### ActiveBed.js



#### PatientList

##### PatientSearchBar.js



#### PatientDetail

##### PatientDetailInfo.js

##### DeviceSummary.js

- 디바이스 정보 확대 전 도넛그래프

##### BodyInfo.js

- 체온, 심박수, 산소포화도를 보여주는 실시간 정보와 그래프를 합쳐놓은 molecules

##### LiveDeviceStatus.js

- 디바이스 정보 확대 후 상단의 실시간 정보

##### DeviceDetailInfo.js

- 디바이스 정보 확대 후 하단의 배터리 잔량, 전압을 표현한 시계열 그래프

#### 404

##### Mobile404.js

##### PC404.js



---

### Pages

URL : www.thundervolt.co.kr



#### Login.js

##### Web

##### Mobile

URL = URL + /login



#### Main.js

##### Web

URL = URL



#### PatientList.js

##### Web

URL = URL + /patients



#### PatientDetail.js

##### Web

##### mobile

URL = URL + /patient/:patientNumber



#### NurseList.js

##### Web

URL = URL + /nurses



#### DoctorList.js

##### Web

URL = URL + /doctors