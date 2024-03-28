import Task from "@/lib/models/taskModel";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function POST(req){//POST API
    try {
        const body=await req.json();
        const {title,description,team,assignee,priority,status,start_date,end_date}=body;
        await connectMongoDB();
        
        const newTask= await new Task({
            title,
            description,
            team,
            assignee,
            priority,
            status,
            start_date,
            end_date
        });
        console.log(newTask)
        await newTask.save();
        return new NextResponse.json({message:"Task Added"},{status:201})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error in adding task",error}),{status:500});
    }
}


export async function GET(){//GET API
    try {
        await connectMongoDB();
        const tasks=await Task.find();
        return NextResponse.json({tasks});
    } catch (error) {
        return new NextResponse("Error in fetching Tasks"+error,{status:500});
    }
}

export async function PATCH(req){//PATCH API
    try {
        const body=await req.json();
        console.log(body);
        const {_id,priority,status}=body;
        console.log(_id,priority,status);
        if(!_id){
            return new NextResponse(JSON.stringify({message:"Invalid Task id"}),{status:400});
        }

        await connectMongoDB();
        //check if the task is there in database or not
        const task=await Task.findById(_id);
        if(!task){
            return new NextResponse(JSON.stringify({message:"Task not found"}),{status:404})
        }

        //check if new status and priority values are empty
        if(priority=="" && status==""){
            return new NextResponse(JSON.stringify({message:"No Data given to update Task"}),{status:404})
        }

        const end_date=new Date().toDateString();//to assign end date when task status is completed

        //if task is there then update it
        if(priority=="" && status!==""){//to update only status if no priority is given
            if(status=="Completed"){//add end date if task status is completed
                const updatedTask=await Task.findByIdAndUpdate(
                    _id,
                    {status,end_date},
                    {new:true}
                );
            }else{
                const updatedTask=await Task.findByIdAndUpdate(
                    _id,
                    {status},
                    {new:true}
                );
            }
        }else if(status=="" && priority!==""){//to update only priority if no status is given
            const updatedTask=await Task.findByIdAndUpdate(
                _id,
                {priority},
                {new:true}
            );
        }else{//update both priority and status
            if(status=="Completed"){//add end date if task status is completed
                const updatedTask=await Task.findByIdAndUpdate(
                    _id,
                    {priority,status,end_date},
                    {new:true}
                )
            }else{
                const updatedTask=await Task.findByIdAndUpdate(
                    _id,
                    {priority,status},
                    {new:true}
                );
            }
        }
        
        return new NextResponse(JSON.stringify({message:"Task Updated",task:updatedTask}),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error in updating the task",error}),{status:500});
    }
}

export async function DELETE(req){//DELETE API
    try {
        const body=await req.json();
        //check if task id is given or not
        if(!body){
            return new NextResponse(JSON.stringify({message:"Invalid Task id"}),{status:404});
        }
        await connectMongoDB();
        //check if particular task is in the database or not
        const task=await Task.findById(body);
        console.log(task);
        if(!task){
            return new NextResponse(JSON.stringify({message:"Can't find the particular task"}),{status:404});
        }
        //check if the particular task is completed or not as completed task can't be deleted
        if(task.status=="Completed"){
            return new NextResponse(JSON.stringify({message:"Can't delete the Task as it is completed"}),{status:404});
        }
        //delete task
        await Task.findByIdAndDelete(body);
        console.log("Deleted",task)
        return new NextResponse(JSON.stringify({message:"Task Deleted"}),{status:200})

    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Cannot Delete Task",error}),{status:500});
    }
}