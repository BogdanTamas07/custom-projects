import { useState, useEffect } from "react";
import "../styles/global.scss";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Item from "./Item";
import { GroupProps } from "../types";
import { getDisabledElements } from "../utils";
import { STORAGE_LIST, RANDOM_FACT_URL } from "../constants";

const Group: React.FC<GroupProps> = ({
  title: groupTitle,
  items = [],
  index = 0,
  disabled = [],
  setDisabled = (_value: boolean[]) => {},
  setShownFact = (_value: string) => {},
}) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    const list = localStorage.getItem(STORAGE_LIST);
    if (list) {
      const parsedList = [...JSON.parse(list)[index].items];
      setChecked(parsedList.map(({ checked }) => checked));
      setCompleted(parsedList.every(({ checked }) => checked));
    }
  }, [index]);

  const handleChange = async (itemIndex: number) => {
    const list = localStorage.getItem(STORAGE_LIST);

    if (list) {
      const parsedList = [...JSON.parse(list)];
      const storageItems = [...parsedList[index].items];
      storageItems[itemIndex].checked = !storageItems[itemIndex].checked;
      parsedList[index].items = storageItems;

      const isCompleted = storageItems.every(({ checked }) => checked);

      setChecked(storageItems.map(({ checked }) => checked));
      setCompleted(isCompleted);
      const disabledElements = getDisabledElements(parsedList);
      if (
        parsedList.every(({ items = [] }) =>
          items.every(({ checked }) => checked)
        )
      ) {
        fetch(RANDOM_FACT_URL)
          .then((res) => res.json())
          .then(({ text: fact }) => setShownFact(fact));
      }
      setDisabled(disabledElements);
      localStorage.setItem(STORAGE_LIST, JSON.stringify(parsedList));
    }
  };

  return (
    <Box className="flex">
      <Box className="flex_center_with_gap">
        <p className="number">{index + 1}</p>
        <p className="title">{groupTitle}</p>
        {completed && <CheckIcon fontSize="large" sx={{ mt: 1 }} />}
      </Box>
      <Box
        className={`flex group-wrapper ${disabled[index] ? "disabled" : ""}`}
      >
        {items.map(({ title }: { title: string }, itemIndex) => (
          <Item
            title={title}
            checked={checked[itemIndex]}
            disabled={disabled[index]}
            handleCheck={() => handleChange(itemIndex)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Group;
