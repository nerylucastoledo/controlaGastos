import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "./App.scss"

import Dashboard from "./Pages/dashboard/Dashboard";
import Report from "./Pages/report/Report";
import Login from "./Pages/login/Login";
import CreateAccount from "./Pages/createAccount/CreateAccount";
import NotFound from "./Pages/notFound/NotFound";
import Config from "./Pages/config/Config";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/report" element={<Report />} />
        <Route path="/config" element={<Config />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
