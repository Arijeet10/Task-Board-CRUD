"use client";

import Image from "next/image";
import { useState } from "react";
import EditDeleteCard from "./EditDeleteCard";

const TaskData = ({ task,modalBackdrop,handleEditModal,handleDeleteModal }) => {
  

  const [optModal, setOptModal] = useState(false);//state to open or close Edit Delete option component

  const [removeDelOpt, setRemoveDelOpt] = useState(false); //state to remove delete option if task is completed

  const handleClick = (e) => {//open Edit Delete Component
    e.preventDefault();
    if (task.status == "Completed") {
      setRemoveDelOpt(true);//if task completed then do not show Delete option in Edit Delete component
      modalBackdrop();
    }
    setOptModal(!optModal);
    modalBackdrop();
  };


  const openEditTask = () => {
    //closes the edit delete pop up component if edit option is selected
    setOptModal(false);
  };

  const openDeleteTask = () => {
    //closes the edit delete pop up component if delete option is selected
    setOptModal(false);
  };
  

  return (
    <>
      <div className="bg-gray-200 rounded-md m-4 p-2">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">{task.title}</div>
          <span className="text-white font-bold bg-blue-800 p-1">
            {task.priority}
          </span>
        </div>
        <hr className="h-[2px] m-2 bg-slate-400" />
        <div className="max-w-60 max-h-20 text-sm overflow-scroll hide-scrollbar">
          {task.description}
        </div>
        <div className=" flex justify-between items-center">
          <div className="font-medium text-l">@{task.assignee}</div>
          <button onClick={handleClick} className="border-blue-800 border p-2">
            <Image src="/more.png" alt="edit icon" width="10" height="10" />
          </button>
        </div>
        <div className="my-2 flex justify-start items-center">
          {task.status == "Pending" ? (
            <button className="rounded-md px-8 py-1 bg-blue-800 text-white text-xs md:text:sm font-bold">
              Assign
            </button>
          ) : (
            <button className="rounded-md px-8 py-1 bg-blue-800 text-white text-xs md:text-sm font-bold">
              {task.status}
            </button>
          )}
        </div>
      </div>
      {optModal && (
          <>
            <EditDeleteCard
              openEditTask={openEditTask}
              openDeleteTask={openDeleteTask}
              removeDelOpt={removeDelOpt}
              handleEditModal={handleEditModal}
              handleDeleteModal={handleDeleteModal}
              task={task}
            />
          </>
        )}
    </>
  );
};

export default TaskData;
