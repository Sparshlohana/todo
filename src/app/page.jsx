'use client'

import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, SendIcon } from "./components/icons/Icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [tasks, setTasks] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  const [getItems, setGetItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleTasksOnChange = (e) => {
    setTasks(e.target.value);
  }

  const errorToast = () => toast.error('🤬 Task already added!!', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const sucessToast = () => toast.success('Woah..! Task Added 😋', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const UpdateTask = () => toast.success('Task Updated Successfully..!! 😋', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const deleteToast = () => toast('Task Deleted 😥', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      let parsedTasks = JSON.parse(storedTasks);
      setTaskArr(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    setGetItems(taskArr); // Directly set getItems from taskArr
  }, [taskArr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasks.trim() !== "") {
      if (getItems.includes(tasks)) {
        errorToast();
      } else {
        if (editIndex !== null) { // If editing, update the task at editIndex
          const updatedTasks = [...getItems];
          updatedTasks[editIndex] = tasks;
          setTaskArr(updatedTasks);
          setEditIndex(null); // Reset editIndex after updating
          UpdateTask()
        } else {
          setTaskArr([...taskArr, tasks]);
          sucessToast();
        }
      }
      setTasks("");
    }
  }

  const handleEditTask = (index) => {
    setTasks(getItems[index]);
    setEditIndex(index);
  }


  const handleDeleteTask = (index) => {
    deleteToast();
    const updatedTasks = getItems.filter((_, i) => i !== index);
    setTaskArr(updatedTasks);
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="mt-3">
        <h1 className="text-[1.56rem] md:text-[1.8rem] text-center">Your ToDo List &#128071;</h1>
      </div>

      <div className="flex justify-center mt-10 flex-col items-center">
        <div className="border rounded-[10px] p-[10px] w-[90vw] md:w-[60vw] h-[75vh]">
          <div className="text-center">
            <h2 className="text-[1.5rem] md:text-[1.7rem]">Your tasks</h2>
          </div>
          {getItems?.map((item, index) => (
            <div className="flex items-center justify-between" key={item}>
              {editIndex === index ? ( // Render input field if currently editing this task
                <input
                  type="text"
                  value={tasks}
                  onChange={handleTasksOnChange}
                  className="bg-transparent border-none outline-none px-1 py-3 text"
                />
              ) : (
                <p className="text-lg md:text-xl px-1 py-3 break-all">&#10132; {item}</p>
              )}

              <div className="flex gap-3 items-center">
                {editIndex === index ? ( // Render SaveIcon if currently editing this task
                  <button onClick={handleSubmit}><SendIcon /></button>
                ) : (
                  <EditIcon onClick={() => handleEditTask(index)} className="w-6 fill-yellow-500 cursor-pointer" />
                )}
                <button onClick={() => handleDeleteTask(index)}><DeleteIcon /></button>
              </div>
            </div>
          ))}
        </div>
        <form action="/" onSubmit={handleSubmit}>
          <div className="mt-5 flex gap-[20px] items-center">
            <input
              className="w-[70vw] md:w-[40vw] text-black py-1 px-2 text-base md:text-lg outline-none rounded font-semibold"
              type="text"
              name="tasks"
              value={tasks}
              onChange={handleTasksOnChange}
              placeholder="Create your Task..."
            />
            <button type="submit"><SendIcon /></button>
          </div>
        </form>
      </div>
    </div>
  )
}
