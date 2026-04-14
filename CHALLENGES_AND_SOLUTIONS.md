

Content:
├─ Real-time sync issues
│  └─ How I fixed it: WebSocket broadcasting
├─ AI API rate limiting
│  └─ How I fixed it: Caching responses
├─ CORS errors
│  └─ How I fixed it: Middleware setup
├─ MongoDB connection problems
│  └─ How I fixed it: Connection pooling
└─ WebSocket disconnection
   └─ How I fixed it: Auto-reconnect logic

Interview use:
"I faced X challenge... and solved it by Y"
= Shows problem-solving! 🎯


HOW TO WRITE CHALLENGES
Format (Simple)
markdown## Challenge 1: Real-time Updates Not Syncing

**The Problem:**
When User A updated task status, User B didn't see it instantly.

**What I Tried:**
- Polling the API every second (wasteful)
- Refreshing page manually (bad UX)

**What Actually Worked:**
WebSocket broadcasting with Socket.io

**How I Fixed It:**
1. Setup Socket.io on backend
2. When task updates → emit event
3. All connected clients receive event
4. UI updates instantly

**Time Spent:** 2 hours

**What I Learned:** Event-driven architecture is key for real-time apps
```

---

## **5-8 CHALLENGE EXAMPLES**

Pick from these (write only the ones you faced):
```
1. Real-time sync (WebSockets)
   └─ Time: 2 hours

2. AI API integration (Switched from OpenAI to Hugging Face)
   └─ Time: 1 hour

3. JWT token expiration
   └─ Time: 1.5 hours

4. CORS errors (frontend + backend)
   └─ Time: 30 mins

5. Search performance with large datasets
   └─ Time: 1 hour

6. MongoDB connection pooling
   └─ Time: 30 mins (optional)

7. TypeScript strict typing
   └─ Time: Throughout (accumulated 2 hours)

8. Testing WebSocket functionality
   └─ Time: 1 hour

Total: ~8-10 hours of actual problem-solving
Document: ~1-2 hours
```
