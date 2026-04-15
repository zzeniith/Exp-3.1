import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setData(res.data.msg);
    };

    fetchData();
  }, []);

  return <h2>{data}</h2>;
}