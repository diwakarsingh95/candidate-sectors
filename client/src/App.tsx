import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CandidatePage from "./pages/CandidatePage";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="mt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate/:id" element={<CandidatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
