import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewData from "./pages/ViewData";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
