// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/tokens";
import "monday-ui-react-core/dist/main.css";

import InputForm from "./components/InputForm";
import TabsUI from "./components/TabsUI";
import MenuComponent from "./components/MenuComponent";
import { useTabs } from "./hooks/useTabs";

import {
  Modal,
  ModalContent,
  ModalFooterButtons,
  TextField,
} from "monday-ui-react-core";

const monday = mondaySdk(); // Initializing the Monday SDK

// Main App component
const App = () => {
  // Defining state variables using the useState hook
  const [context, setContext] = useState(null); // State to hold the context object from Monday SDK
  const [activeTabData, setActiveTabData] = useState([]);
  const [tabsData, setTabsData] = useState([]); // State to store tab labels and iframe sources
  const [url, setUrl] = useState("");

  const [showEditUrlModal, setShowEditUrlModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showDeleteTabModal, setShowDeleteTabModal] = useState(false);
  const [editUrl, setEditUrl] = useState(activeTabData?.url);
  const [editName, setEditName] = useState("");

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

  const {
    handleUnfurl,
    fetchLinkColumnUrls,
    handleEditUrl,
    handleEditName,
    handleDeleteTab,
  } = useTabs(
    context,
    url,
    tabsData,
    setTabsData,
    activeTabData,
    editUrl,
    editName
  );

  console.log("tabsData App==>", tabsData);
  console.log("context ==>", context);

  return (
    <div className="App">
      {tabsData.length === 0 ? (
        <InputForm
          url={url}
          handleUrlChange={setUrl}
          handleUnfurl={() => handleUnfurl(url)}
        />
      ) : (
        <TabsUI
          tabsData={tabsData}
          setActiveTabData={setActiveTabData}
          url={url}
          setUrl={setUrl}
          handleUnfurl={handleUnfurl}
          setShowEditUrlModal={setShowEditUrlModal}
          setShowEditNameModal={setShowEditNameModal}
          setShowDeleteTabModal={setShowDeleteTabModal}
        />
      )}
      <MenuComponent monday={monday} />

      {/* Edit URL Modal  */}
      <Modal
        contentSpacing
        id="story-book-modal"
        onClose={() => setShowEditUrlModal(false)}
        title="Edit URL"
        show={showEditUrlModal}
      >
        <ModalContent>
          <p>Please enter a publicly accessible URL to embed:</p>
          <TextField
            value={editUrl}
            onChange={setEditUrl}
            className="input-field"
            size={TextField.sizes.SMALL}
          />
        </ModalContent>
        <ModalFooterButtons
          onPrimaryButtonClick={() => {
            handleEditUrl();
            setShowEditUrlModal(false);
          }}
          onSecondaryButtonClick={() => setShowEditUrlModal(false)}
          primaryButtonText="Ok"
          secondaryButtonText="Cancel"
        />
      </Modal>

      {/* Edit Name Modal */}
      <Modal
        contentSpacing
        id="story-book-modal"
        onClose={() => setShowEditNameModal(false)}
        title="Edit Name"
        show={showEditNameModal}
      >
        <ModalContent>
          <TextField
            value={editName}
            onChange={setEditName}
            className="input-field"
            size={TextField.sizes.MEDIUM}
          />
        </ModalContent>
        <ModalFooterButtons
          onPrimaryButtonClick={() => {
            handleEditName();
            setShowEditNameModal(false);
          }}
          onSecondaryButtonClick={() => setShowEditNameModal(false)}
          primaryButtonText="Ok"
          secondaryButtonText="Cancel"
        />
      </Modal>

      {/* Delete Tab Modal */}
      <Modal
        contentSpacing
        id="story-book-modal"
        onClose={() => setShowDeleteTabModal(false)}
        title="Delete Tab"
        show={showDeleteTabModal}
      >
        <ModalContent>
          <p>Are you sure you want to delete this tab?</p>
        </ModalContent>
        <ModalFooterButtons
          onPrimaryButtonClick={() => {
            handleDeleteTab();
            setShowDeleteTabModal(false);
          }}
          onSecondaryButtonClick={() => setShowDeleteTabModal(false)}
          primaryButtonText="Delete"
          secondaryButtonText="Cancel"
        />
      </Modal>
    </div>
  );
};

export default App;
