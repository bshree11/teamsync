/* Notification model
What: Stores notifications for users
Fields: user, message, read, type, relatedId
Used by: Alerting users about important events
*/

import mongoose, {Schema, Document, Types, SchemaDefinition} from "mongoose";

//Typescript interface
export interface INotification extends Document{
    user: Types.ObjectId;
    message: string;
    read: boolean;
    type:string;
    relatedId?: Types.ObjectId;
    createdAt: Date;
}

//MongoDB Schema
const NotificationSchema:Schema = new Schema(
    {
      user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true, 'User is required'],
      },
      message:{
        type:String,
         required:[true, 'Message is required'],
      },
      read:{
        type:Boolean,
        default:false,
      },
      type:{
        type: String,
        required: true,
        enum:[
            'task_assigned',
            'task_completed',
            'task_due_soon',
            'team-invite',
            'project_update',
            'mention',
            'general',
        ],
      },
      relatedId:{
        type: Schema.Types.ObjectId,
      },
    },
    {
        timestamps: true,
    }
);

//Indexes for faster queries
NotificationSchema.index({user:1});
NotificationSchema.index({read:1});
NotificationSchema.index({createdAt : -1});

const Notification = mongoose.model<INotification>('Notificaion', NotificationSchema);
export default Notification;
