let books = ["Harry Potter", "The Alchemist", "Wings of Fire"];

localStorage.setItem("books", JSON.stringify(books));

let savedBooks = JSON.parse(localStorage.getItem("books"));

console.log(savedBooks);
console.log(savedBooks[0]);