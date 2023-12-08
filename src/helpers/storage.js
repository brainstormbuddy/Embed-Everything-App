import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export const saveTabsData = async (key, tabsData) => {
  try {
    console.log("Saving TabsData:", key, tabsData);
    const response = await monday.storage.instance.setItem(
      key,
      JSON.stringify(tabsData)
    );
    if (response.data && response.data.success) {
      console.log("TabsData saved successfully:", response.data);
    } else {
      console.error("Error saving TabsData:", response);
    }
  } catch (error) {
    console.error("Exception encountered while saving TabsData:", error);
  }
};

export const getTabsData = async (key) => {
  try {
    const response = await monday.storage.instance.getItem(key);
    console.log("Retrieved TabsData:", key, response);
    if (response.data && response.data.success) {
      return response.data.value ? JSON.parse(response.data.value) : null;
    } else {
      console.error("Error retrieving TabsData:", response);
    }
  } catch (error) {
    console.error("Exception encountered while retrieving TabsData:", error);
  }
  return null; // Return null if retrieval was unsuccessful or an exception occurred
};
