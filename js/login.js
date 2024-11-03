document.querySelector("form").addEventListener("submit", function(event) {
    
    event.preventDefault();

    
    const username = document.querySelector(".Usuario input").value;

   
    localStorage.setItem("username", username);

    
    window.location.href = "index.html";
});

if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){
  const username = localStorage.getItem("usuario");
  document.getElementById("user").innerHTML = "Cliente: " + username;
}
