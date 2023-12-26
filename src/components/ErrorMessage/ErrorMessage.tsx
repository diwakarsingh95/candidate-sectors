import { ReactNode } from "react";
import clsx from "clsx";

const ErrorMessage = ({
  show,
  message,
  animate,
}: ErrorMessageProps): ReactNode =>
  show && (
    <span
      className={clsx(
        "text-sm text-red-500 font-semibold text-end",
        animate && "animate-bounce"
      )}
    >
      {message}
    </span>
  );

export default ErrorMessage;
