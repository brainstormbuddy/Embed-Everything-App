import React from "react";
import { Button, TextField } from "monday-ui-react-core";

const InputForm = ({ context, url, handleUrlChange, handleUnfurl }) => {
  const theme = context?.theme;

  return (
    <div className="input-container">
      <TextField
        className={theme === "dark" && "input-field-dark"}
        placeholder="Enter URL"
        value={url}
        onChange={handleUrlChange}
        size={TextField.sizes.MEDIUM}
      />
      <Button onClick={handleUnfurl} className="button">
        Embed
      </Button>
    </div>
  );
};

export default InputForm;
