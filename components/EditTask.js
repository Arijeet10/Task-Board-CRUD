"use client";

import { updateTaskRequest } from "@/app/api_requests/request";
import Image from "next/image";
import { useEffect, useState } from "react";

const EditTask = ({ task,closeEditModal }) => {

  const _id=task._id;
  

  const [status,setStatus]=useState("");
  const [priority,setPriority]=useState("");
  const [updatedTask,setUpdatedTask]=useState([]);
  const [message,setMessage]=useState(false);

  useEffect(() => {
    if(message){
      alert("Task Updated");//show task updated message on success
    }
  }, [message])
  

  useEffect(() => {//set new status and new priority if user makes changes in the form
    setUpdatedTask({ _id,priority,status});
  }, [priority,status])
  

  const handleSubmit=async(e)=>{
    await e.preventDefault();
    if(priority=="" && status==""){//check if new values are selected or not for updation
      console.log("Please choose new status and priority before submitting")
    }else{//update the value if new values are assigned
      try {
        await updateTaskRequest(updatedTask);//perform PATCH operation in API
        setMessage(true);//to show Task Updated message
      } catch (error) {
        console.log(error);
      }
    }
  }
  


  return (
    <>
      <div
        className={` translate-x-[-50%] translate-y-[-50%] absolute z-50 shadow-2xl border-2 top-2/4 left-2/4 max-w-full sm:w-[400px]`}
      >
        <div className="flex justify-between items-center p-4 bg-slate-100">
          <h3 className="text-xl font-bold">EDIT TASK</h3>
          <button onClick={closeEditModal}>
            <Image src="/close.png" alt="close icon" width="20" height="20" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-[#e5c1eb] to-[#a49dcb] p-4">
            <div className=" flex flex-col items-start">
              <span className="font-medium">Title:</span>
              <input
                value={task.title}
                type="text"
                placeholder="Enter task title..."
                className="m-2 border-2 rounded-sm border-slate-400 bg-slate-300"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">Description:</span>
              <input
                value={task.description}
                type="text"
                placeholder="Enter task description..."
                className="m-2 h-16 border-2 rounded-sm border-slate-400 bg-slate-300"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">Team:</span>
              <input
                value={task.team}
                type="text"
                placeholder="Enter team name..."
                className="m-2 border-2 rounded-sm border-slate-400 bg-slate-300"
                readOnly
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">Assignees:</span>
              <input
                value={task.assignee}
                type="text"
                placeholder="Enter assigness..."
                className="m-2 border-2 rounded-sm border-slate-400 bg-slate-300"
                readOnly
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Priority:</span>
                <select
                  defaultValue={task.priority}
                  className="m-2 border-2 rounded-sm border-slate-400 "
                  onChange={(e)=>setPriority(e.target.value)}
                >
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="p2">P2</option>
                </select>
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <select 
                  defaultValue={task.status}
                  onChange={(e)=>setStatus(e.target.value)}
                  className="px-2 py-1 m-2 border-slate-400 rounded-sm bg-white "
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Deffered">Deffered</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-4 flex sm:justify-end gap-4 bg-white">
            <button
              className="px-8 py-2 bg-blue-700 text-white font-medium rounded-md"
            >
              Submit
            </button>
            <button className="px-8 py-2 bg-blue-700 text-white font-medium rounded-md">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTask;
