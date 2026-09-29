console.log("Publicando");
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(j => listados.innerHTML = j.map(titulo =>`<li>${titulo.title}</li>`))
  
  //Mostrar title en un ul en la pagina html