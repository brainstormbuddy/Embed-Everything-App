import React from "react";
import { Text } from "monday-ui-react-core";

const IframeDisplay = ({ iframeSrc }) => {
  return !iframeSrc ? (
    <Text className="no-iframe-section">Embed not available</Text>
  ) : (
    <div
      className="iframe-container"
      dangerouslySetInnerHTML={{ __html: iframeSrc }}
    />
  );
};

export default IframeDisplay;
