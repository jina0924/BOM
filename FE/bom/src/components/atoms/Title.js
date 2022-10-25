import React from "react";
// 병동 정보 , 입원환자수(환자목록) , 주치의 , 간호사 , 입원환자추이 , 병상가동률 , 체온 , 심박수 , 산소포화도 , 기기정보(BMS 정보)
import {
  UilHospital,
  UilMedicalDrip,
  UilUserMd,
  UilUserNurse,
  UilChartLine,
  UilBed,
  UilTemperatureHalf,
  UilHeartbeat,
  UilPercentage,
  UilMonitorHeartRate,
} from "@iconscout/react-unicons";

function Title({ iconTag, iconTagClassName, content, contentClassName }) {
  return (
    <>
      {iconTag === "UilHospital" && (
        <>
          <UilHospital className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilMedicalDrip" && (
        <>
          <UilMedicalDrip className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilUserMd" && (
        <>
          <UilUserMd className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilUserNurse" && (
        <>
          <UilUserNurse className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilChartLine" && (
        <>
          <UilChartLine className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilBed" && (
        <>
          <UilBed className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilTemperatureHalf" && (
        <>
          <UilTemperatureHalf className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilHeartbeat" && (
        <>
          <UilHeartbeat className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilPercentage" && (
        <>
          <UilPercentage className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
      {iconTag === "UilMonitorHeartRate" && (
        <>
          <UilMonitorHeartRate className={iconTagClassName} />
          <span className={contentClassName}>{content}</span>
        </>
      )}
    </>
  );
}
