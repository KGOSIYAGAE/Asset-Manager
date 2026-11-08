import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import ToastMessage from "../components/toastMessage/ToastMessage";
import ToastMessageBox from "../components/ToastMessageBox/ToastMessageBox";

const ToastBoxContext = createContext(null);

export function ToastBoxProvider({ children }) {
  const [toast, setToast] = useState({ isShown: false, type: "info", message: "", data: null });
  const timeoutRef = useRef(null);

  const hideToastBox = useCallback(() => {
    setToast((prev) => ({ ...prev, isShown: false }));
  }, []);

  const showToastBox = useCallback(
    (message, type = "info", duration = 10000) => {
      clearTimeout(timeoutRef.current);
      setToast({ isShown: true, type, message });
      timeoutRef.current = setTimeout(hideToastBox, duration);
    },
    [hideToastBox],
  );

  return (
    <ToastBoxContext.Provider value={{ showToastBox, hideToastBox }}>
      {children}
      <ToastMessageBox isShown={toast.isShown} type={toast.type} message={toast.message} onClose={hideToastBox} />
    </ToastBoxContext.Provider>
  );
}

export function useToastBox() {
  const ctx = useContext(ToastBoxContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
