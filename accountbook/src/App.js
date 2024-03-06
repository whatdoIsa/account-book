import axios from "axios";
import { useState, useRef, useCallback, useEffect } from "react";

import Template from "./components/Template";
// import CurrentStatusTemplate from "./components/CurrentStatusTemplate";
import ListTemplate from "./components/ListTemplate";
import Insert from "./components/Insert";

const App = () => {
  const [accData, setAccData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/accdata/list").then((response) => {
      setAccData(response.data);
    });
  }, []);

  const nextId = useRef(4);

  const onInsert = useCallback(
    async (date, divi, list, pay) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/accdata/insert",
          { date, divi, list, pay }
        );
        let current_id;
        await axios
          .get("http://localhost:8000/api/accdata/max_id/")
          .then((response) => {
            current_id = response.data.max_id + 1;
          });
        const acc = {
          id: current_id,
          date,
          divi,
          list,
          pay,
        };
        setAccData(accData.concat(acc));
      } catch (error) {
        console.error("Error creating acc:", error);
      }
    },
    [accData]
  );

  const onRemove = useCallback(
    async (id, date, divi, list, pay) => {
      try {
        const response = await axios.delete(
          "http://localhost:8000/api/accdata/delete/" + id
        );
        console.log("Item deleted:", response.data.message);
        setAccData(accData.filter((acc) => acc.id !== id));
      } catch (error) {
        console.error("Error deleting acc:", error);
      }
    },
    [accData]
  );

  const onUpdate = useCallback(
    async (id, date, divi, list, pay) => {
      try {
        const response = await axios.put(
          "http://localhost:8000/api/accdata/update/" + id,
          { date, divi, list, pay }
        );
        console.log("Item updated:", response.data.message);
        setAccData(
          accData.map((acc) =>
            acc.id === id
              ? { ...acc, date: date, divi: divi, list: list, pay: pay }
              : acc
          )
        );
      } catch (error) {
        console.error("Error updating acc:", error);
      }
    },
    [accData]
  );

  return (
    <Template>
      {/* <CurrentStatusTemplate accData={accData} /> */}
      <ListTemplate accData={accData} onUpdate={onUpdate} onRemove={onRemove} />
      <Insert onInsert={onInsert} />
    </Template>
  );
};

export default App;
