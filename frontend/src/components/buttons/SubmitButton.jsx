import React from "react";

function SubmitButton({ text, onClick }) {
  return (
    <button className="primary-btn" onClick={() => onClick()}>
      {text}
    </button>
  );
}

export default SubmitButton;
