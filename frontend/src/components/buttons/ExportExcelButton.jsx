import { Button } from "@mui/material";
import React from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { getFacultyStats } from "../../utils/analyticsMethods";

function ExportExcelButton() {
  return (
    <button className="secondary-btn" onClick={() => {}}>
      <PiMicrosoftExcelLogoFill size={20} />
      Export
    </button>
  );
}

export default ExportExcelButton;
