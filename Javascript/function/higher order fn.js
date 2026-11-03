
//higher order fn(receving fn)
function f1(name) {
  console.log("Hello, My Best friend " + name + "!!!!!!");
}

function f2(name, callback) {
  callback(name);
}

f2("Harini", f1);
