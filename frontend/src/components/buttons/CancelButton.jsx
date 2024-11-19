import React from "react";

function CancelButton({ onClick }) {
  return (
    <button className="secondary-btn" onClick={() => onClick()}>
      Cancel
    </button>
  );
}

export default CancelButton;
