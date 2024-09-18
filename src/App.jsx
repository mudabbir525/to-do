import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(false);
  // Load Todos from localStorage on component mount
  useEffect(() => {
    let todoString = localStorage.getItem("Todos");
    if (todoString) {
      let savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  // Function to save Todos to localStorage
  const saveToLS = (updatedTodos) => {
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  };

  const togglefinsih = (e)=>{
    setshowfinished(!showfinished);
  }

  const handleEdit = (e, id) => {
    let t = Todos.find(i => i.id === id);
    setTodo(t.Todo);
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos); // Save updated list to localStorage
  };

  const handleDelete = (e, id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if (isConfirmed) {
      let newTodos = Todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS(newTodos); // Save updated list to localStorage
    } else {
      console.log("Delete action was cancelled");
    }
  };

  const handleAdd = () => {
    if (Todo.trim() !== "") {
      let newTodos = [...Todos, { id: uuidv4(), Todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo("");
      saveToLS(newTodos); // Save updated list to localStorage
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = Todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos); // Save updated list to localStorage
  };

  return (
    <>
      <Navbar />
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 md:w-1/2'>
      <h1 className='font-bold text-center text-3xl'>Manage your tasks!</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Task</h2>
          <div className="flex">
          <input onChange={handleChange} value={Todo} type="text" className='w-full rounded-lg px-3 py-1' />
          <button onClick={handleAdd} disabled={Todo.length<=1} className='bg-violet-800 hover:bg-violet-700 p-4 py-2  text-white disabled:via-violet-200 font-bold rounded-full mx-2'>Add</button>
          </div>
        </div>
        <input onChange={togglefinsih} type="checkbox" checked={showfinished} /> Show finished
        <h2 className='text-lg font-bold'>Todos</h2>
        <div className="todos">
          {Todos.length === 0 && <div className='m-5'>No Tasks to display</div>}
          {Todos.map(item => ( (showfinished || !item.isCompleted) &&
            <div key={item.id} className="todo flex  my-3 justify-between">
              <div className='flex mx-1 gap-3'>
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through" : ""}> {item.Todo} </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-white font-bold rounded-md mx-1'><FaEdit/></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-white font-bold rounded-md mx-1'><AiFillDelete/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
