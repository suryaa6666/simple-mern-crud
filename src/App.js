import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  
  const [foodList, setFoodList] = useState([]);
  const [updateFoodName, setUpdateFoodName] = useState("");
  
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);
  
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };
  
  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };
  
  const updateItem = (id) => {
    Axios.put("http://localhost:3001/update" , {
      id: id,
      foodName: updateFoodName
    });
  };

  return (
    <div className="App">
      <h1> CRUD MERN APP</h1>

      <label> Food: </label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
        placeholder="Enter food name..."
      ></input>
      <label> Days : </label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
        placeholder="Enter days..."
      ></input>
      <button onClick={addToList}> Add To List </button>
      <h1> Food List </h1>
      {foodList.map((val, key) => {
        return (
          <div key={key} className="list">
            <h1> Food Name : {val.foodName} </h1>
            <h1> Days : {val.daysSinceIAte} </h1>
            <input
              type="text"
              onChange={(event) => {
                setUpdateFoodName(event.target.value);
              }}
              placeholder="New food name..."
            ></input>
            <button onClick={() => updateItem(val._id)}> Update </button> <br />
            <button onClick={() => deleteItem(val._id)}> Delete </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
