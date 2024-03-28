"use client";

import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import Datepicker from "react-tailwindcss-datepicker";
import TaskCard from "./TaskCard";

const TaskBoard = ({ tasks }) => {

  const [darkBg,setDarkBg]=useState(false);

  const modalBackdrop=()=>{
    setDarkBg(!darkBg);
  }

  //get list of assignees to choose for
  const assigneeList = tasks.map((item, i) => {
    return item.assignee;
  });
  const newAssigneeList = [...new Set(assigneeList)]; //remove duplicate assignee values

  //get list of priorities to choose for
  const priorityList = tasks.map((item, i) => {
    return item.priority;
  });
  const newPriorityList = [...new Set(priorityList)]; //remove duplicate priority values

  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [dateValue,setDateValue]=useState({
    startDate:"",
    endDate:""
  })

  const handleValueChange = (newValue) => {
    setDateValue(newValue); 
    } 
  

  const [newTask, setNewTask] = useState([]);

  const handleFilters = () => {
    //assignee and priority filter
    const arr = tasks.filter((item) => {
      if (item.assignee == assignee && item.priority == priority) {
        //both assignee and priority filter
        return item;
      } else if (assignee == "" && item.priority == priority) {
        //only priority filter
        return item;
      } else if (priority == "" && item.assignee == assignee) {
        //only assignee filter
        return item;
      }
    });
    //start_date filter
    if (dateValue.startDate == "") {
      setNewTask(arr); //filtered data without start_date filter
    } else {
      const newArr = arr.filter((item) => {
        const dateArr = item.start_date.split("T"); //split the Time from start_date before compairing
        if (dateArr[0] == dateValue.startDate) {
          //matching task start_date
          return item;
        }
      });
      setNewTask(newArr); //start_date filtered task data
      setDateValue({//reset dates state
        startDate:"",
        endDate:""
      })
    }
    //end_date filter
    if (dateValue.endDate !== "" && dateValue.endDate!==dateValue.startDate) {

      const newArr = arr.filter((item) => {
        if (item.end_date !== null) {
          //check if end_date is null or not
          const dateArr = item.end_date.split("T"); //split Time from end_date before compairing
          if (dateArr[0] == dateValue.endDate) {
            //matching task end_date
            return item;
          }
        }
      });
      setNewTask(newArr); //end_date filtered task data
      setDateValue({//reset dates state
        startDate:"",
        endDate:""
      })
    }
  };

  useEffect(() => {
    handleFilters(); //filter the api data
  }, [assignee, priority, dateValue.startDate,dateValue.endDate]);

  const [sort, setSort] = useState(""); //state to determine sorting of task data

  const handleSort = () => {
    if (assignee == "") {
      //check if assignee is choosed or not before sorting
      console.log("Choose the Assignee before sorting");
    } else {
      if(sort==""){
        const arr=tasks.filter(item=>{
          return item.assignee==assignee;//no sort data given then only assignee filter applied
        });
        setNewTask(arr);
      } else if (dateValue.startDate == "" && dateValue.endDate == "") {
        const arr = tasks.filter((item) => {
          //filter assignee and sort without dates
          if (item.assignee == assignee && item.priority == sort) {
            return item;
          }
        });
        setNewTask(arr);
      } else if (dateValue.endDate == "" || dateValue.endDate==dateValue.startDate) {
        const arr = tasks.filter((item) => {
          //sort with assignee, priority and start_date
          if (
            item.assignee == assignee &&
            item.priority == sort &&
            item.start_date == dateValue.startDate
          ) {
            return item;
          }
        });
        setNewTask(arr);
        setDateValue({//reset dates state
          startDate:"",
          endDate:""
        })
      } else {
        const arr = tasks.filter((item) => {
          //sort with assignee, priority and end_date
          if (
            item.assignee == assignee &&
            item.priority == sort &&
            item.end_date == dateValue.endDate
          ) {
            return item;
          }
        });
        setNewTask(arr);
        setDateValue({//reset dates state
          startDate:"",
          endDate:""
        })
      }
    }
  };

  useEffect(() => {
    handleSort(); //to sort the task data
  }, [sort]);

  const [closeModal, setCloseModal] = useState(false); //change Add Task Modal state
  const openAddTask = () => {
    //opens add task
    setCloseModal(true);
  };

  const closeAddTask = () => {
    //closes add task
    setCloseModal(false);
  };

  return (
    <>
      <div className="md:flex md:items-start md:justify-start md:relative md:gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-start items-start gap-2 md:flex-row">
            <div className="font-medium text-md ">Filter By:</div>
            <div className="flex items-center justify-start gap-4 md:justify-start max-w-full">
              <select
                onChange={(e) => setAssignee(e.target.value)}
                className="rounded text-slate-500 font-medium appearance-none text-center px-2 md:px-3 py-1"
              >
                <option value="" selected>
                  Assignee
                </option>
                {newAssigneeList.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <select
                onChange={(e) => setPriority(e.target.value)}
                className="form-select appearance-none bg-no-repeat rounded text-slate-500 font-medium pl-1 pr-12 md:pl-2 md:pr-16 py-1"
              >
                <option value="" selected>
                  Priority
                </option>
                {newPriorityList.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>   
              <Datepicker 
                primaryColor={"blue"} 
                useRange={false}
                popoverDirection="down"
                value={dateValue}
                inputClassName="dark:bg-white bg-white w-full rounded-md py-1 pl-2"
                toggleClassName="visible"
                containerClassName="flex items-center justify-between dark:bg-white bg-white rounded-md md:w-80 pr-2 w-full "
                onChange={handleValueChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="font-medium">Sort By:</div>
            <div>
              <select
                onChange={(e) => setSort(e.target.value)}
                className="form-select appearance-none bg-no-repeat rounded text-slate-500 font-medium pl-2 pr-16 py-1"
              >
                <option value="" selected>
                  Priority
                </option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
          </div>
          <div className="">
            {newTask.length > 0 && (
              <>
                <div className="hide-scrollbar overflow-scroll w-full my-4 mx-0 px-0">
                  <TaskCard tasks={newTask} modalBackdrop={modalBackdrop} />
                </div>
              </>
            )}
          </div>
        </div>
          <button
            className="w-full py-1 mt-4 sm:mt-0 bg-blue-700 text-white font-bold rounded-md md:absolute md:w-40 right-0"
            onClick={openAddTask}
          >
            Add New Task
          </button>
      </div>
      <div className={`modal-backdrop ${closeModal || darkBg ? "block" : "hidden"}`}></div>
      {closeModal && <AddTask closeAddTask={closeAddTask} />}
    </>
  );
};

export default TaskBoard;
