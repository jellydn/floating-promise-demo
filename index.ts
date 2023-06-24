console.log("Let's fix the examples.ts");

// Example 1: A promise that's created but not returned or awaited.
// Fix: Return the promise.
function example1() {
  return Promise.resolve().then(() => {
    console.log("Promise resolved in example 1");
  });
}
example1().catch(console.error); // Add a catch handler to handle any errors.

// Example 2: A promise that's created in an async function but not awaited.
// Fix: Await the promise.
async function example2() {
  await Promise.resolve().then(() => {
    console.log("Promise resolved in example 2");
  });
}
example2().catch(console.error); // Add a catch handler to handle any errors.

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

// Example 4: A promise that's created but not returned in a thenable chain.
// Fix: Return the nested promise.
function example4() {
  return Promise.resolve().then(() => {
    return Promise.resolve().then(() => {
      console.log("Nested promise resolved in example 4");
    });
  });
}
example4().catch(console.error); // Add a catch handler to handle any errors.

// Example 5: An async function that's invoked but not awaited.
// Fix: Return the promise from the async IIFE.
function example5() {
  return (async () => {
    await Promise.resolve().then(() => {
      console.log("Async IIFE resolved in example 5");
    });
  })().catch(console.error); // Add a catch handler to handle any errors.
}
void example5();
