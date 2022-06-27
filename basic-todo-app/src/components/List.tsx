import React, { useState, useEffect } from "react";
import "../styles/global.scss";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Group from "./Group";
import { ListProps } from "../types";
import { getDisabledElements } from "../utils";
import { STORAGE_LIST } from "../constants";

const List: React.FC<ListProps> = ({ groups = [] }) => {
  const [shownFact, setShownFact] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean[]>([]);

  useEffect(() => {
    const storageList = localStorage.getItem(STORAGE_LIST);
    if (!storageList) {
      localStorage.setItem(STORAGE_LIST, JSON.stringify(groups));
      return;
    }

    const parsedList = [...JSON.parse(storageList)];
    const disabledElements = getDisabledElements(parsedList);
    setDisabled(disabledElements);
  }, [groups]);

  return (
    <Box className="flex" sx={{ ml: 3 }}>
      <Snackbar
        open={!!shownFact}
        autoHideDuration={7500}
        message={shownFact}
        onClose={() => setShownFact("")}
      />
      {groups.map((props, index) => (
        <Group
          {...props}
          index={index}
          disabled={disabled}
          setDisabled={setDisabled}
          setShownFact={setShownFact}
        />
      ))}
    </Box>
  );
};

export default List;
