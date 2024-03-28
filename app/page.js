"use client";


import TaskBoard from "@/components/TaskBoard"
import { getApiResponse } from "@/app/api_requests/request";
import Image from "next/image"
import { useEffect, useState } from "react";

const Home = () => {
  
  const [tasks,setTasks]=useState([]);//state to store the tasks data from api
  const fetchData=async()=>{//get tasks data from api
    const {tasks}=await getApiResponse();
    setTasks(tasks);//store the tasks data
  }


  useEffect(() => {
    fetchData();//call the api to fetch tasks data
  }, [])
  

  return (
    <div className=" md:p-2">
      <div className="flex justify-between items-center m-4 p-4">
        <h2 className="font-bold text-3xl ">
          Task Board
        </h2>
        <div>
          <Image 
            src="/user black.png"
            alt="profile icon"
            width="70"
            height="70"
            className="bg-white rounded-full p-4"
          />
        </div>
      </div>
      <div className=" m-4 p-4 border-4 border-white rounded-lg">
        <TaskBoard tasks={tasks} />
      </div>
      
    </div>
  )
}

export default Home