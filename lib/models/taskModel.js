import mongoose,{Schema} from "mongoose";

const TaskSchema=new Schema(
    {
        "title":String,
        "description":String,
        "team":String,
        "assignee":String,
        "priority":String,
        "status":String,
        "start_date":Date,
        "end_date":Date,
    }
);

const Task=mongoose.models.Task || mongoose.model("Task",TaskSchema);

export default Task;
