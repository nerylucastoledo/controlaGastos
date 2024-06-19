import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.scss"
import "./style/global.scss"

import { CreateAccount } from "./pages/createAccount/CreateAccount.tsx";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Report } from "./pages/report/Report";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./utils/PrivateRoute";
import { Login } from "./pages/login/Login";
import { NewPeople } from "./components/NewPeople/NewPeople";
import { NewCategory } from "./components/NewCategory/NewCategory";
import { NewCard } from "./components/NewCard/NewCard";
import NotFound from "./pages/notFound/NotFound";
import Invoice from "./pages/Invoice/Invoice";
import NewBill from "./pages/NewBill/NewBill";

import { DataContextProvider } from "./context/Data";

export const App = () => {
  return (
    <BrowserRouter>
      <NewPeople />
      <NewCard />
      <NewCategory />
      <DataContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/invoice/:name_card" element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }/>
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
          <Route path="/new-bill" element={
            <ProtectedRoute>
              <NewBill />
            </ProtectedRoute>
          } />
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}