// loop
for (let i = 0; i < 5; i++) {
    console.log(i);
} 

// for ... of
const events=["Talk","workshop","hack"];
    for(const i of events){
        console.log(i);
    }

//for..in
const obj = {name : "deepika", age : 21};
for(const i in obj){
      console.log(i,obj[i]);
}