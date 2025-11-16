import { useEffect, useState } from "react";
import { getNextivaData } from "../api/nextiva";


export default function NextivaReport() {
const [data, setData] = useState([]);


useEffect(() => {
getNextivaData().then(setData);
}, []);


return <pre className="p-6">{JSON.stringify(data, null, 2)}</pre>;
}