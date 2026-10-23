import React from "react";

function CancelButton({ onClick }) {
  return (
    <button className="cancel-btn" onClick={() => onClick()}>
      Cancel
    </button>
  );
}

export default CancelButton;
