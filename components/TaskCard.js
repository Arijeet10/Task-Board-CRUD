"use client";

import { useState } from "react";
import TaskData from "./TaskData";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";


const TaskCard = ({tasks,modalBackdrop}) => {

    const [data,setData]=useState();//state to store data to edit task
    const [popUp,setPopUp]=useState(false);//state to open or close edit task component
    const [delPopUp,setDelPopUp]=useState(false);//state to open or close Delete task component
    const [delData,setDelData]=useState();//state to store data to delete task

    const handleEditModal=(data)=>{
        setPopUp(true);//opens the Edit task component
        setData(data);//to pass task data for updation in Edit Task component
    }

    const closeEditModal=()=>{
        setPopUp(false);//close the Edit task component
        modalBackdrop();//remove the backdrop effect
    }


    const handleDeleteModal=(data)=>{
        setDelPopUp(true);//open Delete task component
        setDelData(data);//assign data for deletion
    }

    const closeDelModal=(data)=>{
        setDelPopUp(false);//close Delete task component
        modalBackdrop();//remove backdrop effect
    }
    
    return ( 
        <>
        <div className="flex items-center justify-start gap-4 md:justify-start w-full">
            <div className="relative rounded-lg bg-white shadow-2xl w-full">
                <div className=" rounded-t-lg flex items-center justify-center bg-slate-600 text-white font-bold">
                    <h3 className="text-xl p-2">
                        Pending
                    </h3>
                </div>
                <div className="h-[30rem] hide-scrollbar overflow-scroll">
                    {tasks.map((task,i)=>{
                        return(
                            task.status=="Pending" && <TaskData handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} task={task} modalBackdrop={modalBackdrop} />
                        )
                    })}
                </div>
            </div>
            <div className="relative  rounded-lg bg-white  shadow-2xl w-full">
                <div className=" rounded-t-lg flex items-center justify-center bg-yellow-600 text-white font-bold">
                    <h3 className="text-xl p-2">
                        In Progress
                    </h3>
                </div>
                <div className="h-[30rem] hide-scrollbar overflow-scroll">
                {tasks.map((task,i)=>{
                    return(
                        task.status=="In Progress" && <TaskData handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} task={task} modalBackdrop={modalBackdrop} />
                    )
                })}
                </div>
            </div>
            <div className="relative  rounded-lg bg-white  shadow-2xl w-full">
                <div className=" rounded-t-lg flex items-center justify-center bg-green-500 text-white font-bold">
                    <h3 className="text-xl p-2">
                        Completed
                    </h3>
                </div>
                <div className="h-[30rem] hide-scrollbar overflow-scroll">
                {tasks.map((task,i)=>{
                    return(
                        task.status=="Completed" && <TaskData handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} task={task} modalBackdrop={modalBackdrop} />
                    )
                })}
                </div>
            </div>
            <div className="relative  rounded-lg bg-white  shadow-2xl w-full">
                <div className=" rounded-t-lg flex items-center justify-center bg-violet-800 text-white font-bold">
                    <h3 className="text-xl p-2">
                        Deployed
                    </h3>
                </div>
                <div className=" h-[30rem] hide-scrollbar overflow-scroll">
                {tasks.map((task,i)=>{
                    return(
                        task.status=="Deployed" && <TaskData handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} task={task} modalBackdrop={modalBackdrop} />
                    )
                })}
                </div>
            </div>
            <div className="relative  rounded-lg bg-white  shadow-2xl w-full">
                <div className=" rounded-t-lg flex items-center justify-center bg-orange-600 text-white font-bold">
                    <h3 className="text-xl p-2">
                        Deffered
                    </h3>
                </div>
                <div className="h-[30rem] hide-scrollbar overflow-scroll">
                {tasks.map((task,i)=>{
                    return(
                        task.status=="Deffered" && <TaskData handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} task={task} modalBackdrop={modalBackdrop} />
                    )
                })}
                </div>
            </div>
        </div>

        {popUp && <EditTask task={data} closeEditModal={closeEditModal}  />}

        {delPopUp && (
            <DeleteTask closeDelModal={closeDelModal} task={delData} />
        )}
        </>
     );
}
 
export default TaskCard;