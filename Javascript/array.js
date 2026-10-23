
//ARRAY
const fn = ["Talk", "workshop", "hack"];
console.log(fn[0]);

// Copy an array and combine two arrays with spread syntax
const sourceEvents = ["Talk", "workshop", "hack"];
const copiedEvents = [...sourceEvents];
const moreEvents = ["design", "testing"];
const allEvents = [...sourceEvents, ...moreEvents];

console.log(copiedEvents);
console.log(allEvents);

fn[0] = "code";
console.log(fn);

//array method......
//PUSH
const f = ["Talk", "workshop", "hack"];

console.log(f.push("hi")); // 4 (new length)
console.log(f.pop());      // "hi" (removed item)
console.log(f);            // ["Talk", "workshop", "hack"]

// Remove "hack" by value
const index = fn.indexOf("hack");


//slice(unchange)
const list = [10,20,30,40];
console.log(list.slice(0,3));
console.log(list);

//splice(change)
console.log(list.splice(2,3));
console.log(list);

//includes(returns true if the array contains that value)
const li = [10,20,30,40];
console.log(li.includes(20));

//indexof(returns the index of the first matching value)
console.log(li.indexOf(30));

//find(callback)(returns the first item that passes a test, or undefined.)
console.log(li.find(item => item > 20)); 

//findIndex(callback)(returns the index of the first item that passes a test, or -1.)
console.log(li.findIndex(n => n > 5)); 

//length
console.log(li.length);

//forEach(fn)
const numbers = [10, 20, 30];

numbers.forEach(number => {
  console.log(number);
});
