import React, { useRef, useState } from "react";
import clsx from "clsx";
import { CgSpinner } from "react-icons/cg";
import { REQUIRED_ERROR } from "../../utils/constants";
import SectorTreeSelect from "../SectorTreeSelect";
import { getNameError } from "../../utils/helpers";
import ErrorMessage from "../ErrorMessage";

const SectorForm = ({
  candidateData,
  onSubmit,
  isSubmitting,
}: SectorFormProps) => {
  const [name, setName] = useState({
    value: candidateData?.name || "",
    error: "",
  });
  const candidateSectors = candidateData?.sectors.map((sector) => ({
    code: sector.value,
    id: sector._id,
  }));
  const [sectors, setSectors] = useState({
    value: candidateSectors || ([] as { code: string; id: string }[]),
    error: "",
  });
  const [agreedToTerms, setAgreeToTerms] = useState<boolean | "error">(
    candidateData?.agreedToTerms || false
  );
  const [errorAnimate, setErrorAnimate] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;

    if (currentTarget.type === "checkbox") {
      const { checked } = currentTarget;
      setAgreeToTerms(checked);
    } else {
      const { value } = currentTarget;

      setName({ value, error: getNameError(value) });
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (!value) setName({ ...name, error: REQUIRED_ERROR });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.value ||
      !agreedToTerms ||
      agreedToTerms === "error" ||
      !sectors.value.length
    ) {
      if (!agreedToTerms) {
        setAgreeToTerms("error");
      }
      if (!sectors.value.length)
        setSectors((prevState) => ({
          ...prevState,
          error: REQUIRED_ERROR,
        }));
      if (!name.value) setName({ ...name, error: REQUIRED_ERROR });
      setErrorAnimate(true);
      setTimeout(() => setErrorAnimate(false), 1500);
      return;
    }

    onSubmit({
      id: candidateData?._id,
      name: name.value,
      sectors: sectors.value.map((v) => v.id),
      agreedToTerms: !!agreedToTerms,
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-3 bg-gray-200 p-4 sm:p-6 rounded-xl shadow-md"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="sm:text-xl" htmlFor="name">
            Name:
          </label>
          <ErrorMessage
            show={!!name.error}
            message={name.error}
            animate={errorAnimate}
          />
        </div>
        <input
          className={clsx(
            "px-3 py-2 border rounded-lg focus:outline-none focus:ring-1",
            name.error
              ? "border-red-500 text-red-600  focus:border-red-500 focus:ring-red-500"
              : "focus:border-sky-500 focus:ring-sky-500"
          )}
          type="text"
          id="name"
          value={name.value}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!name.error}
          autoComplete="name"
          autoFocus
          ref={nameInputRef}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="sm:text-xl" htmlFor="sectors">
            Sectors:
          </label>
          <ErrorMessage
            show={!!sectors.error}
            message={sectors.error}
            animate={errorAnimate}
          />
        </div>
        <SectorTreeSelect
          selectedData={sectors}
          setSelectedData={setSectors}
          nameInputRef={nameInputRef}
        />
      </div>
      <div className="flex justify-between items-center">
        <label
          className={clsx(
            "leading-normal flex items-center cursor-pointer",
            errorAnimate && agreedToTerms === "error" && "animate-bounce",
            agreedToTerms === "error" && "text-red-500 font-semibold"
          )}
        >
          <input
            className="w-4 h-4 sm:text-xl mr-2 cursor-pointer"
            type="checkbox"
            checked={!!agreedToTerms && typeof agreedToTerms !== "string"}
            onChange={handleChange}
          />
          Agree to terms
        </label>
      </div>
      <button
        disabled={isSubmitting}
        className="self-start py-[6px] px-3 mt-1 border rounded-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-sky-900 disabled:bg-gray-500"
      >
        <div className="flex items-center gap-1">
          Save
          {isSubmitting && <CgSpinner className="animate-spin h-5 w-5" />}
        </div>
      </button>
    </form>
  );
};

export default SectorForm;
