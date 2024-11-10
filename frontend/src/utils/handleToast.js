import { useState } from "react";

export const handleToastClose = (toastDispatch) => {
  toastDispatch({ type: "CLOSE", payload: { isShown: false, type: "", message: null } });
};
