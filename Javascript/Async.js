//  // async(setTimeout)
// console.log("Reg received1");
// setTimeout(() => console.log("confirmed1"),500 );
// console.log("form filled1");

// //async(setInterval)
console.log("one");
const id = setInterval(() => console.log("two"),500 );
console.log("three");
setTimeout(() =>clearInterval(id),3000);