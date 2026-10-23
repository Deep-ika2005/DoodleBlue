//practice Task
//1 create book obj with title,author,price and upadate price 
const book = {
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 250
};

book.price = 300;
console.log(book);

//2 create nested user obj and print city

const user = {
    name: "Harini",
    address: {
        city: "Chennai"
    }
};

console.log(user.address.city);

//3 create 3 array product obj and print each product name 
const products = [
    { name: "Laptop", price: 750 },
    { name: "Headphones", price: 50 },
    { name: "Keyboard", price: 30 }
];

products.forEach(product => {
    console.log(product.name);
});

//4 use destructing to extract two properties from a obj
const person = {
    name: "Harini",
    age: 20
};

const { name: personName, age: personAge } = person;
console.log(personName, personAge);

//5 use spread to copy an array and combine two array
const sourceEvents = ["Talk", "workshop", "hack"];
const copiedEvents = [...sourceEvents];
const moreEvents = ["design", "testing"];
const allEvents = [...sourceEvents, ...moreEvents];

console.log(copiedEvents);
console.log(allEvents);

//6 write fn that uses rest parameters to add any no of values
function add(...values) {
    return values.reduce((total, value) => total + value, 0);
}

console.log(add(2, 3));       // 5
console.log(add(2, 3, 4, 5)); // 14

//7 use optional changing and ?? to safely read a missing user's city and provide a fallback
const missingUser = { name: "Alex" };
const city = missingUser?.address?.city ?? "City not provided";
console.log(city);