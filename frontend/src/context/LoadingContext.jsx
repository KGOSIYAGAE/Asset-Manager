import { createContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { LoadingService } from "../utils/loadingService";
import ToastMessage from "../components/toastMessage/ToastMessage";

export const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  //Optional counter to avoid flicker when multiple requests run
  const [loadingCount, setLoadingCount] = useState(0);

  const showSpinner = () => {
    setLoadingCount((prev) => prev + 1);
    setSpinnerVisible(true);

    console.log("Loader Show");
  };

  const hideSpinner = () => {
    setLoadingCount((prev) => {
      const next = Math.max(prev - 1, 0);

      if (next === 0) {
        setSpinnerVisible(false);
      }

      return next;
    });
  };

  useEffect(() => {
    LoadingService.register(showSpinner, hideSpinner);
  }, []);

  return (
    <LoadingContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      {spinnerVisible && (
        <div
          className={`w-[300px] h-[60px] flex items-center p-2 bg-white rounded-md shadow-lg border border-zinc-100 fixed top-5 transition-all duration-300 z-50 opacity-100 right-6 cursor-none ${
            spinnerVisible ? "opacity-100 right-6" : "opacity-0 -right-96 pointer-events-none"
          }`}
        >
          <div className="flex gap-3">
            <TailSpin height="20" width="20" color="#94a3b8" ariaLabel="loading" className="bg-slate-400" />
            <div className="flex caret-transparent"> Loading .....</div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  box: {
    padding: 20,
    borderRadius: 12,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

/**
  <div style={styles.overlay}>
          <div style={styles.box}>
            <TailSpin height="60" width="60" color="#1e3a8a " ariaLabel="loading" />
          </div>
        </div>
 */
