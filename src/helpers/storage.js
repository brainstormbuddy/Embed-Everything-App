import mondaySdk from "monday-sdk-js";

const monday = mondaySdk(); // Initializing the Monday SDK

export const saveTabsData = async (key, tabsData) => {
  return await monday.storage.instance
    .setItem(key, JSON.stringify(tabsData))
    .then((res) => {
      if (res.data && res.data.success) {
        console.log("TabsData saved successfully:", res.data);
      } else {
        console.error("Error saving TabsData:", res);
      }
    });
};

export const getTabsData = async (key) => {
  try {
    return await monday.storage.instance.getItem(key).then((res) => {
      if (res.data && res.data.success) {
        return res.data.value ? JSON.parse(res.data.value) : null;
      } else {
        console.error("Error retrieving TabsData:", res);
      }
    });
  } catch (error) {
    console.error("Exception encountered while retrieving TabsData:", error);
  }
};
