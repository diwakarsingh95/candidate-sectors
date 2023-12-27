import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("ErrorBoundary caught an error: ", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl container px-6 mx-auto h-[calc(100vh-80px)]">
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-8xl">OOPS!</p>
            <p className="text-xl opacity-90 border-t-2 mt-2 py-2">
              Something went wrong!
            </p>
            <p className="opacity-90 mt-2 py-2">
              Go to{" "}
              <Link
                to="/"
                className="text-slate-900 hover:text-slate-700 font-semibold"
              >
                Home
              </Link>{" "}
              or{" "}
              <button
                className="text-slate-900 hover:text-slate-700 font-semibold"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>{" "}
              the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
