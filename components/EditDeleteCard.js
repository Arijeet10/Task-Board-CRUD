
const EditDeleteCard = ({openEditTask,openDeleteTask,removeDelOpt,handleEditModal,handleDeleteModal,task}) => {
    
    const handleEdit=(e)=>{
        e.preventDefault();
        handleEditModal(task);//send the particular task data for editing
        openEditTask();
    }

    const handleDelete=(e)=>{
        e.preventDefault();
        handleDeleteModal(task);//send the particular task for deletion
        openDeleteTask();
    }

    return ( 

        <>
        <div className={`border-black bg-violet-200 p-2 rounded-lg font-medium ${task.status=="Deffered"?"left-4":"left-40"} top-40 z-50 translate-x- translate-y- absolute`}>
            <div className=" flex flex-col gap-1 items-start bg-white">
                <button
                    className="py-2 pr-8 w-full bg-violet-200 text-slate-600"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                {!removeDelOpt &&//only if task is not completed then show the Delete option
                <button
                    className="py-2 pr-8 w-full bg-violet-200 text-slate-600"
                    onClick={handleDelete}
                >  
                    Delete
                </button>
                }
            </div>
        </div>
        </>
     );
}
 
export default EditDeleteCard;