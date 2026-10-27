//js odbj to json text
const teacher = {"name":"deep",age:20};
const jsontexts= JSON.stringify(teacher);
console.log(jsontexts);

//json text to js obj
const jsontext = '{"name":"deep","age":20}';
const student = JSON.parse(jsontext);
console.log(student);

//array using json
const tasks = ["Read", "practice"];
const arrtext = JSON.stringify(tasks);

localStorage.setItem("tasks", arrtext);
console.log(arrtext);