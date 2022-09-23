import React from "react";
import "../style.css";
import axios from "axios";

const api_base = "https://vishal-todo-app.herokuapp.com";

// const client = axios.create({
//   baseURL: api_base,
// });

function CreateTodo(props) {
  const [item, setItem] = props.hook1;
  const [list, setList] = props.hook2;

  const setTheItem = (e) => {
    if (e.target.value !== "") {
      setItem(e.target.value);
    }
  };

  //Add Item
  const addItem = (e) => {
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


    //attempt 1 
    // const headers = { "Content-Type": "application/json" };
    // axios
    //   .post(
    //     `${api_base}/todos/new`,
    //     {
    //       body: JSON.stringify({ task: item }),
    //     },
    //     headers
    //   )
    //   // .then((res) => res.json())
    //   .then((data) =>
    //     setList((oldList) => {
    //       return [...oldList, { task: data.task, id: data._id }];
    //     })
    //   )
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    //attempt 2
      // axios({
      //   method: 'post',
      //   url: `${api_base}/todos/new`,
      //   data: JSON.stringify({ task: item }),
      //   headers: {
      //   'Content-Type': 'application/json'
      //   }, 
      // })
      // .then((res) => res.json())
      // .then((data) =>
      //   setList((oldList) => {
      //     return [...oldList, { task: data.task, id: data._id }];
      //   })
      // )
      // .catch((err) => console.error("Not connected"));

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
