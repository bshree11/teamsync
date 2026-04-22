/*Team Model 

What: Stores team information
Fields: name, description, owner, members
Used by: Projects, organizing users into groups*/

import mongoose, {Schema, Document, Types} from 'mongoose';
import { deflate } from 'node:zlib';

//Interface for team members
export interface ITeamMember{
    user: Types.ObjectId;
    role: 'owner'|'admin'|'member';
    joinedAt:Date;
}

//TypeScript interface - what a Team looks like

export interface ITeam extends Document{
    name: string;
    description? : string;
    owner: Types.ObjectId;
    members: ITeamMember[];
    createdAt: Date;
    updatedAt: Date;
}

//mongodb schema
const TeamSchema: Schema = new Schema(
    {
        name:{
            type:String,
            required:[true,'Team name is required'],
            trim:true,

        },
        description: {
            type: String, 
            default:'',
        },
        owner: {
            type:Schema.Types.ObjectId,
            ref: 'User',
            required:[true, 'Team owner is required'],
        },
        members:[
            {
                user:{
                    type:Schema.Types.ObjectId,
                    ref:'User',
                    required:true,
                },
                role:{
                    type: String,
                    enum: ['owner', 'admin', 'member'],
                    default:'member',
                },
                joinedAt:{
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

//Index for faster queries
TeamSchema.index({owner:1});
TeamSchema.index({'members.user':1});

const Team = mongoose.model<ITeam>('Team', TeamSchema);
export default Team;