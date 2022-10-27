import React from "react";
import { UilTable } from "@iconscout/react-unicons";

function DownloadBtn({ onClickFunction }) {
  return (
    <button
      className="flex justify-center items-center px-8 py-2 rounded-xl bg-white shadow-bg ml-5"
      onClick={onClickFunction}
    >
      <UilTable className="pr-2 text-font1" />
      <span className="text-font1 text-sm">XLS</span>
    </button>
  );
}

export default DownloadBtn;
