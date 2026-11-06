import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import ToastMessage from "../components/toastMessage/ToastMessage";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ isShown: false, type: "info", message: "", data: null });
  const timeoutRef = useRef(null);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isShown: false }));
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = 3000) => {
      clearTimeout(timeoutRef.current);
      setToast({ isShown: true, type, message });
      timeoutRef.current = setTimeout(hideToast, duration);
    },
    [hideToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastMessage isShown={toast.isShown} type={toast.type} message={toast.message} onClose={hideToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
