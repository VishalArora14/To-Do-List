import React from "react";
import "../style.css";

const api_base = "https://vishal-todo-app.herokuapp.com";

function CreateTodo(props) {
  const [item, setItem] = props.hook1;
  const [list, setList] = props.hook2;

  const setTheItem = (e) => {
    if (e.target.value !== "") {
      setItem(e.target.value);
    }
  };

  //Add Item
  const addItem = async (e) => {
    fetch(api_base + "/todos/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: item }),
    })
      .then((res) => res.json())
      .then((data) =>
        setList((oldList) => {
          return [...oldList, { task: data.task, id: data._id }];
        })
      )
      .catch((err) => console.error("Not connected"));

    document.getElementsByClassName("inputItem").task.value = "";
  };

  //Delete Item
  function delTodo(id) {
    setList((oldList) => {
      return oldList.filter((ele, idx) => {
        if (ele.id === id) {
          fetch(api_base + "/todos/delete/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
          }).catch((err) => console.error("Not connected"));
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
        <button className="del" onClick={() => props.DeleteItem(props.id)}>
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

      {list.map(
        (item, index) =>
          item !== "" && (
            <Todo
              task={item.task}
              key={index}
              id={item.id}
              DeleteItem={delTodo}
            />
          )
      )}
    </div>
  );
}
export default CreateTodo;
