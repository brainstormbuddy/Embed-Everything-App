// Importing necessary hooks and utilities from React and local files
import { useCallback } from "react";
import { fetchBoardData, fetchIframelyData } from "../helpers/api";
import { generateStorageKey } from "../helpers/utils";

// Defining a custom hook called useDataHooks
export const useTabs = (context, setTabsData) => {
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
    } catch (error) {
      // Set error state and log error to console if any part of the process fails.
      console.error(error);
    }
  }, [context, setTabsData]); // Dependencies for useCallback

  return { fetchLinkColumnUrls };
};
