// Importing necessary hooks and utilities from React and local files
import { useCallback } from "react";
import { fetchBoardData, fetchIframelyData } from "../helpers/api";
import { generateStorageKey } from "../helpers/utils";
import { saveTabsData } from "../helpers/storage";

export const useTabs = (
  context,
  url,
  tabsData,
  setTabsData,
  activeTabData,
  editUrl,
  editName
) => {
  const storageKey = generateStorageKey(context);

  const handleUnfurl = useCallback(
    async (urlToUnfurl) => {
      // Checking if the URL is empty
      if (!urlToUnfurl.trim()) {
        console.log("URL cannot be empty");
        return;
      }

      // Defining a regular expression pattern to validate the URL
      const urlPattern =
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
      // Checking if the URL matches the pattern
      if (!urlPattern.test(urlToUnfurl)) {
        console.log("Invalid URL");
        return;
      }

      try {
        const iframeData = await fetchIframelyData(url);

        await setTabsData((previousData) => [
          ...previousData.slice(0, -1),
          {
            mode: "edit",
            label: `Tab-${tabsData.length - 1}`,
            url: url,
            iframeSrc: iframeData,
          },
          {
            mode: "add",
            label: "Add",
          },
        ]);

        await saveTabsData(storageKey, tabsData);
      } catch (error) {
        console.log(error);
      }
    },
    // Specifying dependencies for the useCallback hook
    [url, storageKey, tabsData, setTabsData]
  );

  // The fetchLinkColumnUrls function is a memoized function that fetches URLs from link columns.
  const fetchLinkColumnUrls = useCallback(async () => {
    try {
      // Destructure boardId and itemId from the context object.
      const { boardId, itemId } = context;

      const tabsData = [];

      // Fetch board data using a helper function.
      const boardData = await fetchBoardData(boardId, itemId);

      // Filter out columns of type 'link' from the board data.
      const linkColumns = boardData?.columns?.filter(
        (column) => column.type === "link"
      );

      // Map over link columns to process each one and return an array of promises.
      const linkDataPromises = linkColumns.map(async (linkColumn) => {
        // Get the ID of the current link column.
        const linkColumnId = linkColumn.id;

        // Get the first item of the board.
        const item = boardData.items[0];

        // Find the column value object that matches the link column ID.
        const linkColumnValue = item.column_values.find(
          (column_value) => column_value.id === linkColumnId
        );

        // Check if linkColumnValue and its text property exist.
        if (linkColumnValue && linkColumnValue.text) {
          // Extract URL from the text property of linkColumnValue.
          const textSegments = linkColumnValue.text.split(" - ");
          const label = textSegments[0];
          const url = textSegments[textSegments.length - 1];
          const iframeData = await fetchIframelyData(url);

          await tabsData.push({
            mode: "read",
            label: label,
            url: url,
            iframeSrc: iframeData,
          });
          // If existing tab data is found, update tabsData state without fetching.
        } else {
          // Set error state if no URL is found in the link column.
          console.log("No URL found in link column");
        }
      });

      // Wait for all promises in linkDataPromises array to resolve.
      await Promise.all(linkDataPromises);
      await tabsData.push({
        mode: "add",
        label: "Add",
      });
      await setTabsData(tabsData);
      await saveTabsData(storageKey, tabsData);
    } catch (error) {
      // Set error state and log error to console if any part of the process fails.
      console.error(error);
    }
  }, [context, storageKey, setTabsData]); // Dependencies for useCallback

  const handleEditUrl = useCallback(async () => {
    try {
      const indexToUpdate = tabsData.findIndex(
        (tab) =>
          tab.mode === activeTabData.mode &&
          tab.label === activeTabData.label &&
          tab.url === activeTabData.url
      );

      if (indexToUpdate !== -1) {
        const iframeData = await fetchIframelyData(editUrl);
        // Create a copy of tabsData and replace the item at the found index with activeTabData
        const updatedTabsData = [...tabsData];
        updatedTabsData[indexToUpdate] = {
          mode: activeTabData.mode,
          label: activeTabData.label,
          url: editUrl,
          iframeSrc: iframeData,
        };
        await setTabsData(updatedTabsData);
        await saveTabsData(storageKey, updatedTabsData);
      }
    } catch (error) {
      // Set error state and log error to console if any part of the process fails.
      console.error(error);
    }
  }, [
    tabsData,
    activeTabData.mode,
    activeTabData.label,
    activeTabData.url,
    editUrl,
    setTabsData,
    storageKey,
  ]);

  const handleEditName = useCallback(async () => {
    try {
      const indexToUpdate = tabsData.findIndex(
        (tab) =>
          tab.mode === activeTabData.mode &&
          tab.label === activeTabData.label &&
          tab.url === activeTabData.url
      );

      if (indexToUpdate !== -1) {
        // Create a copy of tabsData and replace the item at the found index with activeTabData
        const updatedTabsData = [...tabsData];
        updatedTabsData[indexToUpdate] = {
          mode: activeTabData.mode,
          label: editName,
          url: activeTabData?.url,
          iframeSrc: activeTabData.iframeSrc,
        };
        await setTabsData(updatedTabsData);
        await saveTabsData(storageKey, updatedTabsData);
      }
    } catch (error) {
      // Set error state and log error to console if any part of the process fails.
      console.error(error);
    }
  }, [
    tabsData,
    activeTabData.mode,
    activeTabData.label,
    activeTabData.url,
    activeTabData.iframeSrc,
    editName,
    setTabsData,
    storageKey,
  ]);

  const handleDeleteTab = useCallback(async () => {
    try {
      const updatedTabsData = tabsData.filter((tab) => tab !== activeTabData);
      await setTabsData(updatedTabsData);
      await saveTabsData(storageKey, updatedTabsData);
    } catch (error) {
      console.log(error);
    }
  }, [tabsData, setTabsData, storageKey, activeTabData]);

  return {
    handleUnfurl,
    fetchLinkColumnUrls,
    handleEditUrl,
    handleEditName,
    handleDeleteTab,
  };
};
