1. USER OPENS THE APP
   App loads → AppContext initialises
   → checks localStorage for a token
   → if found, user is treated as logged in
   → if not, they see the login button

2. USER LOGS IN
   Login.jsx calls loginUser() from api.js
   → api.js sends POST /auth/login to backend
   → backend checks email + password
   → backend returns { token, user }
   → api.js gives that back to Login.jsx
   → Login.jsx calls login() from AppContext
   → AppContext saves token + user to global state
   → AppContext saves token to localStorage
   → navigate('/todo') redirects to todo page

3. USER LANDS ON TODO PAGE
   Todo.jsx loads → calls getTasks() from api.js
   → api.js reads token from localStorage
   → api.js sends GET /tasks with token in header
   → backend verifies token → returns this user's tasks
   → Todo.jsx receives tasks → calls setTasks() in AppContext
   → tasks are now in global state → UI renders them

4. USER ADDS A TASK
   Todo.jsx calls addTask('Buy milk') from api.js
   → api.js sends POST /tasks with token + text
   → backend saves to database → returns new task
   → Todo.jsx adds new task to global tasks state
   → UI updates instantly

5. USER REFRESHES THE PAGE
   AppContext re-initialises
   → finds token in localStorage
   → Todo.jsx calls getTasks() again
   → tasks load from database
   → user sees their list exactly as they left it

6. USER LOGS OUT
   Any component calls logout() from AppContext
   → AppContext clears user, token, tasks from global state
   → localStorage token is deleted
   → navigate('/login') redirects to login page
   → if they try to go back to /todo, ProtectedRoute
     sees no token → redirects to login again