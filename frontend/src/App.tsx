import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.scss"
import "./style/global.scss"

import Dashboard from "./pages/Dashboard/Dashboard";
import Report from "./pages/report/Report";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import NotFound from "./pages/NotFound/NotFound";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./utils/PrivateRoute";
import NewPeople from "./components/NewPeople/NewPeople";
import NewCategory from "./components/NewCategory/NewCategory";
import NewCard from "./components/NewCard/NewCard";
import { DataContextProvider } from "./context/Data";

function App() {
  return (
    <BrowserRouter>
    <DataContextProvider>
      <NewPeople />
      <NewCard />
      <NewCategory />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        } />
        <Route path="/config" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
      </Routes>
    </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
