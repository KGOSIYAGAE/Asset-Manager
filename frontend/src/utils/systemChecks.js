export const checkInternetConnection = (isOnline, setShowToast) => {
  if (navigator.onLine) {
    return setShowToast({ isShown: true, type: "success", message: "Internet connection restored" });
  } else {
    return setShowToast({ isShown: true, type: "error", message: "Check internet connection!!" });
  }
};
