# Welcome to floating-promise-demo 👋

This project is a demo that illustrates how to handle floating promises in JavaScript. It aims to show the potential issues that can occur when promises are not properly dealt with, and offers solutions to prevent these issues, particularly by enforcing the `no-floating-promises` rule from TypeScript ESLint.

Floating promises are a common JavaScript pitfall, where a Promise that has been instantiated is not returned, awaited, or otherwise handled, leading to potential unexpected behavior.

[![IT Man - Understanding and Preventing Floating Promises in JavaScript | Tutorial [Vietnamese]](https://i.ytimg.com/vi/hF3yl4iOlwA/hqdefault.jpg)](https://www.youtube.com/watch?v=hF3yl4iOlwA)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Bun — A fast all-in-one JavaScript runtime](https://bun.sh/).
- You have a basic understanding of JavaScript and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jellydn/floating-promise-demo.git
   cd floating-promise-demo
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Run the demo:
   ```bash
   bun run index.ts
   ```

## What is floating promises?

Floating promises are a common issue that can arise in asynchronous programming, specifically when dealing with Promises in JavaScript or TypeScript. The term "floating promise" refers to a Promise that has been instantiated but not appropriately handled or returned. This situation can lead to a variety of problems, such as improperly sequenced operations and ignored Promise rejections.

The issue arises when a Promise, or an async function that implicitly returns a Promise, is invoked without handling its completion. This lack of handling can manifest in several ways:

1. Not using `await` with an async function or Promise.
2. Not using `.then()` with a Promise.
3. Not using `.catch()` with a Promise to handle potential errors.
4. Not returning the Promise from the function where it's invoked.

## Setting up ESLint with @typescript-eslint/no-floating-promises rule

To help catch floating promises and other potential issues in your code, you can set up ESLint with TypeScript. Here's how:

1. First, install ESLint and the TypeScript parser and plugin for ESLint:

   ```bash
   bun add -d eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```

2. Next, create a `.eslintrc.cjs` file in the root of your project:

   ```bash
   touch .eslintrc.cjs
   ```

3. Open `.eslintrc.cjs` in your editor and add the following configuration:

   ```javascript
   /* eslint-env node */
   module.exports = {
     parser: "@typescript-eslint/parser",
     plugins: ["@typescript-eslint"],
     extends: [
       "plugin:@typescript-eslint/recommended",
       "plugin:@typescript-eslint/recommended-requiring-type-checking",
     ],
     rules: {
       "@typescript-eslint/no-floating-promises": "error",
     },
     parserOptions: {
       project: true,
       tsconfigRootDir: __dirname,
     },
     root: true,
   };
   ```

4. You can now run ESLint on your TypeScript files to check for issues:

   ```bash
   npx eslint . --ext .ts
   ```

This setup will enforce the `no-floating-promises` rule, along with other recommended TypeScript rules. The `no-floating-promises` rule will throw an error whenever a floating promise is detected in your code.

## Incorrect Examples

Here are some examples of incorrect according to the `no-floating-promises` rule:

Incorrect:

```javascript
// Example 1: A promise that's created but not returned or awaited.
function example1() {
  Promise.resolve().then(() => {
    console.log("Promise resolved in example 1");
  });
}

// Example 2: A promise that's created in an async function but not awaited.
async function example2() {
  Promise.resolve().then(() => {
    console.log("Promise resolved in example 2");
  });
}

// Example 3: A promise that's returned but without error handling.
function example3() {
  return Promise.reject("This is an error in example 3");
}

// Example 4: A promise that's created but not returned in a thenable chain.
function example4() {
  Promise.resolve().then(() => {
    Promise.resolve().then(() => {
      console.log("Nested promise resolved in example 4");
    });
  });
}

// Example 5: An async function that's invoked but not awaited.
function example5() {
  (async () => {
    await Promise.resolve().then(() => {
      console.log("Async IIFE resolved in example 5");
    });
  })();
}
```

In the incorrect examples, the promises are instantiated but not properly handled. This can lead to unexpected behavior, as the promises may

not complete when subsequent code is executed. In the correct examples, each promise is either `await`ed, returned, or has a `.then()` with two arguments or a `.catch()` with one argument, ensuring that the promise will be handled appropriately and not lead to potential issues. Enforcing these practices in your code can help to prevent bugs and improve code readability and predictability.

## Corrected Examples

In `index.ts`, you can find examples of floating promises and the corresponding fixes to each one. Each example demonstrates a common mistake when working with promises, and the fixes illustrate how to avoid these errors using correct Promise handling techniques:

1. Promises that are created but not returned or awaited.
2. Promises that are created in an async function but not awaited.
3. Promises that are returned but without error handling.
4. Promises that are created but not returned in a thenable chain.
5. Async functions that are invoked but not awaited.

For example:

```javascript
// Example 3: A promise that's returned but without error handling.
// Fix: Add error handling.
function example3() {
  return Promise.reject("This is an error in example 3").catch((err) => {
    console.error(
      `Caught an error in example 3: ${JSON.stringify(err, null, 2)}`
    );
  });
}

// Using `void` with `example3()` to explicitly state we're not awaiting or returning this promise.
// Be aware that this doesn't handle potential rejections. The promise will settle in the background.
// If it rejects, the error will not be caught here, leading to unhandled promise rejection warnings.
void example3();
```

In this example, `example3` initially returns a promise that rejects without handling the error. The fix adds error handling to the promise, and we use the `void` keyword to start the promise without waiting for it, explicitly marking it as intentionally not awaited. Note that this does not handle potential rejections - if the promise rejects, the error will not be caught here, leading to unhandled promise rejection warnings.

This repository aims to be a practical resource for learning about and preventing issues related to floating promises. We encourage you to explore `index.ts` to get a better understanding of these issues and how to avoid them.

# Real-World Example with TypeScript

Consider a real-world scenario where a user is created and an email is sent to that user. If we don't properly handle the promises returned by the `createUser` and `sendEmail` functions, we will face the floating promise issue. In this example, we will use TypeScript to provide static typing to our functions.

Here's the TypeScript version of our previous JavaScript example:

```typescript
// A mock function to simulate creating a user in a database
function createUser(username: string, email: string) {
  return new Promise<{ id: number; username: string; email: string }>(
    (resolve, reject) => {
      // Simulate a delay with setTimeout
      setTimeout(() => {
        const user = { id: Date.now(), username, email };
        console.log(`User created: ${JSON.stringify(user)}`);
        resolve(user);
      }, 1000);
    }
  );
}

// A mock function to simulate sending an email
function sendEmail(user: { id: number; username: string; email: string }) {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      console.log(`Email sent to user: ${JSON.stringify(user)}`);
      resolve(Date.now());
    }, 1000);
  });
}

// A function that creates a user and sends an email to them
// Here lies a floating promise issue
function registerUser(username: string, email: string) {
  createUser(username, email).then((user) => {
    sendEmail(user); // This promise is floating, it's neither returned nor awaited
  });
}

registerUser("johndoe", "johndoe@example.com");
```

In the `registerUser` function, the promise returned by `sendEmail` is neither returned nor awaited, causing it to be a floating promise. The problem with this is that any errors that occur when sending the email won't be caught and handled, possibly leading to unhandled promise rejections.

Can you spot the floating promise in this example and fix it? Try using the techniques we've discussed in this tutorial to identify and handle the floating promise properly.

In the next section, we'll provide the solution for this real-world example.

## Solution

To fix the floating promise issue in our real-world example, we can either return the promise or use async/await:

```typescript
// Fix with returning the promise
function registerUser(username: string, email: string) {
  return createUser(username, email).then((user) => {
    return sendEmail(user);
  });
}

// Fix with async/await
async function registerUser(username: string, email: string) {
  const user = await createUser(username, email);
  await sendEmail(user);
}
```

Now, the promise from `sendEmail` is properly handled. If there's any error when sending the email, it will be propagated and can be caught where `registerUser` is called. This is how we can handle floating promises in real-world scenarios.

If you have any questions or suggestions, feel free to open an issue or submit a pull request. Your feedback is always welcome!

## Related Videos

[![IT Man - Tech #32 - Async await wrapper for easy error handling without try-catch [Vietnamese]](https://i.ytimg.com/vi/iLB75jzQrJ8/mqdefault.jpg)](https://www.youtube.com/watch?v=iLB75jzQrJ8)

[![IT Man - Tech #30 - Deno 101 - The best developer experience [Vietnamese]](https://i.ytimg.com/vi/ocLNcwm4xUs/mqdefault.jpg)](https://www.youtube.com/watch?v=ocLNcwm4xUs)


## Author

👤 **Huynh Duc Dung @jellydn**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Remember, always handle your promises, and happy coding!

## Show your support

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)

If you find this project useful, show your support by giving it a ⭐️!
