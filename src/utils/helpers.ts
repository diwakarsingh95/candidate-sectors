import { NAME_INVALID_ERROR, NAME_REGEX, REQUIRED_ERROR } from "../constants";

export const getNameError = (value: string) => {
  return !value
    ? REQUIRED_ERROR
    : NAME_REGEX.test(value.trim())
    ? ""
    : NAME_INVALID_ERROR;
};
