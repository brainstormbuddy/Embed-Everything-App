import React from "react";

import {
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  MenuButton,
  Menu,
  MenuItem,
  MenuDivider,
} from "monday-ui-react-core";
import {
  Delete,
  Edit,
  ExternalPage,
  ItemDefaultValues,
} from "monday-ui-react-core/icons";

import InputForm from "./InputForm";
import IframeDisplay from "./IframeDisplay";

const TabsUI = ({
  tabsData,
  setActiveTabData,
  url,
  setUrl,
  setEditUrl,
  setEditName,
  handleUnfurl,
  setShowEditUrlModal,
  setShowEditNameModal,
  setShowDeleteTabModal,
}) => {
  return (
    <TabsContext className="tabs-context--wrapper">
      <TabList className="tabs-list--wrapper">
        {tabsData.map((tabData, index) => (
          <Tab
            className="tab--wrapper"
            tabInnerClassName="tab-inner"
            key={index}
            onClick={() => setActiveTabData(tabData)}
          >
            <p className="tab-label--wrapper">{tabData.label}</p>
            {tabData.mode !== "add" && (
              <MenuButton className="menu-button--wrapper">
                <Menu
                  className="dialog-content--wrapper"
                  id="menu"
                  size="medium"
                  tabIndex="-1"
                >
                  {tabData.mode === "edit" && (
                    <MenuItem
                      icon={Edit}
                      iconType="SVG"
                      onClick={() => {
                        setEditUrl(tabData?.url);
                        setShowEditUrlModal(true);
                      }}
                      title="Edit URL"
                    />
                  )}
                  <MenuItem
                    icon={ExternalPage}
                    iconType="SVG"
                    onClick={() => {
                      window.open(tabData?.url, "_blank");
                    }}
                    title="Open URL in new tab"
                  />
                  {tabData.mode === "edit" && <MenuDivider />}
                  {tabData.mode === "edit" && (
                    <MenuItem
                      icon={ItemDefaultValues}
                      iconType="SVG"
                      onClick={() => {
                        setEditName(tabData?.label);
                        setShowEditNameModal(true);
                      }}
                      title="Rename"
                    />
                  )}
                  {tabData.mode === "edit" && <MenuDivider />}
                  {tabData.mode === "edit" && (
                    <MenuItem
                      icon={Delete}
                      iconType="SVG"
                      onClick={() => setShowDeleteTabModal(true)}
                      title="Delete"
                    />
                  )}
                </Menu>
              </MenuButton>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="tab-panels--wrapper">
        {tabsData.map((tabData, index) => (
          <TabPanel className="tab-panel--wrapper" key={index}>
            {tabData?.mode === "add" ? (
              <InputForm
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
