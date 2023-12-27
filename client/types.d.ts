type Sector = {
  _id: string;
  label: string;
  value: string;
  children?: Sector[];
};

type SectorFormProps = {
  onSubmit: (data: CandidateFormData) => Promise<void>;
  isSubmitting: boolean;
};

type SectorTreeSelectProps = {
  selectedData: {
    value: { code: string; id: string }[];
    error: string;
  };
  setSelectedData: React.Dispatch<
    React.SetStateAction<{
      value: { code: string; id: string }[];
      error: string;
    }>
  >;
  nameInputRef: React.MutableRefObject<HTMLInputElement | null>;
};

type Candidate = {
  _id: string;
  name: string;
  sectors: Sector[];
  agreedToTerms: boolean;
};

type CandidateFormResponse = {
  data?: Candidate;
  message: string;
  error: string;
  success: string;
};

type CandidateFormData = Omit<Candidate, "_id", "sectors"> & {
  sectors: string[];
};

type ErrorMessageProps = {
  show: boolean;
  message: string;
  animate?: boolean;
};
