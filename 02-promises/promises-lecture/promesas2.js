const filesNames = ["archivo1.txt", "archivo2.txt", "archivo3.txt"];

const arrPromises = filesNames.map(fileName => promiseReadFile(fileName))
//[promiseOne, promiseTwo, promiseThree]

const promiseOne = promiseReadFile("archivo1.txt");
const promiseTwo = promiseReadFile("archivo2.txt");
const promiseThree = promiseReadFile("archivo3.txt");

Promise.all([promiseOne, promiseTwo, promiseThree])
  .then((values) => console.log(values)
);
