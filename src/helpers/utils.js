// src/helpers/utils.js
export const generateStorageKey = (context) => {
  const { instanceType, boardId, itemId } = context;
  return `tabsData-${instanceType}-${boardId}-${itemId}}`;
};
