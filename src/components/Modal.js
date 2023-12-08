import React, { useState, useEffect, useRef, useCallback } from "react";

const Modal = () => {
  return (
    <div
      contentSpacing
      description="Subtitle description text goes here"
      id="story-book-modal"
      title="Modal title"
      style={{ display: "block", position: "initial" }}
    >
      <div>
        <p>Modal content goes here</p>
      </div>
      <button>Confirm</button>
      <button>Cancel</button>
    </div>
  );
};

export default Modal;
