import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NextivaReport from "./pages/NextivaReport";
import OfficeReport from "./pages/OfficeReport";
import RegalReport from "./pages/RegalReport";
import Sidebar from "./components/Sidebar";
import useAuth from "./hooks/useAuth";


function AppContent() {
const { user } = useAuth();


if (!user) return <Login />;


return (
<div className="flex">
<Sidebar />
<div className="flex-1">
<Routes>
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/nextiva" element={<NextivaReport />} />
<Route path="/office" element={<OfficeReport />} />
<Route path="/regal" element={<RegalReport />} />
</Routes>
</div>
</div>
);}


export default function App() {
return (
<AuthProvider>
<AppContent />
</AuthProvider>
);
}