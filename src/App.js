import { useState } from 'react';
import './App.css';

function Todo({ todo }) {
  return (
    <div className="todo">
      {todo.task}
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    addTodo(newTodo);
    console.log(newTodo);
    setNewTodo('');
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input className="todo-form__input" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button className="todo-form__submit" type="submit">Add Todo</button>
      </form>
    </div>
  );
}


function App() {
  const [todos, setTodos] = useState([
    { task: "Create todo app" },
    { task: "Prepare for the interview" }
  ]);

  const addTodo = task => {
    const newTodos = [...todos, { task }];
    setTodos(newTodos);
    console.log(newTodos);
  };

  return (
    <div className="">
      <div className="todo__list">
        {todos.map((todo, index) => (<Todo key={index} index={index} todo={todo}
        />
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
