import React, { useState } from "react";
import { BACKEND_BASE_API } from "../helper";
import axios from "axios";
import "../style.css";

const api_base = BACKEND_BASE_API;

function CreateTodo(props) {
  const [item, setItem] = useState("");
  const [list, setList] = props.listHook;

  const setTheItem = (e) => {
    if (e.target.value !== "") {
      setItem(e.target.value);
    }
  };

  //Add Item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        api_base + "/todos/new",
        { task: item },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { data } = response; //or const data = response.data
      setList((oldList) => {
        return [...oldList, { task: data.task, id: data._id }];
      });
      document.getElementsByClassName("inputItem").task.value = "";
    } catch (error) {
      console.error("Not Able to push task to server");
    }
  };

  //Delete Item
  function delTodo(id) {
    setList((oldList) => {
      return oldList.filter((ele, idx) => {
        if (ele.id === id) {
          axios.delete(api_base + "/todos/delete/" + id, {
            headers: { "Content-Type": "application/json" },
            data: { id: id }
          })
          .catch((err) => console.error("Not able to delete error : " + err));
        }
        return ele.id !== id;
      });
    });
  }

  //create todo row
  function Todo(props) {
    return (
      <div className="todo">
        <div className="heading">{props.task}</div>
        <button className="del" onClick={() => delTodo(props.id)}>
          X
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new task here..."
        name="task"
        onChange={setTheItem}
        className="inputItem"
      />

      <button onClick={addItem} className="addItem">
        Add
      </button>

      {list.map((item, index) =>
        item.task !== "" &&
        (
          <Todo
            key={index}
            task={item.task}
            id={item.id}
          />
        )
      )}

    {/* 
      {list.forEach((item, idx) => {
        item.task !== "" && 
        (
          <Todo
            task={item.task}
            key={idx}
            id={item.id}
            DeleteItem={delTodo}
          />
        );
      })}

      Map loop is working fine but forEach is not working reason : 

      The reason why the forEach loop is not working in your code is because it doesn't return anything. 
      Unlike map, forEach doesn't return a new array of values, so you cannot use it to directly render a list of components.
      To use forEach, you would need to create an empty array and push the components into it 
      
    */}

    </div>
  );
}
export default CreateTodo;
