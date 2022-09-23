import React, { useState, useEffect } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import CreateTodo from "./components/CreateTodo";

const api_base = "https://vishal-todo-app.herokuapp.com";

function App() {
  
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");

  const GetTodos = async () => {
    const { data } = await axios.get(api_base + "/todos");
    data.map((val) =>
      setList((oldList) => {
        return [...oldList, { task: val.task, id: val._id }];
      })
    );
  };

  useEffect(() => {
    GetTodos();
  }, []);

  return (
    <div>
      <Header />

      <div className="container">
        <div className="todos">
          <CreateTodo hook1={[item, setItem]} hook2={[list, setList]} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default App;
