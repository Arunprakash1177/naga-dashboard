import DashboardCard from "../components/DashboardCard";


export default function Dashboard() {
return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
<DashboardCard title="Nextiva Report">Coming soon...</DashboardCard>
<DashboardCard title="Office 365 Report">Loading soon...</DashboardCard>
<DashboardCard title="Regal Report">Fetching...</DashboardCard>
</div>
);
}