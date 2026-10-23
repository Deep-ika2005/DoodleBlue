
// Compare let and var scope inside an if block
if (true) {
  let ifLetValue = "let is block-scoped";
  var ifVarValue = "var is accessible outside the block";
  console.log(ifLetValue);
  console.log(ifVarValue);
}

console.log(typeof ifLetValue); // "undefined": ifLetValue is not accessible here
console.log(ifVarValue); // accessible outside the if block

// Log before declaration: test var and let separately
function testVarBeforeDeclaration() {
  try {
    console.log(varBeforeDeclaration); // undefined (hoisted and initialized)
  } catch (error) {
    console.log(error.name, error.message);
  }
  var varBeforeDeclaration = "declared with var";
}

function testLetBeforeDeclaration() {
  try {
    console.log(letBeforeDeclaration); // ReferenceError (temporal dead zone)
  } catch (error) {
    console.log(error.name, error.message);
  }
  let letBeforeDeclaration = "declared with let";
}

testVarBeforeDeclaration();
testLetBeforeDeclaration();

// Return a function that increments its private count
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2





  
