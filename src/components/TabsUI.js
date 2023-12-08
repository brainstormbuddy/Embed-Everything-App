import React from "react";
import {
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "monday-ui-react-core";

import InputForm from "./InputForm";
import IframeDisplay from "./IframeDisplay";

const TabsUI = ({ tabsData, url, setUrl, handleUnfurl }) => {
  return (
    <TabsContext>
      <TabList id="tab-list">
        {tabsData.map((tabData, index) => (
          <Tab id={index} value={index}>
            {tabData.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabsData.map((tabData, index) => (
          <TabPanel id={index} index={index}>
            {tabData?.mode === "add" ? (
              <InputForm // Rendering InputForm component
                url={url} // Passing url state as prop
                handleUrlChange={setUrl} // Passing setUrl function as prop to handle URL changes
                handleUnfurl={() => handleUnfurl(url)} // Passing handleUnfurl function as prop to handle unfurl action
              />
            ) : (
              <IframeDisplay iframeSrc={tabData.iframeSrc} />
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </TabsContext>
  );
};

export default TabsUI;
