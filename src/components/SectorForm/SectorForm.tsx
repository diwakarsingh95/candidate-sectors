import React, { useRef, useState } from "react";
import { NAME_REQUIRED_ERROR, SECTOR_REQUIRED_ERROR } from "../../constants";
import SectorTreeSelect from "../SectorTreeSelect";
import clsx from "clsx";
import { getNameError } from "../../utils/helpers";
import ErrorMessage from "../ErrorMessage";

const SectorForm = ({ onSubmit }: SectorFormProps) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [sectors, setSectors] = useState({
    value: [] as string[],
    error: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState<boolean | "error">(false);
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
    if (!value) setName({ ...name, error: NAME_REQUIRED_ERROR });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit...");
    if (!name.value && agreeToTerms === "error" && sectors.value.length) {
      setErrorAnimate(true);
      return;
    }
    if (!agreeToTerms || !sectors.value.length) {
      if (!agreeToTerms) {
        setAgreeToTerms("error");
      }
      if (!sectors.value.length)
        setSectors((prevState) => ({
          ...prevState,
          error: SECTOR_REQUIRED_ERROR,
        }));
      setErrorAnimate(true);
      setTimeout(() => setErrorAnimate(false), 1500);
      return;
    }

    onSubmit();
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
            "px-3 py-2 border rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
            name.error &&
              `border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500`
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
            errorAnimate && "animate-bounce",
            agreeToTerms === "error" && "text-red-500 font-semibold"
          )}
        >
          <input
            className="w-4 h-4 sm:text-xl mr-2 cursor-pointer"
            type="checkbox"
            checked={!!agreeToTerms && typeof agreeToTerms !== "string"}
            onChange={handleChange}
          />
          Agree to terms
        </label>
      </div>
      <button className="self-start py-[6px] px-3 mt-1 border rounded-lg text-white bg-sky-600 hover:bg-sky-700 disabled:bg-gray-500">
        Save
      </button>
    </form>
  );
};

export default SectorForm;
