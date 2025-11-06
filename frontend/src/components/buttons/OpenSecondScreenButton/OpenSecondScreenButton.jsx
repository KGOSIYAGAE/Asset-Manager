import React, { useState } from "react";
import SubmitButton from "../SubmitButton";

function OpenSecondScreenButton({ userId, deviceId, setShowToast, w = 800, h = 600 }) {
  const [error, setError] = useState("");

  async function openOnSecondScreen() {
    try {
      // 1. Check if Multi-Screen Window Placement API is supported
      if ("getScreenDetails" in window) {
        const details = await window.getScreenDetails(); // May trigger a permissions dialog

        const { screens, currentScreen } = details;

        if (screens.length < 2) {
          setShowToast({ isShow: true, type: "error", message: "Only one screen is detected, please connect second screen or Tablet." });
          throw new Error("Only one screen is detected.");
        }

        // 2. Choose a screen that isn't the current one
        //console.log(screens[1]);
        //const target = screens.find((s) => s.id !== currentScreen.id) || screens[0];
        const target = screens[1];

        // 3. Center the popup on the selected screen
        const left = target.left;
        const top = target.top;

        const url = `${window.location.origin}/user-form/${userId}/${deviceId}`;

        window.open(url, `childWindow`, `left=${left},top=${top},width=${target.width / 2},height=${target.height}`, `${target.label}`);
        return;
      }

      // 4. Fallback: open the new window offset to the right
      const left = window.screenX + window.innerWidth;
      const top = window.screenY;

      window.open("", "_blank", `left=${left},top=${top},width=${w},height=${h}`);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  }

  return (
    <>
      <SubmitButton text={"Continue to verification"} onClick={openOnSecondScreen} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default OpenSecondScreenButton;
