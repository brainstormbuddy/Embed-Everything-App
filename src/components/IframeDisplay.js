import React from "react";

const IframeDisplay = ({ iframeSrc }) => {
  return !iframeSrc ? (
    <div>Embed not available</div>
  ) : (
    <div
      className="iframe-container"
      dangerouslySetInnerHTML={{ __html: iframeSrc }}
    />
  );
};

export default IframeDisplay;
