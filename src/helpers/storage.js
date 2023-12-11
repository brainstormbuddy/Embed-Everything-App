import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
const MONDAY_API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMwMDkxMDI4NSwiYWFpIjoxMSwidWlkIjo1Mjc0Nzc1MywiaWFkIjoiMjAyMy0xMi0wNlQwMDo1OTowMi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjAxMzQ1OTEsInJnbiI6ImV1YzEifQ.9IH0y_PFnCBVJmPJXyjpjYQG5Rsq4UVDPu-8icjez4Q";

monday.setToken(MONDAY_API_TOKEN);

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
