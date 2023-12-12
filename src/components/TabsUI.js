import React from "react";

import {
  Dialog,
  DialogContentContainer,
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
  context,
  tabsData,
  setActiveTabData,
  url,
  setUrl,
  handleUnfurl,
  setShowEditUrlModal,
  setShowEditNameModal,
  setShowDeleteTabModal,
}) => {
  const theme = context?.theme;

  return (
    <TabsContext className="tabs-context--wrapper">
      <TabList className="tabs-list--wrapper">
        {tabsData.map((tabData, index) => (
          <Tab
            className="tab--wrapper"
            tabInnerClassName={
              theme === "light" ? "tab-inner" : "tab-inner-dark"
            }
            key={index}
            onClick={() => setActiveTabData(tabData)}
          >
            <p className="tab-label--wrapper">{tabData.label}</p>
            {tabData.mode !== "add" && (
              <MenuButton
                className={
                  theme === "light"
                    ? "menu-button--wrapper"
                    : "menu-button--wrapper-dark"
                }
              >
                <div>
                  <DialogContentContainer
                    className={
                      theme === "dark" && "dialog-content--wrapper-dark"
                    }
                  >
                    <Menu
                      id="menu"
                      size="medium"
                      className={
                        theme === "dark" && "dialog-content--wrapper-dark"
                      }
                    >
                      {tabData.mode === "edit" && (
                        <MenuItem
                          className={
                            theme === "dark" && "menu-item--wrapper-dark"
                          }
                          icon={Edit}
                          iconType="SVG"
                          onClick={() => {
                            setShowEditUrlModal(true);
                          }}
                          title="Edit URL"
                        />
                      )}
                      <MenuItem
                        className={
                          theme === "dark" && "menu-item--wrapper-dark"
                        }
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
                          className={
                            theme === "dark" && "menu-item--wrapper-dark"
                          }
                          icon={ItemDefaultValues}
                          iconType="SVG"
                          onClick={() => setShowEditNameModal(true)}
                          title="Rename"
                        />
                      )}
                      {tabData.mode === "edit" && <MenuDivider />}
                      {tabData.mode === "edit" && (
                        <MenuItem
                          className={
                            theme === "dark" && "menu-item--wrapper-dark"
                          }
                          icon={Delete}
                          iconType="SVG"
                          onClick={() => setShowDeleteTabModal(true)}
                          title="Delete"
                        />
                      )}
                    </Menu>
                  </DialogContentContainer>
                </div>
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
                context={context}
                url={url} // Passing url state as prop
                handleUrlChange={setUrl} // Passing setUrl function as prop to handle URL changes
                handleUnfurl={() => handleUnfurl(url)} // Passing handleUnfurl function as prop to handle unfurl action
              />
            ) : (
              <IframeDisplay context={context} iframeSrc={tabData.iframeSrc} />
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </TabsContext>
  );
};

export default TabsUI;
