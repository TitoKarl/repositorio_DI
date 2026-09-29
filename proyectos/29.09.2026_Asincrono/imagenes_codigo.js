console.log("Fotos");
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(j => listados.innerHTML = j.map(t =>`<img src = "${t.url}" width="50px">`))