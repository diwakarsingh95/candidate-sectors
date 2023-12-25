import clsx from "clsx";
import { ReactNode } from "react";

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
