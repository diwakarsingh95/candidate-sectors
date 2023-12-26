import { CSSProperties, useState } from "react";
import TreeSelect from "rc-tree-select/es/TreeSelect";
import {
  MdArrowRight,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdClear,
} from "react-icons/md";
import { IconType } from "react-icons";
import clsx from "clsx";
import treeData from "../../../data.json";
import { SECTOR_MAX_ERROR, REQUIRED_ERROR } from "../../utils/constants";

const getSvg = (
  Icon: IconType,
  iStyle: CSSProperties = {},
  style: CSSProperties = {}
) => (
  <i style={iStyle}>
    <Icon style={style} />
  </i>
);

const switcherIcon = (obj: {
  isLeaf?: boolean;
  selected?: boolean;
  expanded?: boolean;
}) => {
  if (obj.isLeaf) {
    if (obj.selected) return getSvg(MdCheckBox);
    else return getSvg(MdCheckBoxOutlineBlank);
  }
  return getSvg(
    MdArrowRight,
    { cursor: "pointer" },
    {
      transform: `rotate(${obj.expanded ? 90 : 0}deg)`,
    }
  );
};

const removeIcon = () => (
  <span className="ml-2 text-xs font-semibold leading-none align-middle cursor-pointer">
    X
  </span>
);

const SectorsTreeSelect = ({
  selectedData,
  setSelectedData,
  nameInputRef,
}: SectorTreeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onSelect = (value: string, data: SectorData) => {
    if (data.children && data.children.length) return;

    if (selectedData.value.length >= 5) {
      setSelectedData((prevState) => ({
        ...prevState,
        error: SECTOR_MAX_ERROR,
      }));
      setTimeout(
        () =>
          setSelectedData((prevState) => ({
            ...prevState,
            error: prevState.error !== SECTOR_MAX_ERROR ? prevState.error : "",
          })),
        2000
      );
      return;
    }

    setSelectedData((prevState) => ({
      value: [...prevState.value, value],
      error: "",
    }));
  };

  const onDeselect = (value: string) => {
    const error = selectedData.value.length <= 1 ? REQUIRED_ERROR : "";
    setSelectedData((prevState) => ({
      value: prevState.value.filter((v) => v !== value),
      error,
    }));
  };

  const onClear = () => setSelectedData({ error: REQUIRED_ERROR, value: [] });

  const onDropdownVisibleChange = (open: boolean) => {
    setIsOpen(open);
    if (open || selectedData.error) return;
    else {
      const error = !selectedData.value.length ? REQUIRED_ERROR : "";
      setSelectedData((prevState) => ({
        ...prevState,
        error,
      }));
    }
  };

  return (
    <TreeSelect
      open={isOpen}
      id="sectors"
      style={{ width: "100%" }}
      transitionName="rc-tree-select-dropdown-slide-up"
      choiceTransitionName="rc-tree-select-selection__choice-zoom"
      multiple
      value={selectedData.value}
      treeData={treeData}
      placeholder={selectedData.value.length ? "" : "Choose Sectors..."}
      onClick={() => nameInputRef.current?.blur()}
      onFocus={() => setIsOpen(true)}
      onDeselect={onDeselect}
      onSelect={onSelect}
      onClear={onClear}
      onDropdownVisibleChange={onDropdownVisibleChange}
      allowClear={{ clearIcon: MdClear }}
      treeDefaultExpandAll
      className={clsx(
        "border rounded-lg bg-white",
        isOpen && "border-2",
        selectedData.error && "border-red-500",
        isOpen && !selectedData.error && "border-sky-500"
      )}
      dropdownClassName="p-2 bg-gray-50 shadow-lg rounded-lg"
      showSearch={false}
      showTreeIcon={false}
      switcherIcon={switcherIcon}
      listHeight={400}
      maxTagTextLength={25}
      dropdownMatchSelectWidth={true}
      removeIcon={removeIcon}
      aria-invalid={!!selectedData.error}
    />
  );
};

export default SectorsTreeSelect;
