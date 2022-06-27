import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ItemProps } from "../types";

const Item: React.FC<ItemProps> = ({
  title,
  checked = false,
  disabled = false,
  handleCheck,
}) => (
  <FormControlLabel
    label={title}
    control={
      <Checkbox checked={checked} disabled={disabled} onChange={handleCheck} />
    }
  />
);

export default Item;
