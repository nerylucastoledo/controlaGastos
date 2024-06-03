import Dashboard from "./Pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login";
import CreateAccount from "./Pages/createAccount/CreateAccount";
import NotFound from "./Pages/notFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
