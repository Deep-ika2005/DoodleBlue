//object stores information as key–value pairs.
const person = {
  name: "Harini",
  age: 20
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

// Destructure two properties from an object
const { name: personName, age: personAge } = person;
console.log(personName, personAge);

const user = {
  name: "Harini",
  address: {
    city: "Chennai"
  }
};

console.log(user.address.city);

// Safely read a missing city and use a fallback
const missingUser = { name: "Alex" };
const city = missingUser?.address?.city ?? "City not provided";
console.log(city);

const products = [
  { name: "Laptop", price: 750 },
  { name: "Headphones", price: 50 },
  { name: "Keyboard", price: 30 }
];

products.forEach(product => console.log(product.name));


// Add a property
console.log(person.city = "Chennai");

// Update a property
console.log(person.age = 21);

// Delete a property
console.log(delete person.city);

console.log(person); // { name: "Harini", age: 21 }

// Book object and price update
const book = {
  title: "The Alchemist",
  author: "Paulo Coelho",
  price: 250
};

console.log("Original book:", book);

book.price = 300;
console.log("Updated book:", book);