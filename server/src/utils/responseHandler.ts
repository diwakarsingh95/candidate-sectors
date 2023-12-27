import { Response } from "express";

type SuccessResponseProps = {
  res: Response;
  data?: any;
  message?: string;
};

export const sendSuccessResponse = ({
  res,
  data = null,
  message = "Success",
}: SuccessResponseProps) => {
  const responseBody = { data, message, status: "success" };
  res.status(200).send(responseBody);
};
