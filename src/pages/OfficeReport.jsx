import { useEffect, useState } from "react";
import { getOfficeData } from "../api/office365";


export default function OfficeReport() {
const [data, setData] = useState([]);


useEffect(() => {
getOfficeData().then(setData);
}, []);


return <pre className="p-6">{JSON.stringify(data, null, 2)}</pre>;
}