import { Link } from "react-router-dom";


export default function Sidebar() {
return (
<div className="w-64 h-screen bg-gray-900 text-white p-5">
<h1 className="text-2xl font-bold mb-5">Naga Report</h1>
<nav className="flex flex-col gap-3">
<Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
<Link to="/nextiva" className="hover:text-blue-400">Nextiva Report</Link>
<Link to="/office" className="hover:text-blue-400">Office 365 Report</Link>
<Link to="/regal" className="hover:text-blue-400">Regal Report</Link>
</nav>
</div>
);
}