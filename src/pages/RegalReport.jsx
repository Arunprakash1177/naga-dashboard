import { useEffect, useState } from "react";
import { getRegalData } from "../api/regal";


export default function RegalReport() {
const [data, setData] = useState([]);


useEffect(() => {
getRegalData().then(setData);
}, []);


return <pre className="p-6">{JSON.stringify(data, null, 2)}</pre>;
}