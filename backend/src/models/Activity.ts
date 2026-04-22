/**
 * ACTIVITY MODEL
 * 
 * What: Stores activity log (who did what, when)
 * Fields: user, action, targetType, targetId, details
 * Used by: Activity feed, tracking changes
 */

import mongoose, { Schema, Document, Types } from 'mongoose';

// TypeScript interface
export interface IActivity extends Document {
  user: Types.ObjectId;
  action: string;
  targetType: 'task' | 'project' | 'team' | 'user';
  targetId: Types.ObjectId;
  details?: string;
  timestamp: Date;
}

// MongoDB Schema
const ActivitySchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      enum: [
        'created_task',
        'updated_task',
        'completed_task',
        'deleted_task',
        'assigned_task',
        'created_project',
        'updated_project',
        'deleted_project',
        'created_team',
        'joined_team',
        'left_team',
        'added_member',
        'removed_member',
      ],
    },
    targetType: {
      type: String,
      required: true,
      enum: ['task', 'project', 'team', 'user'],
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // We use our own timestamp field
  }
);

// Indexes for faster queries
ActivitySchema.index({ user: 1 });
ActivitySchema.index({ timestamp: -1 }); // -1 for descending (newest first)
ActivitySchema.index({ targetType: 1, targetId: 1 });

const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
export default Activity;