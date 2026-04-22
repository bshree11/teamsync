# TeamSync API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication

All protected routes require a JWT token in the Authorization header:
Authorization: Bearer your-token-here

---

## Auth Endpoints

### Register User
POST /api/auth/register

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### Login User
POST /api/auth/login

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### Get Current User (Protected)
GET /api/auth/me

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## User Endpoints (All Protected)

### Get My Profile
GET /api/users/profile

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "avatar_url"
  }
}
```

### Update My Profile
PUT /api/users/profile

Request Body:
```json
{
  "name": "New Name",
  "avatar": "new_avatar_url"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "New Name",
    "email": "john@example.com"
  }
}
```

### Change Password
PUT /api/users/password

Request Body:
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Password updated"
}
```

### List All Users
GET /api/users

Response:
```json
{
  "success": true,
  "users": [
    { "id": "user_id", "name": "John Doe", "email": "john@example.com" }
  ]
}
```

---

## Team Endpoints (All Protected)

### Create Team
POST /api/teams

Request Body:
```json
{
  "name": "Backend Team",
  "description": "Backend developers"
}
```

Response:
```json
{
  "success": true,
  "team": {
    "_id": "team_id",
    "name": "Backend Team",
    "description": "Backend developers",
    "owner": "user_id",
    "members": []
  }
}
```

### Get My Teams
GET /api/teams

Response:
```json
{
  "success": true,
  "teams": [
    {
      "_id": "team_id",
      "name": "Backend Team",
      "description": "Backend developers",
      "owner": "user_id",
      "members": [
        {
          "user": { "name": "John", "email": "john@example.com" },
          "role": "admin"
        }
      ]
    }
  ]
}
```

### Get Single Team
GET /api/teams/:id

Response:
```json
{
  "success": true,
  "team": {
    "_id": "team_id",
    "name": "Backend Team",
    "description": "Backend developers",
    "owner": "user_id",
    "members": []
  }
}
```

### Update Team (Owner/Admin only)
PUT /api/teams/:id

Request Body:
```json
{
  "name": "Updated Team Name",
  "description": "Updated description"
}
```

Response:
```json
{
  "success": true,
  "team": {
    "_id": "team_id",
    "name": "Updated Team Name",
    "description": "Updated description"
  }
}
```

### Delete Team (Owner only)
DELETE /api/teams/:id

Response:
```json
{
  "success": true,
  "message": "Team deleted"
}
```

### Add Member to Team (Owner/Admin only)
POST /api/teams/:id/members

Request Body:
```json
{
  "email": "newmember@example.com",
  "role": "member"
}
```

Response:
```json
{
  "success": true,
  "team": {
    "_id": "team_id",
    "name": "Backend Team",
    "members": [
      { "user": { "name": "New Member" }, "role": "member" }
    ]
  }
}
```

Note: This triggers a real-time notification to the added member via WebSocket.

### Remove Member from Team (Owner/Admin only)
DELETE /api/teams/:id/members/:memberId

Response:
```json
{
  "success": true,
  "message": "Member removed"
}
```

---

## Project Endpoints (All Protected)

### Create Project
POST /api/projects

Request Body:
```json
{
  "name": "Website Redesign",
  "description": "Redesign company website",
  "teamId": "team_id"
}
```

Response:
```json
{
  "success": true,
  "project": {
    "_id": "project_id",
    "name": "Website Redesign",
    "description": "Redesign company website",
    "team": "team_id",
    "status": "planning"
  }
}
```

### Get My Projects
GET /api/projects

Response:
```json
{
  "success": true,
  "projects": [
    {
      "_id": "project_id",
      "name": "Website Redesign",
      "status": "active",
      "team": { "name": "Backend Team" }
    }
  ]
}
```

### Get Single Project
GET /api/projects/:id

Response:
```json
{
  "success": true,
  "project": {
    "_id": "project_id",
    "name": "Website Redesign",
    "description": "Redesign company website",
    "status": "active"
  }
}
```

### Update Project
PUT /api/projects/:id

Request Body:
```json
{
  "name": "Updated Project Name",
  "status": "in-progress"
}
```

Response:
```json
{
  "success": true,
  "project": {
    "_id": "project_id",
    "name": "Updated Project Name",
    "status": "in-progress"
  }
}
```

### Delete Project
DELETE /api/projects/:id

Response:
```json
{
  "success": true,
  "message": "Project deleted"
}
```

---

## Task Endpoints (All Protected)

### Create Task
POST /api/tasks

Request Body:
```json
{
  "title": "Design homepage",
  "description": "Create homepage mockups",
  "projectId": "project_id",
  "priority": "high",
  "status": "todo",
  "dueDate": "2026-04-30"
}
```

Response:
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Design homepage",
    "status": "todo",
    "priority": "high"
  }
}
```

### Get Tasks (with optional filters)
GET /api/tasks
GET /api/tasks?status=todo
GET /api/tasks?priority=high
GET /api/tasks?projectId=project_id

Response:
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "task_id",
      "title": "Design homepage",
      "status": "todo",
      "priority": "high"
    }
  ]
}
```

### Get Single Task
GET /api/tasks/:id

Response:
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Design homepage",
    "description": "Create homepage mockups",
    "status": "todo",
    "priority": "high"
  }
}
```

### Update Task
PUT /api/tasks/:id

Request Body:
```json
{
  "title": "Updated title",
  "status": "in-progress",
  "priority": "medium"
}
```

Response:
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Updated title",
    "status": "in-progress"
  }
}
```

### Delete Task
DELETE /api/tasks/:id

Response:
```json
{
  "success": true,
  "message": "Task deleted"
}
```

---

## Activity Endpoints (All Protected)

### Get Activity Feed
GET /api/activity

Response:
```json
{
  "success": true,
  "activities": [
    {
      "_id": "activity_id",
      "action": "created task",
      "user": { "name": "John Doe" },
      "createdAt": "2026-04-21T10:00:00Z"
    }
  ]
}
```

### Get Project Activity
GET /api/activity/project/:id

Response:
```json
{
  "success": true,
  "activities": [
    {
      "_id": "activity_id",
      "action": "updated task status",
      "user": { "name": "John Doe" }
    }
  ]
}
```

---

## Notification Endpoints (All Protected)

### Get My Notifications
GET /api/notifications

Response:
```json
{
  "success": true,
  "notifications": [
    {
      "_id": "notification_id",
      "message": "You were added to Backend Team",
      "read": false,
      "createdAt": "2026-04-21T10:00:00Z"
    }
  ]
}
```

### Mark Notification as Read
PUT /api/notifications/:id

Response:
```json
{
  "success": true,
  "notification": {
    "_id": "notification_id",
    "read": true
  }
}
```

### Mark All as Read
PUT /api/notifications/read-all

Response:
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### Delete Notification
DELETE /api/notifications/:id

Response:
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## AI Endpoints (All Protected)

### Generate Task Summary
POST /api/ai/summary

Request Body:
```json
{
  "tasks": [
    { "title": "Task 1", "status": "todo", "priority": "high" },
    { "title": "Task 2", "status": "done", "priority": "low" },
    { "title": "Task 3", "status": "in-progress", "priority": "medium" }
  ]
}
```

Response:
```json
{
  "success": true,
  "summary": {
    "totalTasks": 3,
    "todoCount": 1,
    "inProgressCount": 1,
    "doneCount": 1,
    "completionRate": 33,
    "highPriorityTasks": ["Task 1"],
    "suggestion": "🔴 Focus on \"Task 1\" - it's high priority!"
  }
}
```

Note: Uses Hugging Face AI for suggestions with smart local fallback for reliability.

---

## WebSocket (Real-time Updates)

### Connection

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// Join as user after login
socket.emit('join', userId);

// Join a team room
socket.emit('join_team', teamId);
```

### Events

**team_invite** - Received when you are added to a team

```javascript
socket.on('team_invite', (data) => {
  console.log(data.message);    // "You were added to a team!"
  console.log(data.teamId);     // Team ID
  console.log(data.teamName);   // Team name
});
```

---

## Roles

**owner** - Created the team. Full control over team settings, members, and deletion.

**admin** - Can add/remove members and update team settings.

**member** - Can view team, projects, and tasks. Can create and update tasks.

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```