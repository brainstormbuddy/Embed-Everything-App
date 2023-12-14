// src/helpers/utils.js
export const generateStorageKey = (context) => {
  return `tabsData-${context?.account?.id}-${context?.instanceType}-${context?.boardId}-${context?.itemId}`;
};
