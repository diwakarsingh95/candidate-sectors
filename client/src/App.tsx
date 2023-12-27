import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CandidatePage from "./pages/CandidatePage";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="mt-16 sm:mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate/:id" element={<CandidatePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
