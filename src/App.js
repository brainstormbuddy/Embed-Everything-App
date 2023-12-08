// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

import InputForm from "./components/InputForm";
import TabsUI from "./components/TabsUI";
import { useTabs } from "./hooks/useTabs";
import { useDataHooks } from "./hooks/useDataHooks";

const monday = mondaySdk(); // Initializing the Monday SDK

// Main App component
const App = () => {
  // Defining state variables using the useState hook
  const [context, setContext] = useState(null); // State to hold the context object from Monday SDK
  const [tabsData, setTabsData] = useState([]); // State to store tab labels and iframe sources
  const [url, setUrl] = useState("");

  // useEffect hook to execute certain operations on component mount
  useEffect(() => {
    monday.execute("valueCreatedForUser"); // Executing a Monday.com API operation
    monday.listen("context", (res) => {
      // Listening for context changes from Monday SDK
      setContext(res.data); // Updating context state with new data
      console.log("PG_EA:: context", res); // Logging the context data (for debugging purposes)
    });
  }, []); // Empty dependency array to run only once on mount

  // useEffect hook to fetch URLs from link columns when context state changes
  useEffect(() => {
    if (context) {
      // Checking if context is truthy
      switch (
        context.instanceType // Switch statement to handle different instance types
      ) {
        case "item_view":
          fetchLinkColumnUrls(); // Fetching URLs from link columns if instance type is 'item_view'
          break;
        default:
          break; // Default case (do nothing)
      }
    }
  }, [context]);

  const { fetchLinkColumnUrls } = useTabs(context, setTabsData);

  const { handleUnfurl } = useDataHooks(url, tabsData, setTabsData);

  console.log("tabsData App==>", tabsData);
  console.log("context ==>", context);

  return (
    <div className="App">
      {tabsData.length === 0 ? (
        <InputForm // Rendering InputForm component
          url={url} // Passing url state as prop
          handleUrlChange={setUrl} // Passing setUrl function as prop to handle URL changes
          handleUnfurl={() => handleUnfurl(url)} // Passing handleUnfurl function as prop to handle unfurl action
        />
      ) : (
        <TabsUI
          tabsData={tabsData}
          url={url}
          setUrl={setUrl}
          handleUnfurl={handleUnfurl}
        />
      )}
    </div>
  );
};

export default App;
