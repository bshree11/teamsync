# Challenges & Solutions

Real problems I faced building TeamSync.

---

## 1. MongoDB Connection Failed (DNS Issue)

**Problem:** MongoDB Atlas connection failed with "ENOTFOUND" error. URL was correct.

**Cause:** ISP blocking DNS SRV lookups that MongoDB Atlas uses.

**Solution:** Used Google's public DNS servers (8.8.8.8) by configuring Node.js DNS settings before connecting to database.

**Takeaway:** Not every bug is a code bug. Sometimes the problem is outside your app - ISP, firewall, DNS, or network settings. I learned to test on different networks like mobile hotspot when things don't make sense. In production, companies use VPNs and dedicated DNS for this reason.

---

## 2. Data Inconsistency: `_id` vs `id`

**Problem:** User ID worked sometimes, undefined other times.

**Cause:** MongoDB stores as `_id`, but JSON serialization sometimes converts to `id`. Different parts of app received different formats.

**Solution:** Used defensive coding with fallback pattern - check for both `_id` and `id` and use whichever exists. Also added consistent JSON transform in Mongoose schemas.

**Takeaway:** Data consistency is critical especially in fintech. If transaction IDs are inconsistent, you could process payments twice or lose them completely. I learned to always normalize data formats at system boundaries and never assume the shape of incoming data.

---

## 3. Socket.io Events Not Reaching Users

**Problem:** Real-time notifications sent but never received.

**Cause:** Users weren't joining their Socket.io room after connecting. Events were being sent to empty rooms.

**Solution:** Used Socket.io rooms feature. Made users emit a "join" event with their userId right after login. Backend then adds that socket to a user-specific room. Now notifications go to the right room.

**Takeaway:** Being connected doesn't mean being ready to receive. Real-time systems have subtle failure modes that don't show errors. I learned to test the complete flow with multiple users. In fintech, this matters for instant payment confirmations where users must receive notifications reliably.

---

## 4. External API Fallback (Hugging Face)

**Problem:** AI API failed randomly - 404, rate limits, timeouts.

**Cause:** Free tier APIs are unreliable and have usage limits.

**Solution:** Used try-catch with smart local fallback. When API fails, app generates contextual suggestions locally based on task data like priority and status counts. User never sees an error.

**Takeaway:** External services will fail - it's not if but when. I learned to always build fallbacks so users never see raw errors. In fintech, if a payment gateway goes down, you need backup processors. Graceful degradation keeps the user experience smooth even when things break.

---

## 5. CORS Errors

**Problem:** Browser blocked all API calls with CORS error.

**Cause:** Frontend (port 5173) and backend (port 5000) are different origins. Browser blocks cross-origin requests by default.

**Solution:** Used CORS middleware in Express. Configured allowed origins - wildcard for development, specific domains for production. Also enabled credentials for cookie-based auth.

**Takeaway:** CORS is a security feature, not a bug to bypass. Browsers protect users from malicious sites stealing data. I learned to understand the security model rather than just googling fixes. In fintech, you also configure CSP headers, HTTPS only, secure cookies, and rate limiting. Security is foundational, not optional.

---

## 6. JWT Token Expiry Handling

**Problem:** Users got logged out randomly with 401 errors mid-session.

**Cause:** JWT expired but frontend kept using old token. No handling for expired tokens.

**Solution:** Used Axios interceptors - they catch every API response globally. When any request returns 401, interceptor clears the stored token and redirects to login page automatically. User sees clean redirect instead of broken page.

**Takeaway:** Authentication failures will happen and users shouldn't see confusing errors when they do. I learned to handle edge cases gracefully with interceptors that catch problems globally. In fintech, session management is even more critical because you're dealing with money. Expired sessions must redirect cleanly, not fail silently.

---

## Key Lessons

1. Debug systematically - check network, logs, and different environments before blaming code
2. Normalize data formats at system boundaries to avoid inconsistency bugs
3. Real-time systems need explicit setup - connection alone isn't enough
4. Always build fallbacks for external services because they will fail
5. Understand security features instead of just bypassing them
6. Handle authentication edge cases gracefully with global interceptors