import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AccessCosmos from './pages/AccessCosmos';
import AppNavBar from './pages/AppNavBar';


export default function App() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppNavBar />}>
            <Route index element={<Home />} />
            <Route path="/cosmos" element={<AccessCosmos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
