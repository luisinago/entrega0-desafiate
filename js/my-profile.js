document.addEventListener('DOMContentLoaded', () => {

    const usuario = localStorage.getItem('username');
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }
    let inputEmail = document.getElementById('email'); // saco la casillas de los input
    let inputNombre = document.getElementById('nombre');
    let inputSegundoN = document.getElementById('segundo-nombre');
    let inputApellido = document.getElementById('apellido');
    let inputSegundoA = document.getElementById('segundo-apellido');
    let inputTel = document.getElementById('telefono');
    inputEmail.value = usuario;

    console.log(inputApellido);
    


    let datosPerfil = JSON.parse(localStorage.getItem(`datosDeUsuarios${usuario}`)) || [];
    if (datosPerfil.length > 0) {
        let perfilGuardado = datosPerfil[datosPerfil.length - 1]; // Último perfil guardado
        inputNombre.value = perfilGuardado.nombreU || "";
        inputSegundoN.value = perfilGuardado.segundoNombreU || "";
        inputSegundoA.value = perfilGuardado.segundoApellidoU || "";
        inputApellido.value = perfilGuardado.apellidoU || "";
        inputTel.value = perfilGuardado.telefonoU || "";
    }

    let form= document.getElementById('formulario-perfil');
    
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault() //evita que se envie
                        event.stopPropagation()
                    } else {
                        let nuevoPerfil = {
                            nombreU: inputNombre.value,
                            segundoNombreU: inputSegundoN.value,
                            apellidoU: inputApellido.value,
                            segundoApellidoU: inputSegundoA.value,
                            telefonoU: inputTel.value,
                            emailU: usuario
                        }; //crea un objeto para guardar en lstorage con los datos que ingreso el usuario
                            datosPerfil.push(nuevoPerfil); // los pushea al arreglo de los datos
                            localStorage.setItem(`datosDeUsuarios${usuario}`, JSON.stringify(datosPerfil)); //los convierte en un objeto json para guardar en local storage
                            }
                        form.classList.add('was-validated');

                            
                        }, false)

                        //Aplicar tema
                        const switchBtn = document.getElementById("switch");

                        switchBtn.addEventListener("change", () =>{
                            const activaOscuro = switchBtn.checked;
                            
                            // Toggle 'dark-theme' en el body y el formulario
                            document.body.classList.toggle('dark-theme', activaOscuro);
                            form.classList.toggle('dark-theme', activaOscuro);
                            
                        })

    // Cargar foto de perfil al inicio
const storedPic = localStorage.getItem('profilePic');
if (storedPic) {
    profilePic.src = storedPic; // Mostrar foto almacenada
}

// Cambiar la foto de perfil al hacer clic en el botón
document.getElementById('uploadBtn').onclick = function() {
    document.getElementById('fileInput').click(); // Simular clic en el input de archivo
};

// Leer el archivo de imagen y actualizar la foto de perfil
document.getElementById('fileInput').onchange = function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            profilePic.src = event.target.result; // Cambiar la imagen mostrada
            localStorage.setItem('profilePic', event.target.result); // Almacenar en localStorage
        };
        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    } else {
        alert('Por favor, selecciona una imagen.');
    }
};
})

