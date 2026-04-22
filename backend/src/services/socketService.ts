import { getIO } from "../config/socket";

//task events

//send when task is created
export const emitTaskCreated =(task: any)=>{
    getIO().emit('task:created',task);
};

//send when task is updated
export const emitTaskUpdated = (task:any)=>{
    getIO().emit('task:updated',task);

};
//send when task is deleted
export const emitTaskDeleted = (taskId: string) =>{
    getIO().emit('task:deleted', {taskId});
};

//NOTIFICATION EVENTS

//send notifications to all users
export const emitNotification = (notification:any)=>{
    getIO().emit('notification:new', notification)
}