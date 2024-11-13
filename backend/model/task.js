import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Schema Task
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "Task"
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now
    },
    endDate: {
    type: Date,
    default: Date.now
    }
});
export { TaskSchema }; // Export only the schema
const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
