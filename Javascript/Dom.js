//textcontent,innertext,innerhtml
const hi = document.getElementById("mes");
console.log(hi.textContent);
hi.innerHTML = "<strong>Hello</strong>";
console.log(hi.innerHTML);