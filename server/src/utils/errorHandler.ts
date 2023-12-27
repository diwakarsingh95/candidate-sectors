import HttpException from "../exceptions/httpException";

type ErrorResponseProps = {
  statusCode: number;
  message: string;
  error?: Error;
};

export const errorHandler = ({
  statusCode,
  message,
  error,
}: ErrorResponseProps) => {
  const responseError = new HttpException(statusCode, message, error);
  return responseError;
};
