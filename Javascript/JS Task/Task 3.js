
//scope,hoisting,closures
//1 global scope
const campusname = "abc";

function global() {
    function innerscope() {
        console.log(campusname);
    }
    innerscope()
}
global()

//2  (Block scope)
if (true) {
  let ifLetValue = "let is block-scoped";
  const ifconstValue = "const is block-scoped";
  var ifVarValue = "var is accessible outside the block";

  console.log(ifLetValue);
  console.log(ifconstValue);
  console.log(ifVarValue);
}

console.log(typeof ifLetValue);    // "undefined"
console.log(typeof ifconstValue);  // "undefined"
console.log(ifVarValue);           // accessible

// //3 Hoisting 
// console.log(name1);  // reference error
// console.log(name2);  // reference error
// var name1 = "Deepika";
// let name2 = "Harini";

//4 closure
function makecounter(){
    let count = 0;

    return function(){
        count++;
        return count;
    };
}
    const counter = makecounter();
    console.log(counter());
    console.log(counter());



