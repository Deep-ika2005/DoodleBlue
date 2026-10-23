
//higher order fn(receving fn)
function pro(name) {
  console.log("Hello, My Best friend " + name + "!!!!!!");
}

function invite(name, callback) {
  callback(name);
}

invite("Harini", pro);
