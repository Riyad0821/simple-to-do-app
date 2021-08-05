import { useState } from 'react';
import './App.css';

//To Do list component
function Todo({ todo, index, completeTodo, deleteTodo }) {
  return (
    <div className="todo-list" key={index}>
      <input type="checkbox" onChange={() => completeTodo(index)} className="todo-list__checkbox" />
      <p className="todo-list__item" style={{ color: todo.isCompleted ? "green" : "blue" }}>{todo.task}</p>
      <button className="todo-list__deleteBtn" onClick={() => deleteTodo(index)}>Delete</button>
    </div>
  );
}

//To do list form component
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
    { task: "Create todo app", isCompleted: false },
    { task: "Prepare for the interview", isCompleted: false }
  ]);

  const addTodo = task => {
    const newTodos = [...todos, { task }];
    setTodos(newTodos);
    console.log(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">Simple To Do Application</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-app__list">
        {todos.map((todo, index) => (<Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}
        />
        ))}
      </div>
    </div>
  );
}

export default App;
