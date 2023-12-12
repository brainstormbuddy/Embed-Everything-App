import React from "react";

const IframeDisplay = ({ context, iframeSrc }) => {
  const theme = context?.theme;

  return !iframeSrc ? (
    <div
      className={
        theme === "light" ? "no-iframe-section" : "no-iframe-section-dark"
      }
    >
      Embed not available
    </div>
  ) : (
    <div
      className="iframe-container"
      dangerouslySetInnerHTML={{ __html: iframeSrc }}
    />
  );
};

export default IframeDisplay;
