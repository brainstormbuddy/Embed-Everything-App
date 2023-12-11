import React from "react";

const IframeDisplay = ({ iframeSrc }) => {
  return !iframeSrc ? (
    <div className="no-iframe-section">Embed not available</div>
  ) : (
    <div
      className="iframe-container"
      dangerouslySetInnerHTML={{ __html: iframeSrc }}
    />
  );
};

export default IframeDisplay;
