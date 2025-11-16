export default function DashboardCard({ title, children }) {
return (
<div className="bg-white p-6 rounded-2xl shadow">
<h2 className="font-semibold text-xl mb-2">{title}</h2>
{children}
</div>
);
}