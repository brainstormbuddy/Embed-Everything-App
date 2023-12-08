// Importing necessary hooks and utilities from React and local files
import { useCallback } from "react";
import { fetchIframelyData } from "../helpers/api";

// Defining a custom hook called useDataHooks
export const useDataHooks = (url, tabsData, setTabsData) => {
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
            mode: "write",
            label: `Tab-${tabsData.length - 1}`,
            url: url,
            iframeSrc: iframeData,
          },
          {
            mode: "add",
            label: "Add",
          },
        ]);

        // await saveTabsData(storageKey, tabsData);
      } catch (error) {
        console.log(error);
      }
    },
    // Specifying dependencies for the useCallback hook
    [url, setTabsData, tabsData.length]
  );

  // Return an object containing the handleUnfurl, fetchLinkColumnUrls, and fetchIframeSrc functions,
  // so they can be used in the component that calls useDataHooks.
  return { handleUnfurl };
};
