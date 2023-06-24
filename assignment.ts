/* eslint-disable @typescript-eslint/no-floating-promises */
// Let's identify the issue on this file and fix it

// A mock function to simulate creating a user in a database
function createUser(username: string, email: string) {
  return new Promise((resolve, _reject) => {
    // Simulate a delay with setTimeout
    setTimeout(() => {
      const user = { id: Date.now(), username, email };
      console.log(`User created: ${JSON.stringify(user)}`);
      resolve(user);
    }, 1000);
  });
}

// A mock function to simulate sending an email
function sendEmail(user: { id: number; username: string; email: string }) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.log(`Email sent to user: ${JSON.stringify(user)}`);
      resolve(Date.now());
    }, 1000);
  });
}

// A function that creates a user and sends an email to them
function registerUser(username: string, email: string) {
  createUser(username, email).then((user) => {
    sendEmail(user as { id: number; username: string; email: string });
  });
}

registerUser("johndoe", "johndoe@example.com");
