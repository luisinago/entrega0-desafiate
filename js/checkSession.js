// checkSession.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la sesión está iniciada
    if (!localStorage.getItem('sesionIniciada')) {
        // Si no está iniciada, redirigir a login.html
        window.location.href = 'login.html';
    }
});
