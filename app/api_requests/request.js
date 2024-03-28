const url=process.env.ROOT_URL;


export const getApiResponse=async()=>{//api request to GET task data
    try {
        const res=await fetch(url,{
            headers:{
                accept:"application/json"
            },
            cache:"no-store"
        });
        const data=res.ok ? await res.json() : Promise.reject(res);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addTaskRequest=async(req)=>{//api request to POST task data
    try{
        const res=await fetch(url,{
            method:"POST",
            headers:{
                accept:"application/json"
            },
            body:JSON.stringify(req),
        })
        .then(res=>res.json())
        .catch(error=>console.log("Error in adding task",error));
        if(res.ok){
            console.log("Task Added",res);
        }
    }catch(error){
        console.log(error);
    }
}

export const updateTaskRequest=async(req)=>{//api request to PATCH task data
    try {
        const res=await fetch(url,{
            method:"PATCH",
            headers:{
                accept:"application/json"
            },
            body:JSON.stringify(req),
        })
        .then(res=>res.json)
        .catch(error=>console.log("Error in updating task",error));
        if(res.ok){
            console.log("Task Updated",res);
        }
        return res;
    } catch (error) {
        console.log("Can't update Task",error);
    }
}

export const deleteTaskRequest=async(req)=>{//api request to DELETE task data
    try {
        const res=await fetch(url,{
            method:"DELETE",
            headers:{
                accept:"application/json"
            },
            body:JSON.stringify(req),
        })
        .then(res=>res.json())
        .catch(error=>console.log("Error in deleting task",error));
        if(res.ok){
            console.log("Task Deleted");
        }
    } catch (error) {
        console.log("Can't delete task",error);
    }
}