import { useState } from "react";
import useAuth from "../hooks/useAuth";


export default function LoginForm() {
const { login } = useAuth();
const [form, setForm] = useState({ username: "", password: "" });


const handleSubmit = (e) => {
e.preventDefault();
if (!login(form.username, form.password)) {
alert("Invalid credentials");
}
};


return (
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Username"
className="w-full p-3 border rounded-xl mb-4"
onChange={(e) => setForm({ ...form, username: e.target.value })}
/>
<input
type="password"
placeholder="Password"
className="w-full p-3 border rounded-xl mb-6"
onChange={(e) => setForm({ ...form, password: e.target.value })}
/>
<button className="w-full p-3 bg-blue-600 text-white rounded-xl">Login</button>
</form>
);
}