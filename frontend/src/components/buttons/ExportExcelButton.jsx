import { Button } from "@mui/material";
import React from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { getFacultyStats } from "../../utils/analyticsMethods";

function ExportExcelButton() {
  return (
    <button className="flex items-center text-blue-900 border border-blue-900 rounded-md px-2 py-1 gap-2 hover:bg-blue-900 hover:text-white hover:cursor-pointer" onClick={() => {}}>
      <PiMicrosoftExcelLogoFill size={22} />
      Export
    </button>
  );
}

export default ExportExcelButton;
