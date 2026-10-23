
// event loop
// // callstack - web api(timer handle pannum) - microstack queue(promise,await) - macrostack queue or Task stack(timeout,interval,events)-eventloop
// console.log("A");
// setTimeout(() => console.log("B"),500);
// Promise.resolve().then(() => console.log("C"));
// console.log("D");

// // (EVENT TIMER 0 NO DELAY ALSO . WHEN ALL SYNC CODE WILL RUN THEN ONLY ASYNC CODE WILL RUN)
console.log("start");
setTimeout(() => console.log("Timer"),0);
Promise.resolve().then(() => console.log("promise"));
console.log("finish");

