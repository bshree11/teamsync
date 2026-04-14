
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQ4ODA4ODZkNmQwNGJjZmM0Y2ZjYjEiLCJlbWFpbCI6ImRhaXN5QHRlc3QuY29tIiwiaWF0IjoxNzc2MTMzMDI5LCJleHAiOjE3NzY3Mzc4Mjl9.0QZnzFRBbdMcNDdtHGUGRbybxQ3Gsswb0JE_fUe23GU



# TeamSync API

Base URL: `http://localhost:5000`

---

## Authentication

Protected routes need this header:
Authorization: Bearer your-token-here

---

## Auth

**Register**
POST /api/auth/register
Body: { "email": "...", "password": "...", "name": "..." }
Returns: { success, token, user }

**Login**
POST /api/auth/login
Body: { "email": "...", "password": "..." }
Returns: { success, token, user }

**Get Current User** (Auth required)
GET /api/auth/me
Returns: { success, user }

---

## Users (All require Auth)

**Get My Profile**
GET /api/users/profile
Returns: { success, user }

**Update My Profile**
PUT /api/users/profile
Body: { "name": "New Name", "avatar": "url" }
Returns: { success, user }

**Change Password**
PUT /api/users/password
Body: { "currentPassword": "...", "newPassword": "..." }
Returns: { success, message }

**List All Users**
GET /api/users
Returns: { success, users }

---

## Teams (All require Auth)

**Create Team**
POST /api/teams
Body: { "name": "Team Name", "description": "Optional" }
Returns: { success, team }

**Get My Teams**
GET /api/teams
Returns: { success, teams }

**Get One Team**
GET /api/teams/:id
Returns: { success, team }

**Update Team** (Owner/Admin only)
PUT /api/teams/:id
Body: { "name": "New Name", "description": "New desc" }
Returns: { success, team }

**Delete Team** (Owner only)
DELETE /api/teams/:id
Returns: { success, message }

**Add Member** (Owner/Admin only)
POST /api/teams/:id/members
Body: { "memberId": "user-id", "role": "member" }
Returns: { success, team }

**Remove Member** (Owner/Admin only)
DELETE /api/teams/:id/members/:memberId
Returns: { success, message }

---

## Projects (All require Auth)

**Create Project**
POST /api/projects
Body: { "name": "...", "description": "...", "teamId": "..." }
Returns: { success, project }

**Get My Projects**
GET /api/projects
Returns: { success, projects }

**Get One Project**
GET /api/projects/:id
Returns: { success, project }

**Update Project**
PUT /api/projects/:id
Body: { "name": "...", "description": "...", "status": "active" }
Returns: { success, project }

**Delete Project**
DELETE /api/projects/:id
Returns: { success, message }

---

## Tasks (All require Auth)

**Create Task**
POST /api/tasks
Body: { "title": "...", "projectId": "...", "priority": "high", "assignedTo": "userId" }
Returns: { success, task }

**Get Tasks (with filters)**
GET /api/tasks
GET /api/tasks?status=todo
GET /api/tasks?priority=high
GET /api/tasks?projectId=...
Returns: { success, tasks }

**Get One Task**
GET /api/tasks/:id
Returns: { success, task }

**Update Task**
PUT /api/tasks/:id
Body: { "status": "in-progress", "priority": "low" }
Returns: { success, task }

**Delete Task**
DELETE /api/tasks/:id
Returns: { success, message }

---

## Activity (All require Auth)

**Get Activity Feed**
GET /api/activity
Returns: { success, activities }

**Get Project Activity**
GET /api/activity/project/:id
Returns: { success, activities }

---

## Notifications (All require Auth)

**Get My Notifications**
GET /api/notifications
Returns: { success, notifications }

**Mark One as Read**
PUT /api/notifications/:id
Returns: { success, notification }

**Mark All as Read**
PUT /api/notifications/read-all
Returns: { success, message }

**Delete Notification**
DELETE /api/notifications/:id
Returns: { success, message }

---

## AI (All require Auth)

**Get Project Task Summary**
GET /api/ai/summary/:projectId
Returns: { success, project, taskCount, summary }

Note: Uses Google Gemini AI to generate task summaries.

---

## Roles

- **owner** - Full control (created the team)
- **admin** - Add/remove members, update team
- **member** - View team and projects

---

## Error Codes

- **200** - Success
- **201** - Created
- **400** - Bad input
- **401** - Not logged in
- **403** - Not authorized
- **404** - Not found
- **429** - Too many requests (AI quota)
- **500** - Server error