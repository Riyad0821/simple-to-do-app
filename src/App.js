import { useState } from 'react';
import './App.css';

//To Do list component
function Todo({ todo, index, completeTodo, deleteTodo }) {
  return (
    <div className="todo-list" key={todo.task}>
      <input type="checkbox" checked={todo.isCompleted} onChange={() => completeTodo(index)} className="todo-list__checkbox" />
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

// const SearchBar = ({ input, setInput }) => {
//   const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
//   return (
//     <input
//       style={BarStyling}
//       key="random1"
//       value={input}
//       placeholder={"search country"}
//       onChange={(e) => setInput(e.target.value)}
//     />
//   );
// }

// Save tasks into local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}


function App() {
  const [todos, setTodos] = useLocalStorage("todoList", [
    { task: "Create todo app", isCompleted: false },
    { task: "Prepare for the interview", isCompleted: false }
  ]);

  let totalTask = todos.length;
  let completedTask = todos.filter(todo => todo.isCompleted).length;

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

  // const updateInput = async (input) => {
  //   const filtered = todos.filter(task => {
  //     return task.task.toLowerCase().includes(input.toLowerCase())
  //   })
  //   setInput(input);
  //   setTask(filtered);
  // }

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">Simple To Do Application</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-app__counter">
        <h2 className="todo-app__total">Total Tasks: {totalTask}</h2>
        <h2 className="todo-app__completed">Completed Tasks: {completedTask}</h2>
      </div>
      <div className="todo-app__list">
        {todos.map((todo, index) => (<Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}
        />
        ))}
      </div>
    </div>
  );
}

export default App;
