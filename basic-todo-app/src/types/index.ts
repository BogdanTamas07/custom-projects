export interface ItemProps {
  title: string;
  checked: boolean;
  disabled?: boolean;
  handleCheck?: () => void;
}

export interface GroupProps {
  items: ItemProps[];
  title: string;
  index?: number;
  disabled?: boolean[];
  setDisabled?: React.Dispatch<React.SetStateAction<any>>;
  setShownFact?: React.Dispatch<React.SetStateAction<any>>;
}

export interface ListProps {
  groups: GroupProps[];
}
