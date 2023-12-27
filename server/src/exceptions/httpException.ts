class HttpException extends Error {
  status: number;
  message: string;
  error?: Error;
  constructor(
    status: number = 500,
    message: string = "Something went wrong",
    error?: Error
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}

export default HttpException;
