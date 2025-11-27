// Secure Login Feature with Closures & Arrow Functions
// Outer function that creates the login tracker
function createLoginTracker(userInfo) {
 // Tracks number of login attempts (private to this function)
    let attemptCount = 0;
    const MAX_ATTEMPTS = 3;

// Inner arrow function that handles each login attempt
    const loginAttempt = (passwordAttempt) => {
 // Log current state for debugging
        console.log("Debug: Current attemptCount =", attemptCount);
        console.log("Debug: passwordAttempt =", passwordAttempt);

  // 1. If the account is already locked (attemptCount is 3 or more), block further attempts
        if (attemptCount >= MAX_ATTEMPTS) {
            return "Account locked due to too many failed login attempts";
        }
  // 2. Check for successful password match
        if (passwordAttempt === userInfo.password) {
 // Reset attempt count on successful login
            attemptCount = 0;
            return "Login successful";
        } else {
  // 3. Handle failed attempt
 // Increment attempt count on a failed attempt
            attemptCount++;

   // If this failed attempt reaches the limit (attemptCount is 3)
            if (attemptCount >= MAX_ATTEMPTS) {
 // This is the LAST attempt. The lock message will be returned on the next call.
 // The test expects "Attempt 3: Login failed" here.
                return `Attempt ${attemptCount}: Login failed`;
            } else {
                // Failed attempt, but still attempts left.
                return `Attempt ${attemptCount}: Login failed`;
            }
        }
    };

    // Return inner function so it can be used outside
    return loginAttempt;
}


// TEST CASES 

console.log("----- TEST CASES START -----");

// Create user info
const user = {
    username: "user1",
    password: "password123"
};

// Create the login tracker for this user
const attemptLogin = createLoginTracker(user);

console.log(attemptLogin("hello"));         // Attempt 1 - fail
console.log(attemptLogin("nope"));          // Attempt 2 - fail
console.log(attemptLogin("incorrect"));     // Attempt 3 - fail 
console.log(attemptLogin("password123"));   // Attempt 4 - locked

// Try another user (successful login example)
console.log("\n--- NEW USER LOGIN TEST ---");

const user2 = {
    username: "admin",
    password: "letmein"
};

const attemptLogin2 = createLoginTracker(user2);

console.log(attemptLogin2("wrongpass"));    // fail
console.log(attemptLogin2("letmein"));      // success
console.log(attemptLogin2("letmein"));      // still success

console.log("----- TEST CASES END -----");


module.exports = { createLoginTracker };