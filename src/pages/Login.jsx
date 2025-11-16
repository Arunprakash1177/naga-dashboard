import LoginForm from "../components/LoginForm";


export default function Login() {
return (
<div className="flex items-center justify-center h-screen bg-gray-100">
<div className="bg-white p-10 rounded-2xl shadow-xl w-96">
<h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
<LoginForm />
</div>
</div>
);
}