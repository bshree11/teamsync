/**
 * PROJECT MODEL
 */

import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  team: Types.ObjectId;
  members: Types.ObjectId[];  // ← Array of ObjectIds
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(  // ← ADDED <IProject>
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team is required'],
    },
    members: [{  // ← CHANGED: Simplified array syntax
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    status: {
      type: String,
      enum: ['active', 'completed', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ team: 1 });
ProjectSchema.index({ status: 1 });

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;