//arrow fn
const gree=(A,B) => {
    return A*B;
};
console.log(gree(21,11));

// Add any number of values using a rest parameter
function add(...values) {
  return values.reduce((total, value) => total + value, 0);
}

console.log(add(2, 3));
console.log(add(2, 3, 4, 5));