import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Create from "../components/crud/Create";
import Edit from "../components/crud/Edit";
import CreateRef from "../components/crud/CreateRef";
import Informasi from "../pages/Informasi";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informasi" element={<Informasi />} />
        <Route path="/services" element={<Services />} />
        {/* {CRUD  Routes} */}
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
