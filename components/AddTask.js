"use client";

import { addTaskRequest } from "@/app/api_requests/request";
import Image from "next/image";
import { useEffect, useState } from "react";

const AddTask = ({ closeAddTask }) => {


  const status="Pending";
  const start_date=new Date().toDateString();
  const end_date="";
  const [title,setTitle]=useState("");
  const [description,setDesc]=useState("");
  const [team,setTeam]=useState("");
  const [assignee,setAssignee]=useState("");
  const [priority,setPriority]=useState("");
  const [message,setMessage]=useState(false);
  const [taskData,setTaskData]=useState({});
  

  useEffect(() => {
    if(message){
      alert("Task Created");//if task added then show success message
    }
  }, [message])
  

  useEffect(() => {//add data to create tasks
    if(priority==""){
      setPriority("P0");//assign P0 to unassigned priority
    }else{
      setTaskData({title,description,team,assignee,priority,status,start_date,end_date});
    }
  }, [title,description,team,assignee,priority])
  

  const handleSubmit=async(e)=>{
    await e.preventDefault();
    try {
      await addTaskRequest(taskData);//perform POST operation in API
      //reset all the states after posting data
      setTaskData({});
      setTitle("");
      setDesc("");
      setTeam("");
      setAssignee("");
      setPriority("");
      setMessage(true);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      className={` translate-x-[-50%] translate-y-[-50%] absolute z-50 shadow-2xl border-2 top-2/4 left-2/4 max-w-full sm:w-[400px]`}
    >
      <div className="flex justify-between items-center p-4 bg-slate-100">
        <h3 className="text-xl font-bold">CREATE A TASK</h3>
        <button onClick={closeAddTask}>
          <Image src="/close.png" alt="close icon" width="20" height="20" />
        </button>
      </div>
      <form
        className="w-full"
        onSubmit={handleSubmit}
      >
        <div className="bg-gradient-to-r from-[#e5c1eb] to-[#a49dcb] p-4">
          <div className="sm:flex justify-between items-center">
            <span className="font-medium">Title:</span>
            <input
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
              type="text"
              id="title"
              placeholder="Enter task title..."
              className="m-2 border-2 rounded-sm border-slate-400 bg-slate-300"
            />
          </div>
          <div className="sm:flex justify-between items-center">
            <span className="font-medium">Description:</span>
            <input
              value={description}
              onChange={(e)=>{setDesc(e.target.value)}}
              type="text"
              id="desc"
              placeholder="Enter task description..."
              className="m-2 h-16 border-2 rounded-sm border-slate-400 bg-slate-300"
            />
          </div>
          <div className="sm:flex justify-between items-center">
            <span className="font-medium">Team:</span>
            <input
              value={team}
              onChange={(e)=>{setTeam(e.target.value)}}
              type="text"
              id="team"
              placeholder="Enter team name..."
              className="m-2 border-2 rounded-sm border-slate-400 bg-slate-300"
            />
          </div>
          <div className="sm:flex justify-between items-center">
            <span className="font-medium">Assignees:</span>
            <input
              value={assignee}
              onChange={(e)=>{setAssignee(e.target.value)}}
              type="text"
              id="assignees"
              placeholder="Enter assigness..."
              className="m-2 border-2 rounded-sm border-slate-400 bg-slate-300"
              required
            />
          </div>
          <div className="sm:flex justify-start items-center gap-8">
            <span className="font-medium">Priority:</span>
            <select
              value={priority}
              onChange={(e)=>{setPriority(e.target.value)}}
              id="priority"
              className=" m-2 border-2 rounded-sm border-slate-400 bg-slate-300"
            >
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
          </div>
        </div>
        <div className="p-4 flex sm:justify-end bg-white">
          <button className="px-8 py-2 bg-blue-700 text-white font-medium">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
