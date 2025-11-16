import { createContext, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);


const login = (username, password) => {
if (username === "admin" && password === "admin") {
setUser({ username: "admin" });
return true;
}
return false;
};


const logout = () => setUser(null);


return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
);
};