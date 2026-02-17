import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Colors from "./pages/Colors";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Travel from "./pages/Travel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Home />} index />
          <Route element={<About />} path="about" />
          <Route element={<Projects />} path="projects" />
          <Route element={<Travel />} path="travel" />
          <Route element={<Colors />} path="colors" />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
