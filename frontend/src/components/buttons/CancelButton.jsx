import React from "react";

function CancelButton(handleCancel) {
  return (
    <button className="secondary-btn" onClick={() => handleCancel()}>
      Cancel
    </button>
  );
}

export default CancelButton;
