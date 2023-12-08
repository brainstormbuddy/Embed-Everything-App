import mondaySdk from "monday-sdk-js";

const IFRAME_API_KEY = "b6d5558d9a46ee224656f2ddb58b1d9b";
const MONDAY_API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMwMDkxMDI4NSwiYWFpIjoxMSwidWlkIjo1Mjc0Nzc1MywiaWFkIjoiMjAyMy0xMi0wNlQwMDo1OTowMi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjAxMzQ1OTEsInJnbiI6ImV1YzEifQ.9IH0y_PFnCBVJmPJXyjpjYQG5Rsq4UVDPu-8icjez4Q";

const monday = mondaySdk();
monday.setToken(MONDAY_API_TOKEN);

export const fetchBoardData = async (boardId, itemId) => {
  const query = `
    query {
      boards(ids:[${boardId}]) {
        columns { type title id }
        items(ids:[${itemId}]) {
          column_values { id text }
        }
      }
    }
  `;
  const response = await monday.api(query);
  console.log("PG_EA:: fetchBoardData", response);
  return response.data.boards[0];
};

export const fetchIframelyData = async (url) => {
  const response = await fetch(
    `https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(url)}
    &key=${IFRAME_API_KEY}&iframe=1&omit_script=1`
  );
  const data = await response.json();
  console.log("PG_EA:: fetchIframelyData", data);
  return data.html;
};
