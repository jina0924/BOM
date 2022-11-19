import React from "react";
import { UilTable } from "@iconscout/react-unicons";

function DownloadBtn({ onClickFunction }) {
  return (
    <button
      className="flex justify-center items-center px-4 py-2 h-[2rem] rounded-xl bg-white text-font1 shadow-bg ml-5 hover:bg-[#4F9DA6]/20 hover:text-[#4F9DA6]"
      onClick={onClickFunction}
    >
      <UilTable className="pr-2 " size={22} />
      <span className="text-xs">XLS</span>
    </button>
  );
}

export default DownloadBtn;
