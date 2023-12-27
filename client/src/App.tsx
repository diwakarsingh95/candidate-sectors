import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import PageLoadingIndicator from "./components/PageLoadingIndicator";
import ErrorBoundary from "./components/ErrorBoundary";

const CandidatePage = lazy(() => import("./pages/CandidatePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <Suspense fallback={<PageLoadingIndicator />}>
          <main className="mt-14">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/candidate/:id" element={<CandidatePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
