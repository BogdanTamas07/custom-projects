import { GroupProps } from "../types";

export const checkCompleted = (array: boolean[]) => array.every((item) => item);
export const getDisabledElements = (parsedList: GroupProps[]) => {
  const array = parsedList.map(
    (_item, index) =>
      index > 0 && !parsedList[index - 1].items.every(({ checked }) => checked)
  );

  return array.map((item, index) => {
    if (index > 0) {
      return array[index - 1] || item;
    }
    return item;
  });
};
