//callback(oru fn na pass pannum)
function f1(name,callback){
    callback(name);
}
function f2(name){
    console.log("Hello, My Best friend "+ name +"!!!!!!")
}
f1("Harini",f2);
