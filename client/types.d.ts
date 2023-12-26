type SectorData = {
  label: string;
  value: string;
  children?: SectorData[];
};

type SectorFormProps = {
  onSubmit: () => Promise<void>;
};

type SectorTreeSelectProps = {
  selectedData: {
    value: string[];
    error: string;
  };
  setSelectedData: React.Dispatch<
    React.SetStateAction<{
      value: string[];
      error: string;
    }>
  >;
  nameInputRef: React.MutableRefObject<HTMLInputElement | null>;
};

type ErrorMessageProps = {
  show: boolean;
  message: string;
  animate?: boolean;
};
