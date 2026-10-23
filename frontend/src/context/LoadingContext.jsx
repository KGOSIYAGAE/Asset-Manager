import { createContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { LoadingService } from "../utils/loadingService";

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
        <div style={styles.overlay}>
          <div style={styles.box}>
            <TailSpin height="60" width="60" color="#1e3a8a " ariaLabel="loading" />
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
