"use client";

import { deleteTaskRequest } from "@/app/api_requests/request";
import Image from "next/image";

const DeleteTask = ({task,closeDelModal}) => {

    const _id=task._id;
    // console.log(_id);

    const deleteTask=async(e)=>{
        await e.preventDefault();
        try {
            await deleteTaskRequest(_id);//perform DELETE API request
            await closeDelModal(task);   //close delete task component         
            alert("Task Deleted"); //success message after deleting the task
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <>
            <div className="max-w-full border shadow-2xl w-[350px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute z-50">
                <div className="p-4 flex justify-between bg-white">
                    <h3 className="font-medium text-xl">
                        DELETE TASK
                    </h3>
                    <button onClick={closeDelModal}>
                        <Image src="/close.png" alt="close icon" width="20" height="20" />
                    </button>
                </div>
                <div className="bg-gradient-to-r from-[#e5c1eb] to-[#a49dcb] p-4">
                    <div className="font-medium mb-4">
                        Do You Wish to Delete Task
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-bold">
                            {task.title}
                        </div>
                        <div className="sm:flex sm:justify-between sm:items-center gap-2">
                            <button onClick={deleteTask} className="bg-blue-800 text-white px-6 rounded-md font-bold">
                                Yes
                            </button>
                            <button onClick={closeDelModal} className="bg-blue-800 text-white px-6 rounded-md font-bold">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default DeleteTask;