console.log("Publicando");
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(j => imagenes.innerHTML = j.map(imagen =>`<img>${imagenes.title}</img>`))
  
  //Mostrar todas las imagenes de la API