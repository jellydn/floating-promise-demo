/* eslint-disable @typescript-eslint/no-floating-promises */
// Example 1: A promise that's created but not returned or awaited.
function example1() {
  Promise.resolve().then(() => {
    console.log("Promise resolved in example 1");
  });
}
example1();

// Example 2: A promise that's created in an async function but not awaited.
// eslint-disable-next-line @typescript-eslint/require-await
async function example2() {
  Promise.resolve().then(() => {
    console.log("Promise resolved in example 2");
  });
}
example2();

// Example 3: A promise that's returned but without error handling.
function example3() {
  return Promise.reject("This is an error in example 3");
}
example3();

// Example 4: A promise that's created but not returned in a thenable chain.
function example4() {
  Promise.resolve().then(() => {
    Promise.resolve().then(() => {
      console.log("Nested promise resolved in example 4");
    });
  });
}
example4();

// Example 5: An async function that's invoked but not awaited.
function example5() {
  (async () => {
    await Promise.resolve().then(() => {
      console.log("Async IIFE resolved in example 5");
    });
  })();
}
example5();
