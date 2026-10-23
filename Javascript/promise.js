//promise
const registration = new Promise((resolve, reject) => {
  const isvalid = true;

  if (isvalid) {
    resolve("reg successful");
  } else {
    reject(new Error("reg failed"));
  }
});

registration.then(result => {
  console.log(result);
});
