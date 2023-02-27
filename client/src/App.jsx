import React, { useState, useEffect } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import CreateTodo from "./components/CreateTodo";
import { BACKEND_BASE_API } from "./helper";

const api_base = BACKEND_BASE_API;

function App() {
  const [list, setList] = useState([]);

  const GetInitialTodos = async () => {
    const { data } = await axios
      .get(api_base + "/todos")
      .catch((err) => console.log(err));

    const newList = data.map((val) => {
      return { task: val.task, id: val._id };
    });

    setList(newList);
  };

  useEffect(() => {
    GetInitialTodos();
  }, []);

  return (
    <div>
      <Header />

      <div className="container">
        <div className="todos">
          <CreateTodo listHook={[list, setList]} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default App;
