import { useState } from 'react';
import './App.css';

function Todo({ todo }) {
  return (
    <div className="todo">
      {todo.task}
    </div>
  );
}


function App() {
  const [todos, setTodos] = useState([
    { task: "Create todo app" },
    { task: "Prepare for the interview" }
  ]);
  return (
    <div className="">
      <div className="todo__list">
        {todos.map((todo, index) => (<Todo key={index} index={index} todo={todo}
        />
        ))}
      </div>
    </div>
  );
}

export default App;
