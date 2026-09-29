console.log("Funciona");

function addToArray (data, array, callback) {
  if (!array) {
    return callback(new Error('No existe el array', null))
  }
  setTimeout(function() { 
    array.push(data)
    callback(null, array)
  }, 1000)
}

var array = [1,2,3];

addToArray(4, array, function (err) {
  if (err) return console.log(err.message)
  console.log(array)
})

function addToArray2 (data, array) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(function() {
      array.push(data)
      resolve(array)
    }, 1000);
    
    if (!array2) {
      reject(new Error('No existe un array'))
    }
  })
  
  return promise
}

const array2 = [1, 2, 3]
addToArray2(4, array2).then(function () {
  console.log(array2)
})

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json))
    
